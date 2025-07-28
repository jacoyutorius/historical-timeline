import React, { createContext, useContext, useState, useEffect } from "react";

// フォントサイズ設定の定数
export const FONT_SIZE_OPTIONS = {
  small: {
    name: "小",
    multiplier: 1.0,
    sizes: {
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "15px",
      xl: "16px",
    },
  },
  medium: {
    name: "中",
    multiplier: 1.2,
    sizes: {
      xs: "14px",
      sm: "15px",
      md: "16px",
      lg: "17px",
      xl: "18px",
    },
  },
  large: {
    name: "大",
    multiplier: 1.4,
    sizes: {
      xs: "16px",
      sm: "17px",
      md: "18px",
      lg: "19px",
      xl: "20px",
    },
  },
};

// ローカルストレージのキー
const STORAGE_KEY = "timeline-font-size-settings";

// デフォルト設定
const DEFAULT_SETTINGS = {
  size: "medium",
  multiplier: 1.2,
  lastUpdated: new Date().toISOString(),
};

// Context作成
const FontSizeContext = createContext();

// フォントサイズ設定の検証関数
const validateFontSizeSettings = (settings) => {
  if (!settings || typeof settings !== "object") {
    return false;
  }

  const { size, multiplier, lastUpdated } = settings;

  // サイズが有効な値かチェック
  if (!size || !FONT_SIZE_OPTIONS[size]) {
    return false;
  }

  // multiplierが数値かチェック
  if (typeof multiplier !== "number" || multiplier <= 0) {
    return false;
  }

  // lastUpdatedが有効な日付文字列かチェック
  if (!lastUpdated || isNaN(new Date(lastUpdated).getTime())) {
    return false;
  }

  return true;
};

// ローカルストレージから設定を読み込む関数
const loadFontSizeSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(stored);

    // 設定の妥当性をチェック
    if (!validateFontSizeSettings(parsed)) {
      console.warn(
        "Invalid font size settings found in localStorage, using defaults"
      );
      return DEFAULT_SETTINGS;
    }

    return parsed;
  } catch (error) {
    console.error("Error loading font size settings from localStorage:", error);
    return DEFAULT_SETTINGS;
  }
};

// ローカルストレージに設定を保存する関数
const saveFontSizeSettings = (settings) => {
  try {
    const settingsToSave = {
      ...settings,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
    return true;
  } catch (error) {
    console.error("Error saving font size settings to localStorage:", error);
    return false;
  }
};

// CSS変数を更新する関数
const updateCSSVariables = (size) => {
  const config = FONT_SIZE_OPTIONS[size];
  if (!config) {
    console.error("Invalid font size:", size);
    return;
  }

  const root = document.documentElement;

  // CSS変数を更新
  Object.entries(config.sizes).forEach(([key, value]) => {
    root.style.setProperty(`--timeline-font-size-${key}`, value);
  });

  // multiplierも設定
  root.style.setProperty("--timeline-font-multiplier", config.multiplier);
};

// FontSizeProvider コンポーネント
export const FontSizeProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => loadFontSizeSettings());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初期化時にCSS変数を設定
  useEffect(() => {
    try {
      updateCSSVariables(settings.size);
      setIsLoading(false);
    } catch (err) {
      console.error("Error initializing font size:", err);
      setError("フォントサイズの初期化に失敗しました");
      setIsLoading(false);
    }
  }, []);

  // フォントサイズを変更する関数
  const setFontSize = (newSize) => {
    try {
      // 有効なサイズかチェック
      if (!FONT_SIZE_OPTIONS[newSize]) {
        throw new Error(`Invalid font size: ${newSize}`);
      }

      const newSettings = {
        size: newSize,
        multiplier: FONT_SIZE_OPTIONS[newSize].multiplier,
        lastUpdated: new Date().toISOString(),
      };

      // CSS変数を更新
      updateCSSVariables(newSize);

      // 状態を更新
      setSettings(newSettings);

      // ローカルストレージに保存
      const saved = saveFontSizeSettings(newSettings);
      if (!saved) {
        console.warn("Failed to save font size settings to localStorage");
      }

      // エラーをクリア
      setError(null);
    } catch (err) {
      console.error("Error setting font size:", err);
      setError("フォントサイズの変更に失敗しました");
    }
  };

  // 設定をリセットする関数
  const resetFontSize = () => {
    try {
      setFontSize(DEFAULT_SETTINGS.size);
    } catch (err) {
      console.error("Error resetting font size:", err);
      setError("フォントサイズのリセットに失敗しました");
    }
  };

  // 現在のフォントサイズ設定を取得する関数
  const getCurrentFontSizeConfig = () => {
    return (
      FONT_SIZE_OPTIONS[settings.size] ||
      FONT_SIZE_OPTIONS[DEFAULT_SETTINGS.size]
    );
  };

  const contextValue = {
    // 現在の設定
    fontSize: settings.size,
    fontSizeMultiplier: settings.multiplier,
    fontSizeConfig: getCurrentFontSizeConfig(),

    // 設定変更関数
    setFontSize,
    resetFontSize,

    // 利用可能なオプション
    fontSizeOptions: FONT_SIZE_OPTIONS,

    // 状態
    isLoading,
    error,

    // 最終更新日時
    lastUpdated: settings.lastUpdated,
  };

  return (
    <FontSizeContext.Provider value={contextValue}>
      {children}
    </FontSizeContext.Provider>
  );
};

// カスタムフック
export const useFontSize = () => {
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }

  return context;
};

// CSS変数から現在のフォントサイズを取得するヘルパー関数
export const getCurrentFontSize = (sizeKey) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--timeline-font-size-${sizeKey}`)
    .trim();
};

export default FontSizeContext;
