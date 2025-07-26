import React, { useMemo } from "react";
import "./DataSelectionList.css";

const DataSelectionList = ({
  data,
  selectedItems,
  onToggleItem,
  searchTerm,
  categoryFilter,
}) => {
  // データのフィルタリング
  const filteredData = useMemo(() => {
    let filtered = data;

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
  }, [data, searchTerm, categoryFilter]);

  // 表示用データの加工
  const displayData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      duration: item.end - item.start,
      eventCount: item.events ? item.events.length : 0,
      displayPeriod: `${item.start}-${item.end} (${item.end - item.start}年間)`,
      isSelected: selectedItems.has(item.title),
    }));
  }, [filteredData, selectedItems]);

  if (displayData.length === 0) {
    return (
      <div className="list-empty">
        <div className="empty-icon">🔍</div>
        <div className="empty-message">
          {searchTerm.trim() || categoryFilter !== "all"
            ? "該当する項目がありません"
            : "データがありません"}
        </div>
        {(searchTerm.trim() || categoryFilter !== "all") && (
          <div className="empty-suggestion">
            検索条件やフィルターを変更してみてください
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="data-selection-list">
      {displayData.map((item) => (
        <div
          key={item.title}
          className={`list-item ${item.isSelected ? "selected" : ""}`}
          onClick={() => onToggleItem(item.title)}
        >
          <div className="item-checkbox">
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={() => onToggleItem(item.title)}
              aria-label={`${item.title}を選択`}
            />
          </div>

          <div className="item-icon">
            {item.category === "people" ? "👤" : "🏛️"}
          </div>

          <div className="item-content">
            <div className="item-header">
              <div className="item-title">{item.title}</div>
              <div className="item-category">
                {item.category === "people" ? "人物" : "組織"}
              </div>
            </div>

            <div className="item-details">
              <div className="item-period">{item.displayPeriod}</div>
              {item.eventCount > 0 && (
                <div className="item-events">
                  📅 {item.eventCount}件のイベント
                </div>
              )}
            </div>

            {/* 人物の場合は生年月日・没年月日を表示 */}
            {item.category === "people" && (item.birth || item.dead) && (
              <div className="item-life-dates">
                {item.birth && (
                  <span className="birth-date">生: {item.birth}</span>
                )}
                {item.dead && (
                  <span className="death-date">没: {item.dead}</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSelectionList;
