import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import * as d3 from "d3";
import {
  validateTimelineData,
  sortDataByStartYear,
  calculateTimeRange,
  yearToDate,
} from "../utils/timelineUtils";
import "../styles/Timeline.css";

const Timeline = React.memo(({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedItem, setSelectedItem] = useState(null);
  const [renderError] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawError, setDrawError] = useState(null);

  // データの前処理をメモ化
  const processedData = useMemo(() => {
    if (!data || !validateTimelineData(data)) {
      return { sortedData: [], timeRange: { minYear: 0, maxYear: 0 } };
    }

    const sortedData = sortDataByStartYear(data);
    const timeRange = calculateTimeRange(sortedData);

    return { sortedData, timeRange };
  }, [data]);

  // タイムラインの基本設定（動的サイズ）
  const margin = { top: 20, right: 30, bottom: 60, left: 150 };
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const availableWidth = Math.max(800, window.innerWidth - 80);
      const availableHeight = Math.max(400, window.innerHeight - 280);

      setDimensions({
        width: availableWidth - margin.left - margin.right,
        height: availableHeight - margin.top - margin.bottom,
      });
    }
  }, [margin.left, margin.right, margin.top, margin.bottom]);

  const { width, height } = dimensions;

  // ツールチップの内容を作成する関数（メモ化）
  const createTooltipContent = useCallback((d) => {
    const duration = d.end - d.start;
    const categoryText = d.category === "people" ? "人物" : "組織";

    let content = `
      <div class="tooltip-header">
        <span class="tooltip-icon">${
          d.category === "people" ? "👤" : "🏛️"
        }</span>
        <strong>${d.title}</strong>
        <span class="tooltip-category">(${categoryText})</span>
      </div>
      <div class="tooltip-period">
        <strong>期間:</strong> ${d.start}年 - ${d.end}年 (${duration}年間)
      </div>
    `;

    if (d.birth) {
      content += `<div class="tooltip-birth"><strong>生年月日:</strong> ${d.birth}</div>`;
    }

    if (d.dead) {
      content += `<div class="tooltip-death"><strong>没年月日:</strong> ${d.dead}</div>`;
    }

    if (d.description) {
      content += `<div class="tooltip-description">${d.description}</div>`;
    }

    if (d.events && d.events.length > 0) {
      content += `<div class="tooltip-events">
        <strong>主要な出来事:</strong>
        <ul>`;
      d.events.slice(0, 3).forEach((event) => {
        content += `<li>${event.start}年: ${event.content}</li>`;
      });
      if (d.events.length > 3) {
        content += `<li>...他 ${d.events.length - 3}件</li>`;
      }
      content += `</ul></div>`;
    }

    return content;
  }, []);

  const drawTimeline = useCallback(async () => {
    setIsDrawing(true);
    setDrawError(null);

    try {
      // データの妥当性チェック
      if (processedData.sortedData.length === 0) {
        console.error("No valid timeline data");
        throw new Error("タイムラインデータが無効です");
      }

      if (!svgRef.current) {
        throw new Error("SVG要素が見つかりません");
      }

      // 描画処理の遅延（大量データ対応）
      await new Promise((resolve) => setTimeout(resolve, 30));

      // SVG要素をクリア
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // ツールチップの作成
      const tooltip = d3
        .select(containerRef.current)
        .append("div")
        .attr("class", "timeline-tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("pointer-events", "none");

      // 前処理済みデータを使用
      const { sortedData, timeRange } = processedData;
      const { minYear, maxYear } = timeRange;

      // 時間軸スケールの設定
      const xScale = d3
        .scaleTime()
        .domain([yearToDate(minYear), yearToDate(maxYear, true)])
        .range([0, width]);

      // Y軸スケール（人物の配置）の設定
      const yScale = d3
        .scaleBand()
        .domain(sortedData.map((d) => d.title))
        .range([0, height])
        .padding(0.1);

      // 色スケールの設定
      const colorScale = d3
        .scaleOrdinal()
        .domain(["people", "organization"])
        .range(["#4a90e2", "#f5a623"]);

      // メインのグループ要素を作成
      const g = svg
        .append("g")
        .attr("class", "timeline-container")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X軸の作成と描画
      const xAxis = d3
        .axisBottom(xScale)
        .tickFormat(d3.timeFormat("%Y"))
        .ticks(d3.timeYear.every(50)); // 50年間隔でティック

      const xAxisGroup = g
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

      // X軸のラベル
      xAxisGroup
        .append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", 35)
        .style("text-anchor", "middle")
        .style("fill", "#666")
        .style("font-size", "12px")
        .text("年代");

      // Y軸の作成と描画
      const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(25); // アイコン用のスペースを確保

      const yAxisGroup = g.append("g").attr("class", "y-axis").call(yAxis);

      // Y軸のティックラインを削除（人物名のみ表示）
      yAxisGroup.selectAll(".tick line").remove();
      yAxisGroup.selectAll(".domain").remove();

      // カテゴリアイコンの追加
      const categoryIcons = yAxisGroup
        .selectAll(".category-icon")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("class", "category-icon")
        .attr("x", -20)
        .attr("y", (d) => yScale(d.title) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", (d) => colorScale(d.category))
        .text((d) => (d.category === "people" ? "👤" : "🏛️"));

      // 人物名のスタイル改善
      yAxisGroup
        .selectAll(".tick text")
        .style("font-weight", "500")
        .style("fill", "#333")
        .attr(
          "class",
          (d) =>
            `name-label ${
              sortedData.find((item) => item.title === d)?.category
            }`
        );

      // データバーの描画
      const barsGroup = g.append("g").attr("class", "person-bars");

      const bars = barsGroup
        .selectAll(".person-bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "person-bar")
        .attr("data-title", (d) => d.title)
        .attr("data-category", (d) => d.category)
        .attr("data-start", (d) => d.start)
        .attr("data-end", (d) => d.end)
        .attr("x", (d) => xScale(yearToDate(d.start)))
        .attr("y", (d) => yScale(d.title))
        .attr(
          "width",
          (d) => xScale(yearToDate(d.end, true)) - xScale(yearToDate(d.start))
        )
        .attr("height", yScale.bandwidth())
        .attr("fill", (d) => colorScale(d.category))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("rx", 3) // 角丸
        .attr("ry", 3)
        .style("opacity", 0.8)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          // バーのスタイル変更
          d3.select(this).style("opacity", 1).attr("stroke-width", 2);

          // ツールチップの内容を作成
          const tooltipContent = createTooltipContent(d);

          // ツールチップを表示
          tooltip
            .html(tooltipContent)
            .style("opacity", 1)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mousemove", function (event) {
          // マウス移動に合わせてツールチップを移動
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mouseout", function () {
          // バーのスタイルを元に戻す
          d3.select(this).style("opacity", 0.8).attr("stroke-width", 1);

          // ツールチップを非表示
          tooltip.style("opacity", 0);
        })
        .on("click", function (event, d) {
          // 詳細パネルを表示
          setSelectedItem(d);

          // ツールチップを非表示
          tooltip.style("opacity", 0);

          // クリックされたバーを強調
          barsGroup.selectAll(".person-bar").style("opacity", 0.3);

          d3.select(this)
            .style("opacity", 1)
            .attr("stroke-width", 3)
            .attr("stroke", "#333");
        });

      // バー内のテキストラベル（期間表示）
      const labelsGroup = g.append("g").attr("class", "labels");

      const labels = labelsGroup
        .selectAll(".bar-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", (d) => {
          const barStart = xScale(yearToDate(d.start));
          const barWidth = xScale(yearToDate(d.end, true)) - barStart;
          return barStart + barWidth / 2; // バーの中央
        })
        .attr("y", (d) => yScale(d.title) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em") // 垂直中央揃え
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "10px")
        .style("font-weight", "500")
        .style("pointer-events", "none") // マウスイベントを無効化
        .text((d) => {
          const duration = d.end - d.start;
          if (duration < 20) {
            return `${d.start}-${d.end}`; // 短期間は年のみ
          } else {
            return `${d.start}-${d.end} (${duration}年)`; // 長期間は期間も表示
          }
        })
        .style("opacity", function (d) {
          // バーの幅が狭い場合はラベルを非表示
          const barWidth =
            xScale(yearToDate(d.end, true)) - xScale(yearToDate(d.start));
          return barWidth > 80 ? 1 : 0;
        });

      // バーの右端に詳細情報を表示（生年月日など）
      const detailLabels = labelsGroup
        .selectAll(".detail-label")
        .data(sortedData.filter((d) => d.birth || d.dead))
        .enter()
        .append("text")
        .attr("class", "detail-label")
        .attr("x", (d) => xScale(yearToDate(d.end, true)) + 5)
        .attr("y", (d) => yScale(d.title) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .style("text-anchor", "start")
        .style("fill", "#666")
        .style("font-size", "9px")
        .style("pointer-events", "none")
        .text((d) => {
          if (d.birth && d.dead) {
            return `(${d.birth} - ${d.dead})`;
          } else if (d.birth) {
            return `(${d.birth}生)`;
          } else if (d.dead) {
            return `(${d.dead}没)`;
          }
          return "";
        })
        .style("opacity", function (d) {
          // 画面右端に近い場合は非表示
          const barEnd = xScale(yearToDate(d.end, true));
          return barEnd < width - 100 ? 0.7 : 0;
        });

      // イベント点の描画
      const eventsGroup = g.append("g").attr("class", "event-points");

      // 全ての人物・組織のイベントを収集
      const allEvents = [];
      sortedData.forEach((person) => {
        if (person.events && person.events.length > 0) {
          person.events.forEach((event) => {
            allEvents.push({
              ...event,
              personTitle: person.title,
              personCategory: person.category,
              personId: person.title.replace(/\s+/g, "_"),
              yPosition: yScale(person.title) + yScale.bandwidth() / 2,
            });
          });
        }
      });

      // イベント点を描画
      const eventPoints = eventsGroup
        .selectAll(".event-point")
        .data(allEvents)
        .enter()
        .append("circle")
        .attr("class", "event-point")
        .attr("cx", (d) => xScale(yearToDate(d.start)))
        .attr("cy", (d) => d.yPosition)
        .attr("r", 3)
        .attr("fill", (d) =>
          d.personCategory === "people" ? "#e74c3c" : "#f39c12"
        )
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .style("cursor", "pointer")
        .style("opacity", 0.8)
        .on("mouseover", function (event, d) {
          d3.select(this).attr("r", 5).style("opacity", 1);

          // イベント専用ツールチップを表示（コンパクト版）
          const eventTooltipContent = `
            <div class="event-tooltip-content">
              <div class="event-title">
                <span class="event-icon">${
                  d.personCategory === "people" ? "📅" : "🏛️"
                }</span>
                <strong>${d.content}</strong>
              </div>
              <div class="event-details">
                <span class="event-year">${d.start}年</span> • 
                <span class="event-person">${d.personTitle}</span>
              </div>
            </div>
          `;

          // ツールチップの位置を動的に調整
          const tooltipWidth = 250; // 推定ツールチップ幅
          const tooltipHeight = 60; // 推定ツールチップ高さ

          let left = event.pageX + 2;
          let top = event.pageY - 20;

          // 右端チェック
          if (left + tooltipWidth > window.innerWidth) {
            left = event.pageX - tooltipWidth - 2;
          }

          // 上端チェック
          if (top < 0) {
            top = event.pageY + 8;
          }

          tooltip
            .html(eventTooltipContent)
            .style("opacity", 1)
            .style("left", left + "px")
            .style("top", top + "px");
        })
        .on("mousemove", function (event, d) {
          // ツールチップの位置を動的に調整
          const tooltipWidth = 250;
          const tooltipHeight = 60;

          let left = event.pageX + 2;
          let top = event.pageY - 20;

          // 右端チェック
          if (left + tooltipWidth > window.innerWidth) {
            left = event.pageX - tooltipWidth - 2;
          }

          // 上端チェック
          if (top < 0) {
            top = event.pageY + 8;
          }

          tooltip.style("left", left + "px").style("top", top + "px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("r", 3).style("opacity", 0.8);

          tooltip.style("opacity", 0);
        });

      // グリッドラインの追加（オプション）

      // ズーム機能の設定
      const zoom = d3
        .zoom()
        .scaleExtent([0.5, 10]) // ズーム範囲: 0.5倍〜10倍
        .translateExtent([
          [-width * 2, -height],
          [width * 3, height * 2],
        ]) // パン範囲制限
        .on("zoom", function (event) {
          const { transform } = event;

          // X軸スケールを更新
          const newXScale = transform.rescaleX(xScale);

          // X軸を再描画
          xAxisGroup.call(
            d3.axisBottom(newXScale).tickFormat(d3.timeFormat("%Y"))
          );

          // バーの位置とサイズを更新
          barsGroup
            .selectAll(".person-bar")
            .attr("x", (d) => newXScale(yearToDate(d.start)))
            .attr(
              "width",
              (d) =>
                newXScale(yearToDate(d.end, true)) -
                newXScale(yearToDate(d.start))
            );

          // バー内ラベルの位置を更新
          labelsGroup
            .selectAll(".bar-label")
            .attr("x", (d) => {
              const barStart = newXScale(yearToDate(d.start));
              const barWidth = newXScale(yearToDate(d.end, true)) - barStart;
              return barStart + barWidth / 2;
            })
            .style("opacity", function (d) {
              const barWidth =
                newXScale(yearToDate(d.end, true)) -
                newXScale(yearToDate(d.start));
              return barWidth > 80 ? 1 : 0;
            });

          // 詳細ラベルの位置を更新
          labelsGroup
            .selectAll(".detail-label")
            .attr("x", (d) => newXScale(yearToDate(d.end, true)) + 5)
            .style("opacity", function (d) {
              const barEnd = newXScale(yearToDate(d.end, true));
              return barEnd < width - 100 ? 0.7 : 0;
            });

          // イベント点の位置を更新
          eventsGroup
            .selectAll(".event-point")
            .attr("cx", (d) => newXScale(yearToDate(d.start)));
        });

      // SVGにズーム機能を適用
      svg.call(zoom);

      // スケール情報をコンソールに出力（デバッグ用）
      console.log(
        "Timeline initialized with data:",
        sortedData.length,
        "items"
      );
      console.log("Time range:", minYear, "-", maxYear);
      console.log("Axes drawn successfully");
      console.log("Bars drawn:", bars.size(), "items");
      console.log("Bar labels drawn:", labels.size(), "items");
      console.log("Detail labels drawn:", detailLabels.size(), "items");
      console.log("Category icons drawn:", categoryIcons.size(), "items");
      console.log("Zoom functionality enabled");
    } catch (error) {
      console.error("Timeline drawing error:", error);
      setDrawError(error.message || "タイムラインの描画でエラーが発生しました");

      // エラー表示用のSVG要素を作成
      if (svgRef.current) {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const errorGroup = svg
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);

        errorGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "-20")
          .style("font-size", "18px")
          .style("fill", "#dc3545")
          .style("font-weight", "bold")
          .text("⚠️ タイムラインの描画でエラーが発生しました");

        errorGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "10")
          .style("font-size", "14px")
          .style("fill", "#6c757d")
          .text(error.message || "データの読み込みに失敗しました");

        errorGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "35")
          .style("font-size", "12px")
          .style("fill", "#6c757d")
          .text("ページを再読み込みしてください");
      }
    } finally {
      setIsDrawing(false);
    }
  }, [processedData, dimensions, width, height, createTooltipContent]);

  useEffect(() => {
    // 初期サイズ設定
    updateDimensions();

    if (data && data.length > 0) {
      setTimeout(() => drawTimeline(), 100);
    }

    // ウィンドウリサイズ対応
    const handleResize = () => {
      updateDimensions();
      if (data && data.length > 0) {
        setTimeout(() => drawTimeline(), 150);
      }
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
      // 既存のツールチップを削除
      d3.select(containerRef.current).selectAll(".timeline-tooltip").remove();
    };
  }, [data]);

  // サイズが変更されたときの再描画
  useEffect(() => {
    if (data && data.length > 0) {
      setTimeout(() => drawTimeline(), 100);
    }
  }, [dimensions]);

  // 詳細パネルを閉じる関数（メモ化）
  const closeDetailPanel = useCallback(() => {
    setSelectedItem(null);

    // 全てのバーのスタイルを元に戻す
    const svg = d3.select(svgRef.current);
    svg
      .selectAll(".person-bar")
      .style("opacity", 0.8)
      .attr("stroke-width", 1)
      .attr("stroke", "#fff");
  }, []);

  return (
    <div ref={containerRef} className="timeline-wrapper">
      {/* ステータス表示（必要な場合のみ） */}
      {isDrawing && (
        <div className="timeline-status">
          <span className="loading-spinner-small"></span>
          タイムラインを描画中...
        </div>
      )}
      {drawError && (
        <div className="timeline-error-banner">
          ⚠️ {drawError}
          <button
            onClick={() => {
              setDrawError(null);
              drawTimeline();
            }}
            className="retry-button"
          >
            再試行
          </button>
        </div>
      )}
      {selectedItem && (
        <div className="selected-banner">
          選択中: <strong>{selectedItem.title}</strong>
          <button onClick={closeDetailPanel} className="close-selection">
            ×
          </button>
        </div>
      )}

      <div className="timeline-content">
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

        {selectedItem && (
          <div className="detail-panel">
            <div className="detail-panel-header">
              <div className="detail-title">
                <span className="detail-icon">
                  {selectedItem.category === "people" ? "👤" : "🏛️"}
                </span>
                <h3>{selectedItem.title}</h3>
                <span className="detail-category">
                  ({selectedItem.category === "people" ? "人物" : "組織"})
                </span>
              </div>
              <button onClick={closeDetailPanel} className="close-button">
                ×
              </button>
            </div>

            <div className="detail-panel-content">
              <div className="detail-section">
                <h4>基本情報</h4>
                <p>
                  <strong>活動期間:</strong> {selectedItem.start}年 -{" "}
                  {selectedItem.end}年 ({selectedItem.end - selectedItem.start}
                  年間)
                </p>
                {selectedItem.birth && (
                  <p>
                    <strong>生年月日:</strong> {selectedItem.birth}
                  </p>
                )}
                {selectedItem.dead && (
                  <p>
                    <strong>没年月日:</strong> {selectedItem.dead}
                  </p>
                )}
                {selectedItem.description && (
                  <p>
                    <strong>説明:</strong> {selectedItem.description}
                  </p>
                )}
              </div>

              {selectedItem.events && selectedItem.events.length > 0 && (
                <div className="detail-section">
                  <h4>主要な出来事</h4>
                  <ul className="events-list">
                    {selectedItem.events.map((event, index) => (
                      <li key={index}>
                        <span className="event-year">{event.start}年</span>
                        <span className="event-content">{event.content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.imageUrl && (
                <div className="detail-section">
                  <h4>画像</h4>
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="detail-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="timeline-footer">
        <div className="timeline-legend">
          <div className="legend-item">
            <div className="legend-color people"></div>
            <span>人物</span>
          </div>
          <div className="legend-item">
            <div className="legend-color organization"></div>
            <span>組織</span>
          </div>
          <div className="legend-item">
            <div className="legend-event-point people-event"></div>
            <span>人物イベント</span>
          </div>
          <div className="legend-item">
            <div className="legend-event-point org-event"></div>
            <span>組織イベント</span>
          </div>
        </div>

        <div className="timeline-controls">
          <button
            onClick={() => {
              const svg = d3.select(svgRef.current);
              svg
                .transition()
                .duration(750)
                .call(d3.zoom().transform, d3.zoomIdentity);
            }}
            className="reset-zoom-button"
          >
            ズームリセット
          </button>
          <p className="controls-text">
            <strong>操作方法:</strong>
            マウスホイールでズーム、ドラッグでパン、バークリックで詳細表示
          </p>
        </div>
      </div>
    </div>
  );
});

export default Timeline;
