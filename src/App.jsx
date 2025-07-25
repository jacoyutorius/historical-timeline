import React, { useState, useEffect } from 'react';
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
      // サンプルデータの読み込みをシミュレート
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // データの妥当性チェック
      if (!sampleData || !Array.isArray(sampleData)) {
        throw new Error('サンプルデータが正しく読み込まれませんでした');
      }

      setTimelineData(sampleData);
      setLoading(false);
    } catch (err) {
      console.error('データ読み込みエラー:', err);
      setError('データの読み込みに失敗しました: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>読み込み中...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>エラーが発生しました</h2>
          <p>{error}</p>
          <button onClick={loadData}>再試行</button>
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
        </div>
        
        {/* Timeline コンポーネントは次のタスクで実装 */}
        <div className="timeline-placeholder">
          <p>タイムラインコンポーネントをここに表示予定</p>
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
        </div>
      </main>
    </div>
  );
};

export default App;