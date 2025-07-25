import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import { sampleData } from './data/sampleData';
import './App.css';

const App = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // サンプルデータの読み込みをシミュレート
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // データの妥当性チェック
      if (!sampleData || !Array.isArray(sampleData)) {
        throw new Error('サンプルデータが正しく読み込まれませんでした');
      }
      
      if (sampleData.length === 0) {
        throw new Error('データが空です');
      }
      
      // 各データ項目の妥当性チェック
      const invalidItems = sampleData.filter(item => 
        !item.title || !item.start || !item.end || !item.category
      );
      
      if (invalidItems.length > 0) {
        throw new Error(`${invalidItems.length}件の無効なデータ項目が見つかりました`);
      }

      setTimelineData(sampleData);
      setLoading(false);
    } catch (err) {
      console.error('データ読み込みエラー:', err);
      setError({
        message: err.message || 'データの読み込みに失敗しました',
        details: err.stack || 'エラーの詳細情報はありません',
        timestamp: new Date().toLocaleString()
      });
      setLoading(false);
    }
  };

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
            <button onClick={() => window.location.reload()} className="reload-button">
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
        <h1>歴史タイムライン</h1>
        <p>歴史上の人物と組織の生涯・活動期間を視覚化</p>
      </header>
      
      <main className="app-main">
        <div className="timeline-info">
          <p>データ読み込み完了: {timelineData.length}件の項目</p>
          <div className="performance-info">
            <small>読み込み時間: 約0.8秒</small>
          </div>
        </div>
        
        {/* Timeline コンポーネント */}
        <Timeline data={timelineData} />
        
        <div className="data-preview">
          <h3>読み込まれたデータ:</h3>
          <ul>
            {timelineData.slice(0, 5).map((item, index) => (
              <li key={index}>
                {item.title} ({item.start}-{item.end}) - {item.category}
              </li>
            ))}
            {timelineData.length > 5 && <li>...他 {timelineData.length - 5}件</li>}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;