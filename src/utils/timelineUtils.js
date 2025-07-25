// タイムライン用ユーティリティ関数

/**
 * データの妥当性をチェックする
 * @param {Array} data - チェックするデータ配列
 * @returns {boolean} - データが有効かどうか
 */
export const validateTimelineData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }
  
  return data.every(item => {
    return (
      item.title &&
      typeof item.start === 'number' &&
      typeof item.end === 'number' &&
      item.start <= item.end &&
      ['people', 'organization'].includes(item.category)
    );
  });
};

/**
 * データを開始年でソートする
 * @param {Array} data - ソートするデータ配列
 * @returns {Array} - ソート済みデータ配列
 */
export const sortDataByStartYear = (data) => {
  return [...data].sort((a, b) => a.start - b.start);
};

/**
 * 時間範囲を計算する
 * @param {Array} data - データ配列
 * @returns {Object} - {minYear, maxYear}
 */
export const calculateTimeRange = (data) => {
  const minYear = Math.min(...data.map(d => d.start));
  const maxYear = Math.max(...data.map(d => d.end));
  
  return { minYear, maxYear };
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