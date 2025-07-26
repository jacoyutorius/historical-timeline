import React, { useState, useEffect, useCallback } from "react";
import DataSelectionList from "./DataSelectionList";
import "./DataSelectionModal.css";

const DataSelectionModal = ({
  isOpen,
  onClose,
  allData,
  currentSelection,
  onApply,
}) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // モーダルが開かれたときに現在の選択状態を初期化
  useEffect(() => {
    if (isOpen && currentSelection) {
      const selectedIds = new Set(currentSelection.map((item) => item.title));
      setSelectedItems(selectedIds);
    }
  }, [isOpen, currentSelection]);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // スクロールを無効化
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset"; // スクロールを復元
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
    const selectedData = allData.filter((item) =>
      selectedItems.has(item.title)
    );
    onApply(selectedData);
  }, [allData, selectedItems, onApply]);

  // キャンセルボタンの処理
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

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

  // 全選択
  const handleSelectAll = useCallback(() => {
    const allTitles = allData.map((item) => item.title);
    setSelectedItems(new Set(allTitles));
  }, [allData]);

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
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            データ選択
          </h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="モーダルを閉じる"
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          {/* 検索・フィルター部分（後で実装） */}
          <div className="modal-filters">
            <div className="search-section">
              <input
                type="text"
                placeholder="人物・組織名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="category-filter"
              >
                <option value="all">すべて</option>
                <option value="people">人物のみ</option>
                <option value="organization">組織のみ</option>
              </select>
            </div>
          </div>

          {/* 一括選択ボタン */}
          <div className="bulk-actions">
            <button
              className="bulk-action-button select-all"
              onClick={handleSelectAll}
              title="すべてのアイテムを選択"
            >
              ✓ 全選択
            </button>
            <button
              className="bulk-action-button deselect-all"
              onClick={handleDeselectAll}
              title="すべての選択を解除"
            >
              ✗ 全解除
            </button>
            <button
              className="bulk-action-button select-people"
              onClick={handleSelectPeople}
              title="人物のみを選択"
            >
              👤 人物のみ
            </button>
            <button
              className="bulk-action-button select-organizations"
              onClick={handleSelectOrganizations}
              title="組織のみを選択"
            >
              🏛️ 組織のみ
            </button>
          </div>

          {/* データリスト部分 */}
          <div className="modal-list">
            <DataSelectionList
              data={allData}
              selectedItems={selectedItems}
              onToggleItem={handleToggleItem}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="selection-info">
            選択中: {selectedItems.size}/{allData.length}件
          </div>
          <div className="modal-actions">
            <button className="cancel-button" onClick={handleCancel}>
              キャンセル
            </button>
            <button
              className="apply-button"
              onClick={handleApply}
              disabled={selectedItems.size === 0}
            >
              適用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSelectionModal;
