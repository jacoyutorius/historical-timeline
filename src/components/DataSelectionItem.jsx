import React, { useCallback } from "react";
import "./DataSelectionItem.css";

const DataSelectionItem = ({ item, isSelected, onToggle }) => {
  const handleClick = useCallback(() => {
    onToggle(item.title);
  }, [item.title, onToggle]);

  const handleCheckboxChange = useCallback(
    (event) => {
      event.stopPropagation();
      onToggle(item.title);
    },
    [item.title, onToggle]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onToggle(item.title);
      }
    },
    [item.title, onToggle]
  );

  // 表示用データの計算
  const duration = item.end - item.start;
  const eventCount = item.events ? item.events.length : 0;
  const displayPeriod = `${item.start}-${item.end} (${duration}年間)`;
  const categoryText = item.category === "people" ? "人物" : "組織";

  return (
    <div
      className={`selection-item ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${item.title}を${isSelected ? "選択解除" : "選択"}する`}
    >
      <div className="item-checkbox-container">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="item-checkbox-input"
          aria-label={`${item.title}を選択`}
          tabIndex={-1}
        />
        <div className="checkbox-custom">
          {isSelected && (
            <svg
              className="checkbox-check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          )}
        </div>
      </div>

      <div className="item-icon-container">
        <div className="item-icon">
          {item.category === "people" ? "👤" : "🏛️"}
        </div>
        <div className="item-category-badge">{categoryText}</div>
      </div>

      <div className="item-main-content">
        <div className="item-header-section">
          <h3 className="item-title">{item.title}</h3>
          <div className="item-meta">
            <span className="item-period">{displayPeriod}</span>
            {eventCount > 0 && (
              <span className="item-event-count">📅 {eventCount}件</span>
            )}
          </div>
        </div>

        {/* 人物の場合の詳細情報 */}
        {item.category === "people" && (item.birth || item.dead) && (
          <div className="item-life-info">
            {item.birth && (
              <div className="life-date birth">
                <span className="life-icon">🎂</span>
                <span className="life-text">生: {item.birth}</span>
              </div>
            )}
            {item.dead && (
              <div className="life-date death">
                <span className="life-icon">⚰️</span>
                <span className="life-text">没: {item.dead}</span>
              </div>
            )}
          </div>
        )}

        {/* 説明がある場合 */}
        {item.description && (
          <div className="item-description">{item.description}</div>
        )}

        {/* イベントのプレビュー */}
        {item.events && item.events.length > 0 && (
          <div className="item-events-preview">
            <div className="events-header">主要な出来事:</div>
            <div className="events-list">
              {item.events.slice(0, 2).map((event, index) => (
                <div key={index} className="event-item">
                  <span className="event-year">{event.start}年</span>
                  <span className="event-content">{event.content}</span>
                </div>
              ))}
              {item.events.length > 2 && (
                <div className="events-more">
                  ...他{item.events.length - 2}件
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="item-selection-indicator">
        {isSelected && <div className="selection-badge">✓ 選択中</div>}
      </div>
    </div>
  );
};

export default DataSelectionItem;
