import React, { useState, useEffect, useCallback } from "react";
import Timeline from "./components/Timeline";
import DataSelectionModal from "./components/DataSelectionModal";
import { sampleData } from "./data/sampleData";
import "./App.css";

const App = React.memo(() => {
  const [allData] = useState(sampleData); // 全データ（変更不可）
  const [selectedData, setSelectedData] = useState(sampleData); // 選択されたデータ
  const [isDataSelectionModalOpen, setIsDataSelectionModalOpen] =
    useState(false); // モーダル表示状態
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // selectedDataが変更されたときにtimelineDataを更新
  useEffect(() => {
    if (!loading && !error) {
      setTimelineData(selectedData);
    }
  }, [selectedData, loading, error]);

  // データ選択の処理
  const handleDataSelection = useCallback((newSelectedData) => {
    setSelectedData(newSelectedData);
    setTimelineData(newSelectedData);
    setIsDataSelectionModalOpen(false);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // サンプルデータの読み込みをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 800));

      // データの妥当性チェック
      if (!sampleData || !Array.isArray(sampleData)) {
        throw new Error("サンプルデータが正しく読み込まれませんでした");
      }

      if (sampleData.length === 0) {
        throw new Error("データが空です");
      }

      // 各データ項目の妥当性チェック
      const invalidItems = sampleData.filter(
        (item) => !item.title || !item.start || !item.end || !item.category
      );

      if (invalidItems.length > 0) {
        throw new Error(
          `${invalidItems.length}件の無効なデータ項目が見つかりました`
        );
      }

      setTimelineData(selectedData);
      setLoading(false);
    } catch (err) {
      console.error("データ読み込みエラー:", err);
      setError({
        message: err.message || "データの読み込みに失敗しました",
        details: err.stack || "エラーの詳細情報はありません",
        timestamp: new Date().toLocaleString(),
      });
      setLoading(false);
    }
  }, [selectedData]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h2>歴史タイムラインを読み込み中...</h2>
            <p>データを準備しています</p>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <div className="error-icon">⚠️</div>
          <h2>エラーが発生しました</h2>
          <div className="error-details">
            <p className="error-message">{error.message}</p>
            <details className="error-technical">
              <summary>技術的な詳細</summary>
              <p className="error-timestamp">発生時刻: {error.timestamp}</p>
              <pre className="error-stack">{error.details}</pre>
            </details>
          </div>
          <div className="error-actions">
            <button onClick={loadData} className="retry-button-main">
              🔄 再試行
            </button>
            <button
              onClick={() => window.location.reload()}
              className="reload-button"
            >
              🔃 ページ再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-title-row">
          <div className="header-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="url(#headerGradient)"
                stroke="#2c3e50"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="32"
                x2="52"
                y2="32"
                stroke="#2c3e50"
                strokeWidth="3"
              />
              <circle cx="18" cy="32" r="4" fill="#e74c3c" />
              <circle cx="32" cy="32" r="4" fill="#3498db" />
              <circle cx="46" cy="32" r="4" fill="#f39c12" />
              <defs>
                <linearGradient
                  id="headerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#f8f9fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#e9ecef" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="header-text">
            <h1>歴史タイムライン</h1>
            <p>歴史上の人物と組織の生涯・活動期間を視覚化</p>
          </div>
        </div>
        <div className="header-actions-row">
          <button
            className="data-selection-button"
            onClick={() => setIsDataSelectionModalOpen(true)}
            title="表示するデータを選択"
          >
            <span className="button-icon">⚙️</span>
            <span className="button-text">データ選択</span>
            <span className="selection-count">
              ({selectedData.length}/{allData.length})
            </span>
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* <div className="timeline-info">
          <p>データ読み込み完了: {timelineData.length}件の項目</p>
          <div className="performance-info">
            <small>読み込み時間: 約0.8秒</small>
          </div>
        </div> */}

        {/* Timeline コンポーネント */}
        <Timeline data={timelineData} />
      </main>

      {/* データ選択モーダル */}
      <DataSelectionModal
        isOpen={isDataSelectionModalOpen}
        onClose={() => setIsDataSelectionModalOpen(false)}
        allData={allData}
        currentSelection={selectedData}
        onApply={handleDataSelection}
      />
    </div>
  );
});

export default App;
