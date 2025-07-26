import React, { useMemo } from "react";
import DataSelectionItem from "./DataSelectionItem";
import "./DataSelectionList.css";

const DataSelectionList = React.memo(
  ({ data, selectedItems, onToggleItem, searchTerm }) => {
    // 表示用データの加工（データは既にフィルタリング済み）
    const displayData = useMemo(() => {
      return data.map((item) => ({
        ...item,
        duration: item.end - item.start,
        eventCount: item.events ? item.events.length : 0,
        displayPeriod: `${item.start}-${item.end} (${
          item.end - item.start
        }年間)`,
        isSelected: selectedItems.has(item.title),
      }));
    }, [data, selectedItems]);

    if (displayData.length === 0) {
      return (
        <div className="list-empty">
          <div className="empty-icon">🔍</div>
          <div className="empty-message">該当する項目がありません</div>
          <div className="empty-suggestion">
            検索条件やフィルターを変更してみてください
          </div>
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
  }
);

export default DataSelectionList;
