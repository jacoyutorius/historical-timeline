import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { 
  validateTimelineData, 
  sortDataByStartYear, 
  calculateTimeRange, 
  yearToDate 
} from '../utils/timelineUtils';
import '../styles/Timeline.css';

const Timeline = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  
  // タイムラインの基本設定
  const margin = { top: 20, right: 30, bottom: 40, left: 150 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  const drawTimeline = () => {
    // データの妥当性チェック
    if (!validateTimelineData(data)) {
      console.error('Invalid timeline data');
      return;
    }
    
    // SVG要素をクリア
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // データの前処理とソート
    const sortedData = sortDataByStartYear(data);
    
    // 時間範囲の計算
    const { minYear, maxYear } = calculateTimeRange(sortedData);
    
    // 時間軸スケールの設定
    const xScale = d3.scaleTime()
      .domain([yearToDate(minYear), yearToDate(maxYear, true)])
      .range([0, width]);
    
    // Y軸スケール（人物の配置）の設定
    const yScale = d3.scaleBand()
      .domain(sortedData.map(d => d.title))
      .range([0, height])
      .padding(0.1);
    
    // 色スケールの設定
    const colorScale = d3.scaleOrdinal()
      .domain(['people', 'organization'])
      .range(['#4a90e2', '#f5a623']);
    
    // メインのグループ要素を作成
    const g = svg
      .append("g")
      .attr("class", "timeline-container")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X軸の作成と描画
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%Y"))
      .ticks(d3.timeYear.every(50)); // 50年間隔でティック
    
    const xAxisGroup = g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);
    
    // X軸のラベル
    xAxisGroup.append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", 35)
      .style("text-anchor", "middle")
      .style("fill", "#666")
      .style("font-size", "12px")
      .text("年代");
    
    // Y軸の作成と描画
    const yAxis = d3.axisLeft(yScale)
      .tickSize(0)
      .tickPadding(10);
    
    const yAxisGroup = g.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
    
    // Y軸のティックラインを削除（人物名のみ表示）
    yAxisGroup.selectAll(".tick line").remove();
    yAxisGroup.selectAll(".domain").remove();
    
    // データバー用のグループを作成
    g.append("g").attr("class", "person-bars");
    
    // ラベル用のグループを作成
    g.append("g").attr("class", "labels");
    
    // グリッドラインの追加（オプション）
    const gridLines = g.append("g")
      .attr("class", "grid-lines")
      .selectAll("line")
      .data(xScale.ticks(d3.timeYear.every(50)))
      .enter()
      .append("line")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#e0e0e0")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "2,2");
    
    // スケール情報をコンソールに出力（デバッグ用）
    console.log('Timeline initialized with data:', sortedData.length, 'items');
    console.log('Time range:', minYear, '-', maxYear);
    console.log('Axes drawn successfully');
  };

  useEffect(() => {
    if (data && data.length > 0) {
      drawTimeline();
    }
  }, [data]);
  
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