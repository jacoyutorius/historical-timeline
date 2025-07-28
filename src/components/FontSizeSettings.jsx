import React, { useState, useEffect } from "react";
import { useFontSize } from "../contexts/FontSizeContext.jsx";
import "./FontSizeSettings.css";

const FontSizeSettings = ({ isOpen, onClose }) => {
  const {
    fontSize,
    setFontSize,
    resetFontSize,
    fontSizeOptions,
    isLoading,
    error,
  } = useFontSize();

  const [selectedSize, setSelectedSize] = useState(fontSize);
  const [previewMode, setPreviewMode] = useState(false);
  const [originalSize, setOriginalSize] = useState(fontSize); // 元のサイズを保持

  // モーダルが開かれたときに現在の設定を反映
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(fontSize);
      setOriginalSize(fontSize);
      setPreviewMode(false);
    }
  }, [isOpen, fontSize]);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // モーダルが開いているときはスクロールを無効化
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // プレビューモードの切り替え
  const handlePreviewToggle = (size) => {
    if (previewMode && selectedSize === size) {
      // 同じサイズを再度クリックした場合はプレビューを終了
      setPreviewMode(false);
      setFontSize(fontSize); // 元の設定に戻す
    } else {
      setSelectedSize(size);
      setPreviewMode(true);
      setFontSize(size); // プレビュー用に一時的に適用
    }
  };

  // 設定を適用
  const handleApply = () => {
    setFontSize(selectedSize);
    setOriginalSize(selectedSize); // 新しいサイズを元のサイズとして保存
    setPreviewMode(false);
    onClose();
  };

  // キャンセル
  const handleCancel = () => {
    if (previewMode) {
      // プレビュー中の場合は元の設定に戻す
      setFontSize(originalSize);
    }
    setSelectedSize(originalSize);
    setPreviewMode(false);
    onClose();
  };

  // リセット
  const handleReset = () => {
    resetFontSize();
    setSelectedSize("medium");
    setPreviewMode(false);
  };

  if (!isOpen) return null;

  return (
    <div className="font-size-settings-overlay" onClick={handleCancel}>
      <div
        className="font-size-settings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-size-settings-header">
          <h2>フォントサイズ設定</h2>
          <button
            className="close-button"
            onClick={handleCancel}
            aria-label="設定を閉じる"
          >
            ×
          </button>
        </div>

        <div className="font-size-settings-content">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="font-size-options">
            <p className="options-description">
              タイムラインの文字サイズを選択してください。選択したサイズはリアルタイムでプレビューされます。
            </p>

            <div className="size-options-grid">
              {Object.entries(fontSizeOptions).map(([key, config]) => (
                <div
                  key={key}
                  className={`size-option ${
                    selectedSize === key ? "selected" : ""
                  } ${previewMode && selectedSize === key ? "previewing" : ""}`}
                  onClick={() => handlePreviewToggle(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePreviewToggle(key);
                    }
                  }}
                  aria-pressed={selectedSize === key}
                >
                  <div className="size-option-header">
                    <span className="size-name">{config.name}</span>
                    <span className="size-multiplier">
                      ×{config.multiplier}
                    </span>
                  </div>

                  <div className="size-preview">
                    <div
                      className="preview-text"
                      style={{ fontSize: config.sizes.md }}
                    >
                      サンプルテキスト
                    </div>
                    <div
                      className="preview-small-text"
                      style={{ fontSize: config.sizes.sm }}
                    >
                      詳細情報
                    </div>
                  </div>

                  <div className="size-details">
                    <div className="size-range">
                      {config.sizes.xs} - {config.sizes.xl}
                    </div>
                  </div>

                  {selectedSize === key && (
                    <div className="selected-indicator">
                      <span className="checkmark">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {previewMode && (
              <div className="preview-notice">
                <span className="preview-icon">👁️</span>
                プレビュー中:
                「適用」をクリックして設定を保存するか、「キャンセル」で元に戻します
              </div>
            )}
          </div>

          <div className="current-settings">
            <h3>現在の設定</h3>
            <div className="current-info">
              <div className="info-item">
                <span className="info-label">選択中:</span>
                <span className="info-value">
                  {fontSizeOptions[selectedSize]?.name} (×
                  {fontSizeOptions[selectedSize]?.multiplier})
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">基本サイズ:</span>
                <span className="info-value">
                  {fontSizeOptions[selectedSize]?.sizes.md}
                </span>
              </div>
              {previewMode && (
                <div className="info-item">
                  <span className="info-label">状態:</span>
                  <span className="info-value preview-status">
                    プレビュー中
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="font-size-settings-footer">
          <div className="footer-left">
            <button
              className="reset-button"
              onClick={handleReset}
              disabled={isLoading}
            >
              <span className="button-icon">🔄</span>
              デフォルトに戻す
            </button>
          </div>

          <div className="footer-right">
            <button
              className="cancel-button"
              onClick={handleCancel}
              disabled={isLoading}
            >
              キャンセル
            </button>
            <button
              className="apply-button"
              onClick={handleApply}
              disabled={isLoading || selectedSize === originalSize}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  適用中...
                </>
              ) : (
                "適用"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSizeSettings;
