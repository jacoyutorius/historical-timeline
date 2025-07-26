import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import DataSelectionList from "./DataSelectionList";
import "./DataSelectionModal.css";

const DataSelectionModal = React.memo(
  ({ isOpen, onClose, allData, currentSelection, onApply }) => {
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [error, setError] = useState(null);

    // フォーカス管理用のref
    const modalRef = useRef(null);
    const searchInputRef = useRef(null);
    const firstFocusableElementRef = useRef(null);

    // モーダルが開かれたときに現在の選択状態を初期化
    useEffect(() => {
      if (isOpen && currentSelection) {
        const selectedIds = new Set(currentSelection.map((item) => item.title));
        setSelectedItems(selectedIds);
      }
    }, [isOpen, currentSelection]);

    // フォーカス管理とキーボードナビゲーション
    useEffect(() => {
      if (!isOpen) return;

      // モーダルが開いたときの初期フォーカス
      const focusFirstElement = () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        } else if (firstFocusableElementRef.current) {
          firstFocusableElementRef.current.focus();
        }
      };

      // フォーカス可能な要素を取得
      const getFocusableElements = () => {
        if (!modalRef.current) return [];

        const focusableSelectors = [
          "button:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"]):not([disabled])',
          "a[href]",
        ];

        return Array.from(
          modalRef.current.querySelectorAll(focusableSelectors.join(", "))
        );
      };

      // キーボードイベントハンドラー
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
          return;
        }

        // Tabキーでのフォーカス管理
        if (event.key === "Tab") {
          const focusableElements = getFocusableElements();
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            // Shift + Tab: 逆方向
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement?.focus();
            }
          } else {
            // Tab: 順方向
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      // イベントリスナーの設定
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // 初期フォーカスの設定（少し遅延させる）
      setTimeout(focusFirstElement, 100);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    // オーバーレイクリックでモーダルを閉じる
    const handleOverlayClick = useCallback(
      (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      },
      [onClose]
    );

    // 適用ボタンの処理
    const handleApply = useCallback(() => {
      try {
        setError(null);

        // 空選択時のバリデーション
        if (selectedItems.size === 0) {
          setError("少なくとも1つのアイテムを選択してください。");
          return;
        }

        // データの存在チェック
        if (!allData || allData.length === 0) {
          setError("データが利用できません。ページを再読み込みしてください。");
          return;
        }

        const selectedData = allData.filter((item) =>
          selectedItems.has(item.title)
        );

        // データ整合性チェック
        if (selectedData.length !== selectedItems.size) {
          console.warn("選択されたアイテムの数と実際のデータ数が一致しません");
          setError(
            "選択されたデータに問題があります。選択を確認してください。"
          );
          return;
        }

        // 選択されたデータの妥当性チェック
        const invalidData = selectedData.filter(
          (item) => !item.title || !item.start || !item.end || !item.category
        );

        if (invalidData.length > 0) {
          setError("選択されたデータに不正な項目が含まれています。");
          return;
        }

        onApply(selectedData);
        onClose(); // モーダルを閉じる
      } catch (err) {
        console.error("データ適用エラー:", err);
        setError("データの適用中にエラーが発生しました。");
      }
    }, [allData, selectedItems, onApply, onClose, setError]);

    // キャンセルボタンの処理
    const handleCancel = useCallback(() => {
      onClose();
    }, [onClose]);

    // フィルタリング結果をメモ化
    const filteredData = useMemo(() => {
      let filtered = allData;

      // 検索フィルター
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(searchLower)
        );
      }

      // カテゴリフィルター
      if (categoryFilter !== "all") {
        filtered = filtered.filter((item) => item.category === categoryFilter);
      }

      return filtered;
    }, [allData, searchTerm, categoryFilter]);

    // アイテムの選択/選択解除
    const handleToggleItem = useCallback((itemTitle) => {
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemTitle)) {
          newSet.delete(itemTitle);
        } else {
          newSet.add(itemTitle);
        }
        return newSet;
      });
    }, []);

    // 全選択（フィルタリング結果に基づく）
    const handleSelectAll = useCallback(() => {
      const filteredTitles = filteredData.map((item) => item.title);
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        filteredTitles.forEach((title) => newSet.add(title));
        return newSet;
      });
    }, [filteredData]);

    // 全解除
    const handleDeselectAll = useCallback(() => {
      setSelectedItems(new Set());
    }, []);

    // 人物のみ選択
    const handleSelectPeople = useCallback(() => {
      const peopleTitles = allData
        .filter((item) => item.category === "people")
        .map((item) => item.title);
      setSelectedItems(new Set(peopleTitles));
    }, [allData]);

    // 組織のみ選択
    const handleSelectOrganizations = useCallback(() => {
      const orgTitles = allData
        .filter((item) => item.category === "organization")
        .map((item) => item.title);
      setSelectedItems(new Set(orgTitles));
    }, [allData]);

    // 選択状態の統計情報をメモ化
    const selectionStats = useMemo(() => {
      const totalSelected = selectedItems.size;
      const totalItems = allData.length;
      const filteredSelected = filteredData.filter((item) =>
        selectedItems.has(item.title)
      ).length;
      const filteredTotal = filteredData.length;

      // カテゴリ別の統計
      const peopleSelected = allData.filter(
        (item) => item.category === "people" && selectedItems.has(item.title)
      ).length;
      const peopleTotal = allData.filter(
        (item) => item.category === "people"
      ).length;

      const orgSelected = allData.filter(
        (item) =>
          item.category === "organization" && selectedItems.has(item.title)
      ).length;
      const orgTotal = allData.filter(
        (item) => item.category === "organization"
      ).length;

      return {
        totalSelected,
        totalItems,
        filteredSelected,
        filteredTotal,
        peopleSelected,
        peopleTotal,
        orgSelected,
        orgTotal,
        isAllSelected: totalSelected === totalItems,
        isNoneSelected: totalSelected === 0,
        isFilteredAllSelected:
          filteredSelected === filteredTotal && filteredTotal > 0,
        isFilteredNoneSelected: filteredSelected === 0,
      };
    }, [selectedItems, allData, filteredData]);

    if (!isOpen) {
      return null;
    }

    return (
      <div
        className="modal-overlay"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-container" ref={modalRef} role="document">
          <div className="modal-header">
            <h2 id="modal-title" className="modal-title">
              データ選択
            </h2>
            <p id="modal-description" className="modal-description">
              タイムラインに表示する人物・組織を選択してください。検索やフィルターを使用して絞り込むことができます。
            </p>
            <button
              className="modal-close-button"
              onClick={onClose}
              aria-label="データ選択モーダルを閉じる"
            >
              ×
            </button>
          </div>

          <div className="modal-content">
            {/* 検索・フィルター部分（後で実装） */}
            <div className="modal-filters">
              <div className="search-section">
                <label htmlFor="search-input" className="search-label">
                  検索:
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="人物・組織名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  ref={searchInputRef}
                  aria-describedby="search-help"
                  autoComplete="off"
                />
                <div id="search-help" className="search-help">
                  人物や組織の名前を入力して絞り込み
                </div>
              </div>

              <div className="filter-section">
                <label htmlFor="category-filter" className="filter-label">
                  カテゴリ:
                </label>
                <select
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="category-filter"
                  aria-describedby="filter-help"
                >
                  <option value="all">すべて</option>
                  <option value="people">人物のみ</option>
                  <option value="organization">組織のみ</option>
                </select>
                <div id="filter-help" className="filter-help">
                  表示するカテゴリを選択
                </div>
              </div>
            </div>

            {/* 一括選択ボタン */}
            <div className="bulk-actions">
              <button
                className="bulk-action-button select-all"
                onClick={handleSelectAll}
                aria-label="すべてのアイテムを選択"
                ref={firstFocusableElementRef}
              >
                ✓ 全選択
              </button>
              <button
                className="bulk-action-button deselect-all"
                onClick={handleDeselectAll}
                aria-label="すべての選択を解除"
              >
                ✗ 全解除
              </button>
              <button
                className="bulk-action-button select-people"
                onClick={handleSelectPeople}
                aria-label="人物のみを選択"
              >
                👤 人物のみ
              </button>
              <button
                className="bulk-action-button select-organizations"
                onClick={handleSelectOrganizations}
                aria-label="組織のみを選択"
              >
                🏛️ 組織のみ
              </button>
            </div>

            {/* データリスト部分 */}
            <div className="modal-list">
              {filteredData.length === 0 ? (
                <div
                  className="no-results-message"
                  role="status"
                  aria-live="polite"
                >
                  {searchTerm.trim() || categoryFilter !== "all"
                    ? "検索条件に一致するアイテムが見つかりませんでした。"
                    : "表示するデータがありません。"}
                </div>
              ) : (
                <DataSelectionList
                  data={filteredData}
                  selectedItems={selectedItems}
                  onToggleItem={handleToggleItem}
                />
              )}
            </div>
          </div>

          <div className="modal-footer">
            {error && (
              <div className="error-message" role="alert" aria-live="assertive">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
                <button
                  className="error-dismiss"
                  onClick={() => setError(null)}
                  aria-label="エラーメッセージを閉じる"
                >
                  ×
                </button>
              </div>
            )}
            <div className="modal-footer-content">
              <div className="selection-info">
                <div className="selection-summary">
                  選択中: {selectionStats.totalSelected}/
                  {selectionStats.totalItems}件
                </div>
                {(searchTerm.trim() || categoryFilter !== "all") && (
                  <div className="filtered-selection-info">
                    表示中: {selectionStats.filteredSelected}/
                    {selectionStats.filteredTotal}件が選択済み
                  </div>
                )}
                {selectionStats.totalSelected > 0 && (
                  <div className="category-breakdown">
                    人物: {selectionStats.peopleSelected}/
                    {selectionStats.peopleTotal}件 | 組織:{" "}
                    {selectionStats.orgSelected}/{selectionStats.orgTotal}件
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button className="cancel-button" onClick={handleCancel}>
                  キャンセル
                </button>
                <button
                  className="apply-button"
                  onClick={handleApply}
                  disabled={selectionStats.isNoneSelected}
                  aria-describedby="apply-button-help"
                >
                  適用
                </button>
                {selectionStats.isNoneSelected && (
                  <div id="apply-button-help" className="apply-button-help">
                    少なくとも1つのアイテムを選択してください
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DataSelectionModal;
