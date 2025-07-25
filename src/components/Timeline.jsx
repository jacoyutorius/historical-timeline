import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../styles/Timeline.css';

const Timeline = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  
  // タイムラインの基本設定
  const margin = { top: 20, right: 30, bottom: 40, left: 150 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  useEffect(() => {
    if (data && data.length > 0) {
      drawTimeline();
    }
  }, [data]);
  
  const drawTimeline = () => {
    // SVG要素をクリア
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // メインのグループ要素を作成
    const g = svg
      .append("g")
      .attr("class", "timeline-container")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // 軸用のグループを作成
    g.append("g").attr("class", "x-axis");
    g.append("g").attr("class", "y-axis");
    
    // データバー用のグループを作成
    g.append("g").attr("class", "person-bars");
    
    // ラベル用のグループを作成
    g.append("g").attr("class", "labels");
    
    console.log('Timeline initialized with data:', data.length, 'items');
  };
  
  return (
    <div ref={containerRef} className="timeline-wrapper">
      <div className="timeline-header">
        <h2>歴史タイムライン</h2>
        <p>データ項目数: {data ? data.length : 0}</p>
      </div>
      
      <div className="timeline-canvas">
        <svg 
          ref={svgRef} 
          width={width + margin.left + margin.right} 
          height={height + margin.top + margin.bottom}
          className="timeline-svg"
        >
          {/* D3.jsによる描画がここに追加される */}
        </svg>
      </div>
      
      <div className="timeline-legend">
        <div className="legend-item">
          <div className="legend-color people"></div>
          <span>人物</span>
        </div>
        <div className="legend-item">
          <div className="legend-color organization"></div>
          <span>組織</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;