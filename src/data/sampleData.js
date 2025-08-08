// 歴史タイムライン用サンプルデータ
export const sampleData = [
  // 日本の歴史人物
  {
    title: "夏目漱石",
    category: "people",
    start: 1867,
    end: 1916,
    events: [
      { start: 1900, content: "英国留学開始" },
      { start: 1903, content: "帰国、東京帝国大学講師就任" },
      { start: 1905, content: "『吾輩は猫である』発表" },
      { start: 1906, content: "『坊っちゃん』発表" },
      { start: 1907, content: "朝日新聞社入社" },
      { start: 1914, content: "『こころ』発表" },
    ],
    birth: "1867年2月9日",
    dead: "1916年12月9日",
    imageUrl: "/images/soseki.jpg",
  },
  {
    title: "森鴎外",
    category: "people",
    start: 1862,
    end: 1922,
    events: [
      { start: 1884, content: "ドイツ留学" },
      { start: 1888, content: "帰国、軍医として勤務" },
      { start: 1890, content: "『舞姫』発表" },
      { start: 1909, content: "『ヰタ・セクスアリス』発表" },
      { start: 1912, content: "『高瀬舟』発表" },
    ],
    birth: "1862年2月17日",
    dead: "1922年7月9日",
    imageUrl: "/images/ogai.jpg",
  },
  {
    title: "芥川龍之介",
    category: "people",
    start: 1892,
    end: 1927,
    events: [
      { start: 1915, content: "『羅生門』発表" },
      { start: 1916, content: "『鼻』発表、夏目漱石に絶賛される" },
      { start: 1918, content: "『地獄変』発表" },
      { start: 1922, content: "『藪の中』発表" },
      { start: 1927, content: "『河童』発表" },
    ],
    birth: "1892年3月1日",
    dead: "1927年7月24日",
    imageUrl: "/images/akutagawa.jpg",
  },

  // バウハウス関係者（大幅拡充）
  {
    title: "バウハウス",
    category: "organization",
    start: 1919,
    end: 1933,
    events: [
      { start: 1919, content: "ワイマールで設立、グロピウスが初代校長就任" },
      { start: 1920, content: "基礎課程（フォアクルス）開始" },
      { start: 1923, content: "第1回バウハウス展開催" },
      { start: 1925, content: "デッサウに移転、新校舎完成" },
      { start: 1928, content: "ハンネス・マイヤーが第2代校長就任" },
      { start: 1930, content: "ミース・ファン・デル・ローエが第3代校長就任" },
      { start: 1932, content: "ベルリンに移転" },
      { start: 1933, content: "ナチスにより閉校" },
    ],
    imageUrl: "/images/bauhaus.jpg",
  },
  {
    title: "ヴァルター・グロピウス",
    category: "people",
    start: 1883,
    end: 1969,
    events: [
      { start: 1907, content: "ペーター・ベーレンス事務所で働く" },
      { start: 1910, content: "独立、建築事務所開設" },
      { start: 1911, content: "ファグス工場設計（モダニズム建築の先駆け）" },
      { start: 1914, content: "ケルン工作連盟展示館設計" },
      { start: 1919, content: "バウハウス設立・初代校長就任" },
      { start: 1925, content: "バウハウス・デッサウ校舎設計" },
      { start: 1928, content: "バウハウス校長辞任" },
      { start: 1934, content: "イギリスに亡命" },
      { start: 1937, content: "アメリカに移住、ハーバード大学教授就任" },
      { start: 1963, content: "パンアメリカン航空ビル完成" },
    ],
    birth: "1883年5月18日",
    dead: "1969年7月5日",
    imageUrl: "/images/gropius.jpg",
  },
  {
    title: "ハンネス・マイヤー",
    category: "people",
    start: 1889,
    end: 1954,
    events: [
      { start: 1919, content: "スイスで建築事務所開設" },
      { start: 1927, content: "バウハウス建築科主任就任" },
      { start: 1928, content: "バウハウス第2代校長就任" },
      { start: 1930, content: "政治的理由でバウハウス校長解任" },
      { start: 1930, content: "ソビエト連邦に移住" },
      { start: 1936, content: "スイスに帰国" },
    ],
    birth: "1889年4月18日",
    dead: "1954年7月19日",
    imageUrl: "/images/meyer.jpg",
  },
  {
    title: "ルートヴィヒ・ミース・ファン・デル・ローエ",
    category: "people",
    start: 1886,
    end: 1969,
    events: [
      { start: 1907, content: "ペーター・ベーレンス事務所で働く" },
      { start: 1912, content: "独立、建築事務所開設" },
      { start: 1921, content: "ガラスの摩天楼プロジェクト発表" },
      { start: 1927, content: "ヴァイセンホーフ住宅展総監督" },
      { start: 1929, content: "バルセロナ・パビリオン設計" },
      { start: 1930, content: "バウハウス第3代校長就任" },
      { start: 1933, content: "バウハウス閉校" },
      { start: 1938, content: "アメリカに移住" },
      { start: 1951, content: "レイクショア・ドライブ・アパートメント完成" },
      { start: 1958, content: "シーグラム・ビル完成" },
    ],
    birth: "1886年3月27日",
    dead: "1969年8月17日",
    imageUrl: "/images/mies.jpg",
  },
  {
    title: "パウル・クレー",
    category: "people",
    start: 1879,
    end: 1940,
    events: [
      { start: 1906, content: "ミュンヘンで画家として活動開始" },
      { start: 1911, content: "青騎士グループに参加" },
      { start: 1914, content: "チュニジア旅行、色彩に目覚める" },
      { start: 1920, content: "バウハウス教授就任（形態論担当）" },
      { start: 1924, content: "青騎士グループ再結成" },
      { start: 1925, content: "『造形思考』出版" },
      {
        start: 1931,
        content: "バウハウス退職、デュッセルドルフ美術アカデミー教授就任",
      },
      { start: 1933, content: "ナチスに「退廃芸術」と批判され、スイスに帰国" },
      { start: 1935, content: "皮膚硬化症を発症" },
    ],
    birth: "1879年12月18日",
    dead: "1940年6月29日",
    imageUrl: "/images/klee.jpg",
  },
  {
    title: "ヴァシリー・カンディンスキー",
    category: "people",
    start: 1866,
    end: 1944,
    events: [
      { start: 1896, content: "ミュンヘンで絵画を学び始める" },
      { start: 1909, content: "新芸術家協会ミュンヘン設立" },
      { start: 1910, content: "最初の抽象絵画制作" },
      { start: 1911, content: "青騎士グループ結成" },
      { start: 1912, content: "『芸術における精神的なもの』出版" },
      { start: 1914, content: "第一次大戦でロシアに帰国" },
      { start: 1921, content: "ドイツに戻る" },
      { start: 1922, content: "バウハウス教授就任（壁画工房担当）" },
      { start: 1926, content: "『点と線から面へ』出版" },
      { start: 1933, content: "ナチスの迫害を逃れフランスに移住" },
      { start: 1939, content: "フランス国籍取得" },
    ],
    birth: "1866年12月16日",
    dead: "1944年12月13日",
    imageUrl: "/images/kandinsky.jpg",
  },
  {
    title: "ヨハネス・イッテン",
    category: "people",
    start: 1888,
    end: 1967,
    events: [
      { start: 1913, content: "ウィーンで美術教師として活動" },
      { start: 1916, content: "チューリッヒで私立美術学校開設" },
      { start: 1919, content: "バウハウス教授就任（基礎課程担当）" },
      { start: 1920, content: "色彩論の基礎を確立" },
      { start: 1922, content: "マズダ教に傾倒" },
      { start: 1923, content: "グロピウスと対立しバウハウス退職" },
      { start: 1926, content: "ベルリンで私立学校「現代美術学校」開設" },
      { start: 1932, content: "クレーフェルト織物学校校長就任" },
      { start: 1961, content: "『色彩の芸術』出版" },
    ],
    birth: "1888年11月11日",
    dead: "1967年3月25日",
    imageUrl: "/images/itten.jpg",
  },
  {
    title: "ラースロー・モホリ・ナジ",
    category: "people",
    start: 1895,
    end: 1946,
    events: [
      { start: 1917, content: "第一次大戦で負傷、絵画を始める" },
      { start: 1920, content: "ベルリンに移住、構成主義に影響を受ける" },
      { start: 1922, content: "フォトグラムの実験開始" },
      { start: 1923, content: "バウハウス教授就任（金属工房担当）" },
      { start: 1925, content: "『絵画・写真・映画』出版" },
      { start: 1928, content: "バウハウス退職" },
      { start: 1929, content: "『新しい視覚』出版" },
      { start: 1934, content: "ロンドンに移住" },
      { start: 1937, content: "シカゴでニュー・バウハウス設立" },
      { start: 1944, content: "写真技法の革新的実験" },
    ],
    birth: "1895年7月20日",
    dead: "1946年11月24日",
    imageUrl: "/images/moholy-nagy.jpg",
  },
  {
    title: "マルセル・ブロイヤー",
    category: "people",
    start: 1902,
    end: 1981,
    events: [
      { start: 1920, content: "バウハウス学生として入学" },
      { start: 1924, content: "バウハウス卒業、家具デザイナーとして活動" },
      { start: 1925, content: "バウハウス教授就任（家具工房担当）" },
      { start: 1925, content: "ワシリーチェア（スチールパイプ椅子）設計" },
      { start: 1928, content: "バウハウス退職、ベルリンで建築事務所開設" },
      { start: 1935, content: "イギリスに移住" },
      { start: 1937, content: "アメリカに移住、ハーバード大学教授就任" },
      { start: 1953, content: "ユネスコ本部ビル設計（パリ）" },
      { start: 1966, content: "ホイットニー美術館設計（ニューヨーク）" },
    ],
    birth: "1902年5月21日",
    dead: "1981年7月1日",
    imageUrl: "/images/breuer.jpg",
  },
  {
    title: "オスカー・シュレンマー",
    category: "people",
    start: 1888,
    end: 1943,
    events: [
      { start: 1920, content: "バウハウス教授就任（舞台工房・彫刻工房担当）" },
      { start: 1922, content: "「トリアディック・バレエ」初演" },
      { start: 1923, content: "バウハウス週間で舞台作品発表" },
      { start: 1929, content: "バウハウス退職" },
      { start: 1933, content: "ナチスに「退廃芸術」と批判される" },
      { start: 1940, content: "軍需工場で働く" },
    ],
    birth: "1888年9月4日",
    dead: "1943年4月13日",
    imageUrl: "/images/schlemmer.jpg",
  },
  {
    title: "ゲルトルート・グルノウ",
    category: "people",
    start: 1870,
    end: 1944,
    events: [
      { start: 1919, content: "バウハウス教授就任（織物工房担当）" },
      { start: 1920, content: "織物工房の基礎を確立" },
      { start: 1931, content: "バウハウス退職" },
      { start: 1933, content: "ナチスの迫害を受ける" },
    ],
    birth: "1870年3月17日",
    dead: "1944年6月11日",
    imageUrl: "/images/grunow.jpg",
  },
  {
    title: "アニー・アルバース",
    category: "people",
    start: 1899,
    end: 1994,
    events: [
      { start: 1922, content: "バウハウス学生として入学" },
      { start: 1925, content: "織物工房で活動" },
      { start: 1930, content: "ヨゼフ・アルバースと結婚" },
      { start: 1933, content: "アメリカに移住" },
      { start: 1949, content: "ニューヨーク近代美術館で個展開催" },
      { start: 1965, content: "『織物について』出版" },
    ],
    birth: "1899年6月12日",
    dead: "1994年5月9日",
    imageUrl: "/images/anni-albers.jpg",
  },
  {
    title: "ヨゼフ・アルバース",
    category: "people",
    start: 1888,
    end: 1976,
    events: [
      { start: 1920, content: "バウハウス学生として入学" },
      { start: 1923, content: "バウハウス教授就任（ガラス工房担当）" },
      { start: 1925, content: "基礎課程も担当" },
      {
        start: 1933,
        content: "アメリカに移住、ブラック・マウンテン・カレッジ教授就任",
      },
      { start: 1950, content: "イェール大学教授就任" },
      { start: 1963, content: "『色彩の相互作用』出版" },
    ],
    birth: "1888年3月19日",
    dead: "1976年3月25日",
    imageUrl: "/images/josef-albers.jpg",
  },
  {
    title: "ヘルベルト・バイヤー",
    category: "people",
    start: 1900,
    end: 1985,
    events: [
      { start: 1921, content: "バウハウス学生として入学" },
      { start: 1925, content: "バウハウス教授就任（印刷・広告工房担当）" },
      { start: 1926, content: "ユニバーサル書体デザイン" },
      {
        start: 1928,
        content: "バウハウス退職、ベルリンでグラフィックデザイナーとして活動",
      },
      { start: 1938, content: "アメリカに移住" },
      { start: 1946, content: "アスペン研究所設立に参加" },
    ],
    birth: "1900年4月5日",
    dead: "1985年9月30日",
    imageUrl: "/images/bayer.jpg",
  },

  // 組織・機関
  {
    title: "ルーヴル美術館",
    category: "organization",
    start: 1793,
    end: 2024,
    events: [
      { start: 1793, content: "フランス革命により王室コレクションを公開" },
      { start: 1797, content: "ナポレオンの戦利品が収蔵される" },
      { start: 1989, content: "ガラスのピラミッド完成" },
      { start: 2012, content: "ルーヴル・ランス開館" },
    ],
    imageUrl: "/images/louvre.jpg",
  },
  {
    title: "ニューヨーク近代美術館（MoMA）",
    category: "organization",
    start: 1929,
    end: 2024,
    events: [
      { start: 1929, content: "ニューヨークに設立" },
      { start: 1939, content: "現在の建物に移転" },
      { start: 1958, content: "彫刻庭園完成" },
      { start: 2004, content: "大規模改修完了" },
    ],
    imageUrl: "/images/moma.jpg",
  },
  {
    title: "ヴィーン分離派",
    category: "organization",
    start: 1897,
    end: 1905,
    events: [
      { start: 1897, content: "グスタフ・クリムトらにより設立" },
      { start: 1898, content: "分離派会館完成" },
      { start: 1902, content: "ベートーヴェン・フリーズ制作" },
      { start: 1905, content: "クリムトらが脱退" },
    ],
    imageUrl: "/images/secession.jpg",
  },

  // 日本の近現代人物
  // {
  //   title: "岡本太郎",
  //   category: "people",
  //   start: 1911,
  //   end: 1996,
  //   events: [
  //     { start: 1930, content: "パリに留学" },
  //     { start: 1940, content: "帰国" },
  //     { start: 1948, content: "『夜の会』結成" },
  //     { start: 1970, content: "大阪万博『太陽の塔』制作" },
  //     { start: 1989, content: "川崎市岡本太郎美術館開館" },
  //   ],
  //   birth: "1911年2月26日",
  //   dead: "1996年1月7日",
  //   imageUrl: "/images/okamoto.jpg",
  // },
  // {
  //   title: "草間彌生",
  //   category: "people",
  //   start: 1929,
  //   end: 2024,
  //   events: [
  //     { start: 1957, content: "アメリカに移住" },
  //     { start: 1966, content: "ヴェネツィア・ビエンナーレ参加" },
  //     { start: 1973, content: "日本に帰国" },
  //     { start: 1993, content: "ヴェネツィア・ビエンナーレ日本館代表" },
  //     { start: 2017, content: "草間彌生美術館開館" },
  //   ],
  //   birth: "1929年3月22日",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/kusama.jpg",
  // },
  // {
  //   title: "手塚治虫",
  //   category: "people",
  //   start: 1928,
  //   end: 1989,
  //   events: [
  //     { start: 1946, content: "『マアチャンの日記帳』でデビュー" },
  //     {
  //       start: 1947,
  //       content: "『新宝島』発表、ストーリーマンガの金字塔となる",
  //     },
  //     { start: 1952, content: "『鉄腕アトム』連載開始" },
  //     { start: 1961, content: "虫プロ商事（後の虫プロダクション）設立" },
  //     {
  //       start: 1963,
  //       content:
  //         "『鉄腕アトム』がテレビアニメとして放送開始（日本初の30分連続TVアニメ）",
  //     },
  //     { start: 1964, content: "カラーテレビアニメ『ジャングル大帝』放送開始" },
  //     {
  //       start: 1968,
  //       content: "虫プロダクションの経営悪化が表面化、徐々に活動を縮小",
  //     },
  //     {
  //       start: 1973,
  //       content: "『ブラック・ジャック』連載開始、医療マンガの金字塔に",
  //     },
  //     { start: 1975, content: "『三つ目がとおる』連載開始" },
  //     {
  //       start: 1978,
  //       content: "アニメ『火の鳥2772 愛のコスモゾーン』の制作開始",
  //     },
  //     {
  //       start: 1980,
  //       content: "『鉄腕アトム』が新作TVアニメとしてリメイク放送",
  //     },
  //     { start: 1984, content: "手塚プロダクションが本格的にアニメ制作を再開" },
  //     { start: 1986, content: "『ブッダ』の長編連載開始（死後も続く代表作）" },
  //     {
  //       start: 1989,
  //       content: "死去、アニメとマンガの両分野に絶大な影響を残す",
  //     },
  //   ],
  //   birth: "1928年11月3日",
  //   dead: "1989年2月9日",
  //   imageUrl: "/images/tezuka_osamu.jpg",
  // },
  // {
  //   title: "東映動画（現：東映アニメーション）",
  //   category: "organization",
  //   start: 1948,
  //   end: 2024,
  //   events: [
  //     {
  //       start: 1956,
  //       content:
  //         "東映がアニメ制作会社「日本動画株式会社」を買収、東映動画へ改名",
  //     },
  //     { start: 1958, content: "日本初のカラー長編アニメ映画『白蛇伝』を公開" },
  //     {
  //       start: 1963,
  //       content: "テレビアニメ『狼少年ケン』を制作、東映初のTVシリーズ",
  //     },
  //     {
  //       start: 1965,
  //       content: "『魔法使いサリー』放送開始、日本初の魔法少女アニメ",
  //     },
  //     {
  //       start: 1968,
  //       content: "『ゲゲゲの鬼太郎』アニメ化、妖怪ブームの火付け役に",
  //     },
  //     {
  //       start: 1969,
  //       content: "『タイガーマスク』放送開始、リアルなプロレス描写で話題に",
  //     },
  //     {
  //       start: 1972,
  //       content: "『マジンガーZ』放送開始、スーパーロボットアニメの元祖となる",
  //     },
  //     {
  //       start: 1986,
  //       content: "『ドラゴンボール』放送開始（後のZ、GT、超とシリーズ展開）",
  //     },
  //     {
  //       start: 1992,
  //       content: "『美少女戦士セーラームーン』放送開始、女児アニメの定番に",
  //     },
  //     {
  //       start: 1996,
  //       content:
  //         "『地獄先生ぬ〜べ〜』『るろうに剣心』など週刊ジャンプ原作アニメがヒット",
  //     },
  //     { start: 1999, content: "『ONE PIECE』放送開始、世界的ロングヒットに" },
  //     {
  //       start: 2006,
  //       content:
  //         "『プリキュア』シリーズが毎年展開される女児向けフランチャイズに定着",
  //     },
  //     { start: 2018, content: "『ドラゴンボール超 ブロリー』が海外で大ヒット" },
  //     {
  //       start: 2023,
  //       content:
  //         "『ゲゲゲの鬼太郎（第6期）』『デジモンゴーストゲーム』など新作も継続中",
  //     },
  //   ],
  //   birth: "1948年7月",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/toei_animation.jpg",
  // },
  // {
  //   title: "宮崎駿",
  //   category: "people",
  //   start: 1941,
  //   end: 2024,
  //   events: [
  //     {
  //       start: 1963,
  //       content: "東映動画に入社、演出助手としてキャリアをスタート",
  //     },
  //     {
  //       start: 1971,
  //       content:
  //         "Aプロダクション（現シンエイ動画）に移籍、『ルパン三世（第1シリーズ）』に参加",
  //     },
  //     { start: 1978, content: "『未来少年コナン』で初監督を務める" },
  //     {
  //       start: 1979,
  //       content: "劇場初監督作品『ルパン三世 カリオストロの城』公開",
  //     },
  //     {
  //       start: 1984,
  //       content:
  //         "『風の谷のナウシカ』を原作・監督、アニメ映画として公開（ジブリ設立の契機に）",
  //     },
  //     { start: 1985, content: "高畑勲らとスタジオジブリを設立" },
  //     { start: 1986, content: "スタジオジブリ第1作『天空の城ラピュタ』公開" },
  //     {
  //       start: 1988,
  //       content: "『となりのトトロ』公開、日本アニメの象徴的存在に",
  //     },
  //     { start: 1989, content: "『魔女の宅急便』公開、興行収入1位に" },
  //     { start: 1992, content: "『紅の豚』公開、社会人層からも支持を得る" },
  //     {
  //       start: 1997,
  //       content: "『もののけ姫』公開、日本映画史上最高興行収入を記録（当時）",
  //     },
  //     {
  //       start: 2001,
  //       content:
  //         "『千と千尋の神隠し』公開、日本アニメとして初のアカデミー賞（長編アニメ賞）受賞",
  //     },
  //     { start: 2004, content: "『ハウルの動く城』公開、再び海外で高評価" },
  //     {
  //       start: 2008,
  //       content: "『崖の上のポニョ』公開、手描きアニメーションの魅力を再提示",
  //     },
  //     {
  //       start: 2013,
  //       content: "『風立ちぬ』公開後、長編映画監督引退を発表（のちに撤回）",
  //     },
  //     { start: 2016, content: "短編『毛虫のボロ』完成、CGアニメに挑戦" },
  //     {
  //       start: 2023,
  //       content:
  //         "『君たちはどう生きるか』公開、10年ぶりの長編で世界的注目を集める",
  //     },
  //   ],
  //   birth: "1941年1月5日",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/miyazaki_hayao.jpg",
  // },
  // {
  //   title: "スタジオジブリ",
  //   category: "organization",
  //   start: 1985,
  //   end: 2024,
  //   events: [
  //     { start: 1985, content: "徳間書店と宮崎駿・高畑勲らによって設立される" },
  //     { start: 1986, content: "第一作『天空の城ラピュタ』を公開" },
  //     {
  //       start: 1988,
  //       content:
  //         "『となりのトトロ』『火垂るの墓』を同時上映、後に日本アニメ文化の象徴に",
  //     },
  //     {
  //       start: 1989,
  //       content: "『魔女の宅急便』公開、興行的成功により安定した制作基盤を築く",
  //     },
  //     {
  //       start: 1991,
  //       content: "『おもひでぽろぽろ』公開、高畑勲の繊細な演出が注目される",
  //     },
  //     {
  //       start: 1992,
  //       content:
  //         "『紅の豚』公開、スタジオ初の“社会人向けアニメ”として評価される",
  //     },
  //     { start: 1993, content: "徳間書店内にジブリ美術館の構想始動" },
  //     {
  //       start: 1994,
  //       content: "『平成狸合戦ぽんぽこ』公開、伝統と現代性の融合が話題に",
  //     },
  //     {
  //       start: 1995,
  //       content: "スタジオ初のテレビCM制作など、メディア展開拡大",
  //     },
  //     {
  //       start: 1997,
  //       content: "『もののけ姫』が興行収入193億円、日本映画史を塗り替える",
  //     },
  //     {
  //       start: 2001,
  //       content:
  //         "『千と千尋の神隠し』が日本歴代最高興行収入を記録、アカデミー賞を受賞",
  //     },
  //     {
  //       start: 2004,
  //       content:
  //         "『ハウルの動く城』がヴェネチア国際映画祭に出品、国際的評価を確立",
  //     },
  //     { start: 2005, content: "三鷹の森ジブリ美術館、来場者400万人を突破" },
  //     {
  //       start: 2008,
  //       content: "『崖の上のポニョ』公開、再び手描きアニメの魅力を世界に発信",
  //     },
  //     {
  //       start: 2010,
  //       content:
  //         "『借りぐらしのアリエッティ』公開、米林宏昌監督の長編デビュー作",
  //     },
  //     {
  //       start: 2013,
  //       content: "『風立ちぬ』『かぐや姫の物語』の2作が同年公開、話題に",
  //     },
  //     {
  //       start: 2014,
  //       content: "長編制作部門が一時休止と発表、事実上の制作体制再編",
  //     },
  //     {
  //       start: 2018,
  //       content: "新作『君たちはどう生きるか』の制作が発表され、宮崎駿が復帰へ",
  //     },
  //     {
  //       start: 2020,
  //       content: "初のフルCGアニメ『アーヤと魔女』NHKで放送（賛否両論）",
  //     },
  //     {
  //       start: 2023,
  //       content: "『君たちはどう生きるか』公開、国際的に高い評価を受ける",
  //     },
  //   ],
  //   birth: "1985年6月15日",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/studio_ghibli.jpg",
  // },
  // {
  //   title: "庵野秀明",
  //   category: "people",
  //   start: 1960,
  //   end: 2024,
  //   events: [
  //     {
  //       start: 1981,
  //       content:
  //         "大阪芸術大学在学中に『DAICON III オープニングアニメ』制作に参加、話題となる",
  //     },
  //     {
  //       start: 1984,
  //       content:
  //         "『風の谷のナウシカ』に原画スタッフとして参加（巨神兵など担当）",
  //     },
  //     { start: 1984, content: "アマチュア仲間と共にガイナックスを設立" },
  //     {
  //       start: 1987,
  //       content: "初監督作品『トップをねらえ！』発表、後にカルト的人気を獲得",
  //     },
  //     {
  //       start: 1990,
  //       content:
  //         "NHKの人気作『ふしぎの海のナディア』を総監督、トラブルを抱えながらも成功",
  //     },
  //     {
  //       start: 1995,
  //       content: "『新世紀エヴァンゲリオン』放送開始、社会現象となる",
  //     },
  //     {
  //       start: 1997,
  //       content:
  //         "『THE END OF EVANGELION』公開、エヴァTV版の代替最終回として衝撃を与える",
  //     },
  //     {
  //       start: 2006,
  //       content:
  //         "アニメ業界を離れ、実写映画『キューティーハニー』やエッセイ作品を制作",
  //     },
  //     {
  //       start: 2007,
  //       content: "株式会社カラーを設立、エヴァ新劇場版プロジェクトを始動",
  //     },
  //     { start: 2007, content: "『ヱヴァンゲリヲン新劇場版：序』公開" },
  //     { start: 2009, content: "『：破』公開、原作を大きく改編し話題に" },
  //     {
  //       start: 2012,
  //       content: "『：Q』公開、物語が大きく分岐しファンの間で議論を呼ぶ",
  //     },
  //     {
  //       start: 2016,
  //       content:
  //         "『シン・ゴジラ』を総監督・脚本として手がけ大ヒット、実写映画監督としても脚光を浴びる",
  //     },
  //     {
  //       start: 2021,
  //       content:
  //         "『シン・エヴァンゲリオン劇場版𝄇』公開、約26年に渡るシリーズが完結",
  //     },
  //     { start: 2022, content: "『シン・ウルトラマン』脚本・企画を担当" },
  //     {
  //       start: 2023,
  //       content:
  //         "『シン・仮面ライダー』を監督・脚本、特撮ヒーローへの愛と解釈を注ぐ",
  //     },
  //   ],
  //   birth: "1960年5月22日",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/anno_hideaki.jpg",
  // },
  // {
  //   title: "サンライズ（現：バンダイナムコフィルムワークス）",
  //   category: "organization",
  //   start: 1972,
  //   end: 2024,
  //   events: [
  //     { start: 1972, content: "創業者・池田東陽らにより設立、前身は創映社" },
  //     {
  //       start: 1977,
  //       content: "初のオリジナルロボットアニメ『無敵超人ザンボット3』を制作",
  //     },
  //     {
  //       start: 1979,
  //       content:
  //         "『機動戦士ガンダム』放送開始。低視聴率で打ち切りも、再放送とプラモデルで人気爆発",
  //     },
  //     {
  //       start: 1981,
  //       content:
  //         "劇場版『機動戦士ガンダム』三部作が大ヒット、リアルロボットアニメの定番に",
  //     },
  //     {
  //       start: 1985,
  //       content: "『機動戦士Ζガンダム』放送開始、富野由悠季が続投",
  //     },
  //     {
  //       start: 1986,
  //       content:
  //         "『機動戦士ガンダムZZ』放送開始、ギャグとシリアスの混合が話題に",
  //     },
  //     {
  //       start: 1988,
  //       content: "劇場版『逆襲のシャア』公開、アムロとシャアの決着が描かれる",
  //     },
  //     {
  //       start: 1993,
  //       content: "『勇者特急マイトガイン』など勇者シリーズが子ども層に人気",
  //     },
  //     {
  //       start: 1994,
  //       content:
  //         "『機動武闘伝Gガンダム』でガンダムシリーズに異色の格闘スタイル導入",
  //     },
  //     {
  //       start: 1995,
  //       content: "『新機動戦記ガンダムW』が女性ファンからも支持を獲得",
  //     },
  //     {
  //       start: 2002,
  //       content: "『機動戦士ガンダムSEED』放送、若年層を中心に新たな人気を獲得",
  //     },
  //     {
  //       start: 2007,
  //       content: "『コードギアス 反逆のルルーシュ』が社会現象的ヒットに",
  //     },
  //     {
  //       start: 2014,
  //       content:
  //         "『ガンダムビルドファイターズ』『鉄血のオルフェンズ』など多様な展開を見せる",
  //     },
  //     {
  //       start: 2021,
  //       content:
  //         "バンダイナムコフィルムワークスとして再編、サンライズ名はブランド化へ",
  //     },
  //     {
  //       start: 2022,
  //       content: "『機動戦士ガンダム 水星の魔女』放送、新たな層の獲得に成功",
  //     },
  //   ],
  //   birth: "1972年9月",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/sunrise.jpg",
  // },
  // {
  //   title: "京都アニメーション",
  //   category: "organization",
  //   start: 1985,
  //   end: 2024,
  //   events: [
  //     { start: 1985, content: "八田陽子・英明夫妻により京都府宇治市で創業" },
  //     {
  //       start: 1999,
  //       content: "『あたしンち』の原画・仕上げなどを請け負いながら経験を積む",
  //     },
  //     {
  //       start: 2003,
  //       content: "初の元請け作品『フルメタル・パニック？ ふもっふ』を制作",
  //     },
  //     {
  //       start: 2005,
  //       content:
  //         "『AIR』を京アニ初のTVシリーズ元請け作品として放送、演出と作画の質が話題に",
  //     },
  //     {
  //       start: 2006,
  //       content:
  //         "『涼宮ハルヒの憂鬱』で爆発的ヒットを記録、アニメファン層を拡大",
  //     },
  //     { start: 2007, content: "『らき☆すた』で聖地巡礼ブームを巻き起こす" },
  //     {
  //       start: 2009,
  //       content: "『けいおん！』が社会現象に、CD売上やライブ動員も成功",
  //     },
  //     {
  //       start: 2012,
  //       content:
  //         "オリジナル作品『氷菓』放送開始、文学的作風と高い作画が評価される",
  //     },
  //     {
  //       start: 2013,
  //       content:
  //         "『中二病でも恋がしたい！』『たまこまーけっと』など独自路線を確立",
  //     },
  //     {
  //       start: 2015,
  //       content:
  //         "『響け！ユーフォニアム』放送、リアルな青春描写と吹奏楽の演出が好評",
  //     },
  //     {
  //       start: 2016,
  //       content: "『聲の形』公開、社会性と感動が融合した映画として各国で高評価",
  //     },
  //     {
  //       start: 2018,
  //       content:
  //         "『ヴァイオレット・エヴァーガーデン』放送、国際展開とNetflix配信で注目を集める",
  //     },
  //     {
  //       start: 2019,
  //       content:
  //         "放火事件により社員36名が犠牲に。国内外から支援の声が寄せられる",
  //     },
  //     {
  //       start: 2020,
  //       content: "『ヴァイオレット・エヴァーガーデン 外伝』がロングラン上映",
  //     },
  //     {
  //       start: 2021,
  //       content:
  //         "『劇場版 ヴァイオレット・エヴァーガーデン』が興行的にも成功、完全復帰を印象付ける",
  //     },
  //     {
  //       start: 2024,
  //       content:
  //         "新作映画『響け！ユーフォニアム３』シリーズ続編が発表され、今後も注目を集める",
  //     },
  //   ],
  //   birth: "1985年",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/kyoto_animation.jpg",
  // },
  // {
  //   title: "富野由悠季",
  //   category: "people",
  //   start: 1941,
  //   end: 2024,
  //   events: [
  //     {
  //       start: 1964,
  //       content:
  //         "虫プロダクションに入社、『鉄腕アトム』の演出助手としてアニメ業界入り",
  //     },
  //     {
  //       start: 1972,
  //       content:
  //         "サンライズ（創映社）に参加、ロボットアニメの演出を多く手がける",
  //     },
  //     { start: 1975, content: "初監督作品『勇者ライディーン』が放送開始" },
  //     {
  //       start: 1977,
  //       content:
  //         "『無敵超人ザンボット3』でリアルな死や悲劇性をロボットアニメに導入",
  //     },
  //     {
  //       start: 1979,
  //       content:
  //         "『機動戦士ガンダム』放送開始。リアルロボット路線の先駆けとなる",
  //     },
  //     {
  //       start: 1981,
  //       content: "『機動戦士ガンダム』劇場三部作を総監督、人気を決定づける",
  //     },
  //     {
  //       start: 1984,
  //       content: "『重戦機エルガイム』で後のガンダムシリーズに繋がる要素を拡張",
  //     },
  //     {
  //       start: 1985,
  //       content:
  //         "『機動戦士Ζガンダム』放送開始。よりシリアスな展開でファン層を拡大",
  //     },
  //     {
  //       start: 1986,
  //       content: "『機動戦士ガンダムZZ』放送開始。作風のギャップが物議を醸す",
  //     },
  //     {
  //       start: 1988,
  //       content:
  //         "『逆襲のシャア』公開、アムロとシャアの物語に一つの決着をつける",
  //     },
  //     {
  //       start: 1991,
  //       content:
  //         "『機動戦士ガンダムF91』公開、宇宙世紀新章として位置づけられる",
  //     },
  //     {
  //       start: 1993,
  //       content: "『機動戦士Vガンダム』放送。鬱展開と思想的描写が話題に",
  //     },
  //     {
  //       start: 1999,
  //       content:
  //         "『∀ガンダム』放送。過去全シリーズを内包する独自の世界観を提示",
  //     },
  //     {
  //       start: 2002,
  //       content: "『OVERMANキングゲイナー』放送。明るい作風と音楽演出で話題に",
  //     },
  //     {
  //       start: 2014,
  //       content: "『Gのレコンギスタ』放送開始、15年ぶりにTVシリーズへ復帰",
  //     },
  //     {
  //       start: 2019,
  //       content: "劇場版『Gのレコンギスタ』シリーズ始動、再構築版として展開",
  //     },
  //     {
  //       start: 2023,
  //       content:
  //         "『ガンダムリビルド計画』に関する発言が話題に。今なお現役で意欲を見せる",
  //     },
  //   ],
  //   birth: "1941年11月5日",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/tomino_yoshiyuki.jpg",
  // },
  // {
  //   title: "高畑勲",
  //   category: "people",
  //   start: 1935,
  //   end: 2018,
  //   events: [
  //     {
  //       start: 1959,
  //       content: "東映動画に入社、演出助手としてキャリアをスタート",
  //     },
  //     { start: 1963, content: "『狼少年ケン』で演出を担当、頭角を現す" },
  //     {
  //       start: 1968,
  //       content:
  //         "監督デビュー作『太陽の王子 ホルスの大冒険』公開、当時の常識を超えた演出で高評価",
  //     },
  //     {
  //       start: 1971,
  //       content: "東映を退社、Aプロダクション（現シンエイ動画）に移籍",
  //     },
  //     {
  //       start: 1974,
  //       content: "『アルプスの少女ハイジ』演出・構成、国民的作品となる",
  //     },
  //     {
  //       start: 1976,
  //       content:
  //         "『母をたずねて三千里』の演出を担当、感動的な人間ドラマで知られる",
  //     },
  //     {
  //       start: 1979,
  //       content: "日本アニメーションを経て『赤毛のアン』の演出を担当",
  //     },
  //     {
  //       start: 1984,
  //       content:
  //         "『風の谷のナウシカ』にプロデューサー的立場で参加、宮崎駿との協力関係を強化",
  //     },
  //     { start: 1985, content: "スタジオジブリ設立に参加" },
  //     { start: 1987, content: "『火垂るの墓』の制作を開始" },
  //     {
  //       start: 1988,
  //       content:
  //         "『火垂るの墓』公開、戦争の悲惨さを描いたアニメーションとして世界的に評価される",
  //     },
  //     {
  //       start: 1991,
  //       content:
  //         "『おもひでぽろぽろ』公開、日常と内面を描いた作品として新境地を切り開く",
  //     },
  //     {
  //       start: 1994,
  //       content: "『平成狸合戦ぽんぽこ』公開、自然と人間の共存をテーマに",
  //     },
  //     {
  //       start: 1999,
  //       content:
  //         "『ホーホケキョ となりの山田くん』公開、水彩タッチのアニメーションに挑戦",
  //     },
  //     {
  //       start: 2013,
  //       content:
  //         "14年ぶりの長編『かぐや姫の物語』を公開、緻密な絵と深い物語が国際的に評価される",
  //     },
  //     {
  //       start: 2014,
  //       content: "『かぐや姫の物語』がアカデミー賞長編アニメ賞にノミネート",
  //     },
  //     {
  //       start: 2018,
  //       content:
  //         "逝去。宮崎駿から「唯一無二の同志」と称され、多くの後進に影響を与えた",
  //     },
  //   ],
  //   birth: "1935年10月29日",
  //   dead: "2018年4月5日",
  //   imageUrl: "/images/takahata_isao.jpg",
  // },
  // {
  //   title: "押井守",
  //   category: "people",
  //   start: 1951,
  //   end: 2024,
  //   events: [
  //     {
  //       start: 1981,
  //       content: "『うる星やつら』でTVシリーズ初監督に抜擢される",
  //     },
  //     {
  //       start: 1983,
  //       content:
  //         "『うる星やつら2 ビューティフル・ドリーマー』公開、実験的な演出が物議を醸すも後に再評価",
  //     },
  //     {
  //       start: 1985,
  //       content: "『天使のたまご』公開、哲学的で抽象的な世界観が話題に",
  //     },
  //     { start: 1987, content: "『紅い眼鏡』で実写映画監督デビュー" },
  //     {
  //       start: 1989,
  //       content: "『機動警察パトレイバー the Movie』公開、社会派SFとしてヒット",
  //     },
  //     {
  //       start: 1993,
  //       content:
  //         "『機動警察パトレイバー2 the Movie』公開、冷戦とテロをテーマに高評価",
  //     },
  //     {
  //       start: 1995,
  //       content:
  //         "『GHOST IN THE SHELL／攻殻機動隊』公開、世界的に高く評価されるサイバーパンク作品に",
  //     },
  //     { start: 1999, content: "続編『イノセンス』の制作を発表" },
  //     {
  //       start: 2004,
  //       content:
  //         "『イノセンス』公開。カンヌ国際映画祭コンペティション部門に正式出品",
  //     },
  //     {
  //       start: 2008,
  //       content:
  //         "実写とCG融合の『スカイ・クロラ The Sky Crawlers』公開、ヴェネチア国際映画祭に出品",
  //     },
  //     {
  //       start: 2014,
  //       content: "TVアニメ『攻殻機動隊ARISE』シリーズ監修、後進の指導にも注力",
  //     },
  //     {
  //       start: 2015,
  //       content:
  //         "『ガルム・ウォーズ』で長年の企画が実現、実写とCGの融合表現に挑戦",
  //     },
  //     {
  //       start: 2018,
  //       content:
  //         "「バーチャルの時代に生きる監督」として、デジタル映像に関する発言が注目される",
  //     },
  //     {
  //       start: 2023,
  //       content:
  //         "『ぶらどらぶ（VLADLOVE）』公開、吸血鬼×JKという異色コメディで再び話題に",
  //     },
  //   ],
  //   birth: "1951年8月8日",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/oshii_mamoru.jpg",
  // },
  // {
  //   title: "ガイナックス",
  //   category: "organization",
  //   start: 1984,
  //   end: 2024,
  //   events: [
  //     { start: 1987, content: "『トップをねらえ！』を発表、庵野秀明監督作品" },
  //     { start: 1990, content: "『ふしぎの海のナディア』放送開始" },
  //     { start: 1995, content: "『新世紀エヴァンゲリオン』が社会現象に" },
  //     { start: 2000, content: "庵野秀明が退社しカラー設立へ" },
  //   ],
  //   birth: "1984年",
  //   dead: "現在も活動中",
  //   imageUrl: "/images/gainax.jpg",
  // },
];
