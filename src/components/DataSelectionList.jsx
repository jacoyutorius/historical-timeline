import React, { useMemo } from "react";
import DataSelectionItem from "./DataSelectionItem";
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
        <DataSelectionItem
          key={item.title}
          item={item}
          isSelected={item.isSelected}
          onToggle={onToggleItem}
        />
      ))}
    </div>
  );
};

export default DataSelectionList;
