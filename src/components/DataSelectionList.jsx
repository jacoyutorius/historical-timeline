import React, { useMemo } from "react";
import DataSelectionItem from "./DataSelectionItem";
import "./DataSelectionList.css";

const DataSelectionList = React.memo(
  ({ data, selectedItems, onToggleItem }) => {
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
