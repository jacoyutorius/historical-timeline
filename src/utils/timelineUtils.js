// タイムライン用ユーティリティ関数

// パフォーマンス最適化用のキャッシュ
const cache = new Map();

/**
 * キャッシュキーを生成する
 * @param {string} functionName - 関数名
 * @param {Array} args - 引数配列
 * @returns {string} - キャッシュキー
 */
const generateCacheKey = (functionName, args) => {
  return `${functionName}_${JSON.stringify(args)}`;
};

/**
 * キャッシュ付きの関数実行
 * @param {string} functionName - 関数名
 * @param {Function} fn - 実行する関数
 * @param {Array} args - 引数配列
 * @returns {any} - 関数の実行結果
 */
const withCache = (functionName, fn, args) => {
  const key = generateCacheKey(functionName, args);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const result = fn(...args);
  cache.set(key, result);

  // キャッシュサイズ制限（メモリリーク防止）
  if (cache.size > 100) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }

  return result;
};

/**
 * データの妥当性をチェックする
 * @param {Array} data - チェックするデータ配列
 * @returns {boolean} - データが有効かどうか
 */
export const validateTimelineData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  return data.every((item) => {
    return (
      item.title &&
      typeof item.start === "number" &&
      typeof item.end === "number" &&
      item.start <= item.end &&
      ["people", "organization"].includes(item.category)
    );
  });
};

/**
 * データを開始年でソートする（最適化版）
 * @param {Array} data - ソートするデータ配列
 * @returns {Array} - ソート済みデータ配列
 */
export const sortDataByStartYear = (data) => {
  // 既にソート済みかチェック
  let isSorted = true;
  for (let i = 1; i < data.length; i++) {
    if (data[i - 1].start > data[i].start) {
      isSorted = false;
      break;
    }
  }

  if (isSorted) {
    return data; // 既にソート済みの場合はコピーを避ける
  }

  return [...data].sort((a, b) => a.start - b.start);
};

/**
 * 時間範囲を計算する（キャッシュ付き・最適化版）
 * @param {Array} data - データ配列
 * @returns {Object} - {minYear, maxYear}
 */
export const calculateTimeRange = (data) => {
  return withCache(
    "calculateTimeRange",
    (data) => {
      if (data.length === 0) {
        return { minYear: 0, maxYear: 0 };
      }

      let minYear = data[0].start;
      let maxYear = data[0].end;

      // 単一ループで最小・最大を計算（Math.min/maxより高速）
      for (let i = 1; i < data.length; i++) {
        if (data[i].start < minYear) minYear = data[i].start;
        if (data[i].end > maxYear) maxYear = data[i].end;
      }

      return { minYear, maxYear };
    },
    [data]
  );
};

/**
 * 年を日付オブジェクトに変換する
 * @param {number} year - 年
 * @param {boolean} isEndDate - 終了日かどうか
 * @returns {Date} - 日付オブジェクト
 */
export const yearToDate = (year, isEndDate = false) => {
  return new Date(year, isEndDate ? 11 : 0, isEndDate ? 31 : 1);
};

/**
 * カテゴリごとにデータをグループ化する
 * @param {Array} data - データ配列
 * @returns {Object} - カテゴリ別グループ
 */
export const groupDataByCategory = (data) => {
  return data.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
};

/**
 * 期間の重複をチェックする
 * @param {Object} item1 - 最初のアイテム
 * @param {Object} item2 - 2番目のアイテム
 * @returns {boolean} - 重複しているかどうか
 */
export const hasTimeOverlap = (item1, item2) => {
  return !(item1.end < item2.start || item2.end < item1.start);
};
