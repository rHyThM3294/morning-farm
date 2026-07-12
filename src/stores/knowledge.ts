// src/stores/knowledge.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface KnowledgeTag {
  label: string
  to: string
}

interface KnowledgeParagraph {
  question: string
  answer: string
}

interface KnowledgeRelatedProduct {
  status: string
  productTitle: string
  sellerName: string
  unit: string
  price: string
  imageUrl: string
}

interface KnowledgeArticle {
  id: number
  category: string
  title: string
  image: string
  tags: KnowledgeTag[]
  content: {
    intro: string
    paragraphs: KnowledgeParagraph[]
    relatedProducts: { title: string; keyword: string }
  }
  relatedCardItems: KnowledgeRelatedProduct[]
}

export const useKnowledgeStore = defineStore('knowledge', () => {
  const activeCategory = ref('all')
  const searchKeyword = ref('')

  const knowledgeList: KnowledgeArticle[] = [
    // ── 蔬果處理 ──────────────────────────────────────────────
    {
      id: 1,
      category: 'vegetable_handling',
      title: '裂果蓮霧更好吃？原來是熟到剛剛好！教你安心吃的處理方法',
      image: 'image/S__20611108.png',
      tags: [
        { label: '蔬果處理', to: '/tag/vegetable_handling' },
        { label: '蓮霧', to: '/tag/wax-apple' }
      ],
      content: {
        intro: '走進果園或市場，你或許會看到一些「裂果」的蓮霧──表皮出現自然的裂痕，不如市售光滑漂亮的果實那樣討喜。但其實，這些裂果蓮霧往往是最甜、最剛好熟成的美味代表！',
        paragraphs: [
          {
            question: '為什麼蓮霧會裂果？',
            answer: '裂果多半發生在蓮霧成熟期遇到雨水，果實吸水過多、膨脹迅速，導致表皮來不及延展而自然開裂。這不是病蟲害，也不是腐爛的象徵，而是一種天然的「熟成指標」。'
          },
          {
            question: '裂果蓮霧怎麼處理最好吃？',
            answer: '購回後先用清水輕輕沖洗，切除開裂處若有些微氧化的部分，剩餘果肉甜度集中、口感脆爽。建議當天食用，保鮮期較完整果實短，冷藏可保存 1～2 天。'
          },
          {
            question: '購買時怎麼挑選好的蓮霧？',
            answer: '挑選表皮鮮紅飽滿、底部中空部分較深者，代表果實熟成度高。輕壓有彈性但不軟爛，香氣濃郁為佳。裂果雖然外觀不完美，但風味往往優於外表光滑的果實。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買蓮霧：',
          keyword: '蓮霧'
        }
      },
      relatedCardItems: [
        { status: 'New', productTitle: '黑珍珠蓮霧', sellerName: '王建國果園', unit: '6 顆 / 盒', price: '180', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '大武蓮霧', sellerName: '林家果園', unit: '10 顆 / 箱', price: '420', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '蜜甜蓮霧', sellerName: '陳媽媽水果舖', unit: '12 顆 / 箱', price: '390', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 2,
      category: 'vegetable_handling',
      title: '芭樂這樣挑、這樣放，甜脆口感保存更久！',
      image: 'image/S__20611108.png',
      tags: [
        { label: '蔬果處理', to: '/tag/vegetable_handling' },
        { label: '芭樂', to: '/tag/guava' }
      ],
      content: {
        intro: '芭樂是台灣最親民的水果之一，四季都有。但你知道嗎？挑選和保存方式不對，芭樂很快就會變得粉爛、失去脆感。掌握幾個小技巧，讓每顆芭樂都能在最佳狀態被享用！',
        paragraphs: [
          {
            question: '如何挑選好的芭樂？',
            answer: '挑選表皮淺綠帶黃、紋路細緻均勻的芭樂。用手輕捏感受彈性，太硬的還未熟透，過軟則已過熟。底部（花端）有淡淡清香是熟成的好兆頭，避免挑選有黑斑或病蟲害痕跡的果實。'
          },
          {
            question: '芭樂怎麼保存才對？',
            answer: '常溫放置可自然後熟，約 2～3 天達到最佳甜度。若不想讓它繼續熟，放入冰箱冷藏可延長保存 5～7 天。切開後請用保鮮膜包好，避免氧化變褐，最好在 2 天內食用完畢。'
          },
          {
            question: '芭樂籽能吃嗎？',
            answer: '芭樂籽完全可以食用，且富含纖維質。但若腸胃較敏感的人，建議去籽再吃，避免一次攝取過多不易消化的硬質籽粒造成腸胃不適。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買芭樂：',
          keyword: '芭樂'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '珍珠芭樂', sellerName: '南投水果農場', unit: '5 斤 / 箱', price: '280', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '紅心芭樂', sellerName: '嘉義農民市集', unit: '3 斤 / 袋', price: '150', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '泰國芭樂', sellerName: '大樹果園', unit: '4 斤 / 盒', price: '200', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 3,
      category: 'vegetable_handling',
      title: '葉菜類保鮮有撇步！讓菠菜青江菜在冰箱多放三倍久',
      image: 'image/S__20611108.png',
      tags: [
        { label: '蔬果處理', to: '/tag/vegetable_handling' },
        { label: '葉菜', to: '/tag/leafy-greens' }
      ],
      content: {
        intro: '葉菜類最讓人頭痛的問題就是「買回來沒兩天就軟爛發黃」。其實只要在放入冰箱前做好幾個步驟，葉菜類保鮮期可以輕鬆延長至一週以上！',
        paragraphs: [
          {
            question: '葉菜為什麼容易快速凋萎？',
            answer: '葉菜含水量高達 85～95%，採摘後仍持續蒸散水分，加上葉片薄，接觸空氣面積大，因此失水極快。冰箱的低溫可以減緩代謝，但若直接放置不加保護，仍會快速失去水分。'
          },
          {
            question: '正確保存葉菜的方法是什麼？',
            answer: '先不要清洗，將葉菜用略微濕潤的廚房紙巾包裹，再裝入透氣袋或保鮮袋中（留一點空氣），放入冰箱蔬果室保存。要吃的時候再清洗，可延長保鮮至 7～10 天。'
          },
          {
            question: '葉菜能不能汆燙後冷凍？',
            answer: '可以！先汆燙 30 秒，過冰水後擠乾水分，分裝小份放入冷凍，可保存 1～2 個月。適合烹飪用途，但口感會比新鮮略軟，不建議用於需要爽脆口感的沙拉料理。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買新鮮葉菜：',
          keyword: '菠菜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '有機菠菜', sellerName: '坪林有機農場', unit: '300g / 包', price: '65', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '青江菜', sellerName: '桃園農業直銷', unit: '500g / 袋', price: '45', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '空心菜', sellerName: '彰化蔬菜園', unit: '400g / 束', price: '40', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 4,
      category: 'vegetable_handling',
      title: '番茄千萬不能放冰箱！揭開低溫傷番茄的真相',
      image: 'image/S__20611108.png',
      tags: [
        { label: '蔬果處理', to: '/tag/vegetable_handling' },
        { label: '番茄', to: '/tag/tomato' }
      ],
      content: {
        intro: '很多人習慣把番茄一買回來就丟進冰箱，但其實這個做法反而會破壞番茄的風味！番茄是熱帶果實，對低溫相當敏感，冷藏後味道會變得水水淡淡，完全失去應有的香甜。',
        paragraphs: [
          {
            question: '為什麼低溫會傷害番茄？',
            answer: '番茄原產於中南美洲溫暖地區，對攝氏 10 度以下的環境相當不耐。低溫會破壞番茄細胞膜結構，導致酵素活性受損，使得番茄無法繼續正常後熟，香氣分子流失，口感變得粉糯不爽口。'
          },
          {
            question: '番茄應該怎麼保存？',
            answer: '未熟的番茄放在陰涼通風處，蒂頭朝下擺放，約 3～5 天可自然後熟。熟透的番茄若短期內（2 天內）要食用，常溫保存即可；若超過 2 天，可短暫冷藏但盡快取出回溫再食用。'
          },
          {
            question: '哪種番茄最適合生吃？',
            answer: '小番茄（聖女番茄、玉女番茄）糖度高、酸甜平衡，適合直接生食或做沙拉；牛番茄肉質厚、汁水多，適合炒蛋或燉煮；黑柿番茄風味濃郁，兩者皆宜。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買番茄：',
          keyword: '番茄'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '玉女小番茄', sellerName: '嘉義玉田農場', unit: '600g / 盒', price: '120', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '牛番茄', sellerName: '雲林農民市集', unit: '5 粒 / 袋', price: '80', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '黑柿番茄', sellerName: '台南水果直銷', unit: '1kg / 袋', price: '130', imageUrl: '/image/chinese-pear.png' }
      ]
    },

    // ── 農業知識 ──────────────────────────────────────────────
    {
      id: 5,
      category: 'farming',
      title: '有機農業到底有多難？一個農夫的三年轉型之路',
      image: 'image/S__20611108.png',
      tags: [
        { label: '農業知識', to: '/tag/farming' },
        { label: '有機農業', to: '/tag/organic-farming' }
      ],
      content: {
        intro: '「有機」兩個字說起來簡單，但對農夫來說，那代表的是年復一年與蟲害、天候、市場競爭搏鬥的艱辛旅程。從慣行農業轉型為有機，至少需要三年的轉型期，這段時間農夫幾乎是「流血流汗賠本做」。',
        paragraphs: [
          {
            question: '有機農業轉型期為什麼這麼長？',
            answer: '台灣農委會規定，申請有機認證前需有至少三年的轉型期，期間必須完全停止使用農藥與化學肥料。土壤中殘留的農藥需要時間分解，土壤微生物生態也需要時間恢復，轉型期的作物往往產量大減、病蟲害問題嚴重。'
          },
          {
            question: '有機農業如何防治病蟲害？',
            answer: '有機農業使用天然資材（苦楝油、矽藻土等）驅蟲、種植蜜源植物吸引天敵昆蟲、輪作制度避免土壤病菌累積，以及利用物理防治如防蟲網與粘蟲板。這些方法效果較慢，需要系統性管理才能奏效。'
          },
          {
            question: '消費者如何辨識真正的有機農產品？',
            answer: '台灣合法有機農產品必須附有政府認可的有機認證標章（如MOA、TOPA等），並可在農委會「農業易遊網」查詢認證資料。直接向認識的農夫購買、加入農夫市集或CSA（社區支持型農業）也是信賴的方式。'
          }
        ],
        relatedProducts: {
          title: '選購有機農產品：',
          keyword: '有機'
        }
      },
      relatedCardItems: [
        { status: 'New', productTitle: '有機地瓜', sellerName: '花蓮有機農場', unit: '1kg / 袋', price: '150', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '有機高麗菜', sellerName: '梨山有機農業', unit: '1 顆 / 個', price: '120', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '有機苦瓜', sellerName: '南投青農', unit: '2 條 / 袋', price: '90', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 6,
      category: 'farming',
      title: '台灣四季農曆與農作物對照：什麼時候吃什麼最對？',
      image: 'image/S__20611108.png',
      tags: [
        { label: '農業知識', to: '/tag/farming' },
        { label: '節氣飲食', to: '/tag/seasonal' }
      ],
      content: {
        intro: '台灣擁有得天獨厚的亞熱帶氣候，讓這座小島四季都有豐富的農產品。「順時節吃」不只是傳統智慧，更是最天然的飲食哲學——當令食物不僅風味最佳，價格通常也最實惠。',
        paragraphs: [
          {
            question: '台灣春季（3～5月）有哪些當令農作？',
            answer: '春天是台灣草莓、枇杷的盛產季節，也是茭白筍、蘆筍大量上市的時節。高山地區的梨子（水梨）開始進入生長期，南部的芒果也開始掛果，預計夏季採收。此時葉菜類品質最佳，甜椒、青花菜正當季。'
          },
          {
            question: '秋冬農產有哪些值得關注？',
            answer: '秋季（9～11月）是柚子、釋迦、文旦的產季，也是高山蔬菜（高麗菜、白蘿蔔）開始下山的時節。冬季（12～2月）是草莓、茂谷柑、椪柑的旺季，也是台灣高山鳳梨（鳳梨）品質最穩定的時期。'
          },
          {
            question: '為什麼「當季當地」的食物比較好？',
            answer: '當季食物在最適宜的氣候下自然生長，不需要額外加溫或人工催熟，營養密度更高、農藥使用量相對較低。當地食物減少運輸過程中的損耗和碳排放，也支持在地農業生態，一舉多得。'
          }
        ],
        relatedProducts: {
          title: '當令農產品推薦：',
          keyword: '當季'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '大湖草莓', sellerName: '大湖農場', unit: '600g / 盒', price: '320', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '關廟鳳梨', sellerName: '關廟農民', unit: '1 顆 / 個', price: '180', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '梨山高麗菜', sellerName: '梨山農場', unit: '1 顆 / 個', price: '130', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 7,
      category: 'farming',
      title: '友善農法 vs 有機農業：傻傻分不清楚？一次看懂差異',
      image: 'image/S__20611108.png',
      tags: [
        { label: '農業知識', to: '/tag/farming' },
        { label: '友善農法', to: '/tag/eco-farming' }
      ],
      content: {
        intro: '近年「友善農法」成為許多農夫和消費者熟悉的名詞，但它與「有機農業」之間的差異，卻讓人一頭霧水。兩者都是對環境友善的農作方式，但在認證制度和操作規範上有著根本不同。',
        paragraphs: [
          {
            question: '有機農業有什麼特點？',
            answer: '有機農業需要通過政府認可的第三方機構認證，農地必須經過至少三年轉型期，完全不使用化學農藥、化學肥料和基改種子。農產品可以貼上官方有機標章，消費者有法規保障。'
          },
          {
            question: '友善農法與有機農業有何不同？',
            answer: '友善農法（或稱「友善環境耕作」）目前沒有統一的國家認證標準，農夫依照自己的理念操作，可能包含：減少農藥或使用低毒性農藥、保留田邊雜草作為生態緩衝帶、保護天敵昆蟲等。精神上接近有機，但有更大的彈性空間。'
          },
          {
            question: '消費者怎麼選擇？',
            answer: '若重視有法規保障的認證，選擇有機標章產品最可靠。若願意信任農夫、支持小農精神，可以直接向農夫了解他們的種植方式，許多友善農法農夫雖然沒有認證，但種植理念相當環保永續。'
          }
        ],
        relatedProducts: {
          title: '支持友善農法農產品：',
          keyword: '友善'
        }
      },
      relatedCardItems: [
        { status: 'New', productTitle: '友善耕作米', sellerName: '池上米農', unit: '2kg / 包', price: '280', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '低農藥蔬菜箱', sellerName: '南投青農聯盟', unit: '混搭 6 種 / 箱', price: '450', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '無毒地瓜葉', sellerName: '嘉義農場', unit: '300g / 把', price: '35', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 8,
      category: 'farming',
      title: '土壤是農業的靈魂：什麼是健康的土壤？農夫怎麼養地？',
      image: 'image/S__20611108.png',
      tags: [
        { label: '農業知識', to: '/tag/farming' },
        { label: '土壤', to: '/tag/soil' }
      ],
      content: {
        intro: '一塊好土，能孕育出健康、美味的農作物；一塊被過度耗損的土地，則讓農夫年年投入卻收穫遞減。「養地」是農業最重要也最常被忽視的一環，了解土壤的奧秘，讓我們更懂得珍惜食物背後的心血。',
        paragraphs: [
          {
            question: '什麼樣的土壤是「好土」？',
            answer: '健康的農業土壤富含有機質，具有良好的透水性和保水性（土壤顆粒間有適當孔隙），pH 值接近中性（6.0～7.0 最適合多數蔬果），含有豐富多樣的土壤微生物、真菌和小型土壤動物。挖開土壤若見蚯蚓，是土壤健康的好指標。'
          },
          {
            question: '農夫如何養地？',
            answer: '常見的養地方式包括：施用有機堆肥補充有機質、種植綠肥作物（如油菜花、油菊）翻耕後增加氮素、輪作避免單一作物耗竭特定養分、減少過度翻耕以保護土壤結構，以及保留農田周邊植被緩衝帶。'
          },
          {
            question: '長期使用化肥對土壤有什麼影響？',
            answer: '長期大量使用化學肥料雖然短期能提高產量，但會導致土壤酸化、有機質流失、土壤微生物多樣性降低，最終讓土地越來越依賴外來肥料投入，形成惡性循環。這是全球農業面臨的重大挑戰之一。'
          }
        ],
        relatedProducts: {
          title: '好土種出的好蔬菜：',
          keyword: '有機蔬菜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '有機胡蘿蔔', sellerName: '苗栗有機農場', unit: '1kg / 袋', price: '130', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '地瓜', sellerName: '雲林農民', unit: '2kg / 袋', price: '100', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '牛蒡', sellerName: '台南牛蒡農場', unit: '500g / 包', price: '120', imageUrl: '/image/chinese-pear.png' }
      ]
    },

    // ── 飲食知識 ──────────────────────────────────────────────
    {
      id: 9,
      category: 'dietary_knowledge',
      title: '每天一顆蘋果？帶皮吃才是對的！蘋果的營養秘密全揭露',
      image: 'image/S__20611108.png',
      tags: [
        { label: '飲食知識', to: '/tag/dietary_knowledge' },
        { label: '蘋果', to: '/tag/apple' }
      ],
      content: {
        intro: '「An apple a day keeps the doctor away」這句英語諺語流傳了超過一百年，但現代營養學研究告訴我們，蘋果的正確吃法遠比我們想像的更有學問。最關鍵的秘密就在那層薄薄的果皮裡！',
        paragraphs: [
          {
            question: '蘋果皮有什麼特別的營養？',
            answer: '蘋果皮含有大量多酚類化合物（特別是槲皮素和兒茶素），其抗氧化能力是果肉的 2～4 倍。皮中的果膠纖維含量也更高，有助於促進腸道蠕動、穩定血糖。研究顯示，去皮蘋果的護心效果明顯低於帶皮食用。'
          },
          {
            question: '帶皮吃蘋果安全嗎？農藥殘留怎麼辦？',
            answer: '市售蘋果確實可能有農藥殘留，尤其是進口蘋果。建議用軟毛刷在流動水下輕輕刷洗表皮，或以 1 大匙小蘇打粉加水浸泡 15 分鐘後沖洗，可有效去除大部分農藥殘留。選購有機或低農藥認證蘋果更安心。'
          },
          {
            question: '蘋果什麼時候吃最好？',
            answer: '早餐前或飯後 1 小時是吃蘋果的好時機。早晨空腹吃能讓果膠和有機酸充分發揮排毒和促進腸胃蠕動的效果；飯後吃則有助於穩定血糖波動。避免睡前吃，因為果糖在晚上代謝較慢，對血糖管理不利。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買蘋果：',
          keyword: '蘋果'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '富士蘋果', sellerName: '梨山果農', unit: '8 顆 / 盒', price: '480', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '蜜蘋果', sellerName: '台中農夫市集', unit: '6 顆 / 袋', price: '380', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '翠玉蘋果', sellerName: '福壽山農場', unit: '10 顆 / 箱', price: '550', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 10,
      category: 'dietary_knowledge',
      title: '地瓜是減肥好幫手？一次破解地瓜的 5 個飲食迷思',
      image: 'image/S__20611108.png',
      tags: [
        { label: '飲食知識', to: '/tag/dietary_knowledge' },
        { label: '地瓜', to: '/tag/sweet-potato' }
      ],
      content: {
        intro: '地瓜在台灣是超高人氣的健康食物，但關於地瓜的飲食資訊也充斥著許多誤解。「吃地瓜減肥」這句話是真的嗎？地瓜飯真的比白飯健康嗎？讓我們用科學角度來一一破解！',
        paragraphs: [
          {
            question: '地瓜真的比白飯健康嗎？',
            answer: '地瓜的升糖指數（GI值）比白飯低，且含有更多膳食纖維、維生素A（來自β-胡蘿蔔素）和維生素C。但兩者熱量相近（每 100g 約 86～115 大卡），所以「吃地瓜不會胖」的說法並不完全正確，仍需控制份量。'
          },
          {
            question: '冷掉的地瓜為什麼比剛烤好的更甜？',
            answer: '地瓜烤熟冷卻後，部分澱粉會轉化為「抗性澱粉」，這種澱粉不容易被消化，升糖效果較低，熱量吸收也較少。同時，地瓜中的麥芽糖酶在適溫（約 60～70°C）下最活躍，使澱粉轉化為麥芽糖，所以不要太燙著吃！'
          },
          {
            question: '地瓜葉也很營養嗎？',
            answer: '地瓜葉是台灣的寶貝食材，含有豐富的鐵質、鈣質、維生素K和多酚類抗氧化物，有研究指出其抗氧化能力甚至高於許多知名蔬菜。地瓜葉熱量極低，是飲食控制族群的理想蔬菜選擇。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買地瓜：',
          keyword: '地瓜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '台農 57 號地瓜', sellerName: '雲林地瓜農', unit: '2kg / 袋', price: '120', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '紫心地瓜', sellerName: '花蓮農場', unit: '1kg / 袋', price: '160', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '地瓜葉', sellerName: '彰化農友', unit: '300g / 把', price: '30', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 11,
      category: 'dietary_knowledge',
      title: '攝取足夠鐵質不一定靠肉！植物性鐵質吸收的關鍵技巧',
      image: 'image/S__20611108.png',
      tags: [
        { label: '飲食知識', to: '/tag/dietary_knowledge' },
        { label: '鐵質', to: '/tag/iron' }
      ],
      content: {
        intro: '鐵質是造血不可或缺的礦物質，但很多人誤以為只有吃紅肉才能補鐵。事實上，菠菜、豆腐、黑芝麻等植物性食物也含有豐富的鐵質，只要搭配對的食物，吸收效率一點都不輸給肉類！',
        paragraphs: [
          {
            question: '植物性鐵質（非血基質鐵）吸收率低的原因是什麼？',
            answer: '植物中的鐵為非血基質鐵（Non-heme iron），吸收率約 2～20%，遠低於動物性血基質鐵的 15～35%。原因在於植物中的植酸（Phytic acid）和草酸會與鐵形成不溶性化合物，阻礙腸道吸收。'
          },
          {
            question: '哪些食物組合可以提高植物性鐵質吸收？',
            answer: '維生素C是植物性鐵質吸收的最佳助手！吃菠菜沙拉時加入半顆檸檬汁，或吃豆腐時搭配一顆橘子，都能讓鐵的吸收率提升 2～3 倍。同時避免在含鐵食物旁搭配茶或咖啡，因為其中的單寧酸會抑制鐵的吸收。'
          },
          {
            question: '台灣富含植物性鐵質的食材有哪些？',
            answer: '紅莧菜每 100g 含鐵約 3～5mg，是所有蔬菜中鐵質最高的；黑芝麻含鐵也相當豐富；紅豆、黑豆、豆腐等豆製品也是不錯的鐵質來源。每天變化這些食材，就能輕鬆達到鐵質需求量。'
          }
        ],
        relatedProducts: {
          title: '富含鐵質的蔬菜推薦：',
          keyword: '菠菜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '紅莧菜', sellerName: '嘉義農場', unit: '200g / 把', price: '35', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '有機菠菜', sellerName: '坪林農場', unit: '300g / 包', price: '65', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '黑芝麻', sellerName: '台南農產', unit: '200g / 包', price: '90', imageUrl: '/image/chinese-pear.png' }
      ]
    },

    // ── 食譜 ──────────────────────────────────────────────────
    {
      id: 12,
      category: 'recipes',
      title: '10 分鐘完成！清甜高麗菜炒飯，讓孩子多吃兩碗飯',
      image: 'image/S__20611108.png',
      tags: [
        { label: '食譜', to: '/tag/recipes' },
        { label: '高麗菜', to: '/tag/cabbage' }
      ],
      content: {
        intro: '高麗菜是台灣家庭廚房的常備蔬菜，清甜多汁，搭配隔夜飯炒出的炒飯簡單美味，是忙碌日子裡最快速的一道飯菜。只需要一個鍋子和 10 分鐘，就能端出一鍋香氣四溢的炒飯！',
        paragraphs: [
          {
            question: '材料（2人份）',
            answer: '白飯 2 碗（建議使用隔夜飯，較不黏鍋）、高麗菜葉 4～5 片、雞蛋 2 顆、大蒜 2 瓣（切末）、鹽少許、白胡椒粉少許、醬油 1 小匙、食用油 2 大匙。'
          },
          {
            question: '做法步驟',
            answer: '①熱鍋後倒入油，先爆香蒜末至金黃香酥。②加入打散的蛋液，炒至半熟蛋花狀後先盛起備用。③再下高麗菜大火翻炒至菜葉邊緣略呈透明，加少許鹽調味。④倒入白飯，用鍋鏟將米飯壓散，大火翻炒均勻。⑤將蛋花回鍋，淋上醬油，撒上白胡椒粉，翻炒均勻後起鍋。'
          },
          {
            question: '美味小秘訣',
            answer: '炒飯時火力一定要夠大，才能讓米飯粒粒分明、帶有鑊氣。高麗菜不要過度拌炒，保留些許爽脆口感最好吃。可以加入少許鮮蝦或火腿丁增加蛋白質，讓這道簡單炒飯更豐盛。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買高麗菜：',
          keyword: '高麗菜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '梨山高麗菜', sellerName: '梨山農場', unit: '1 顆 / 個', price: '130', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '有機高麗菜', sellerName: '苗栗農友', unit: '1 顆 / 個', price: '160', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '紫高麗菜', sellerName: '台中農場', unit: '1 顆 / 個', price: '140', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 13,
      category: 'recipes',
      title: '日式南瓜燉煮：用電鍋就能做出軟糯香甜的下飯良伴',
      image: 'image/S__20611108.png',
      tags: [
        { label: '食譜', to: '/tag/recipes' },
        { label: '南瓜', to: '/tag/pumpkin' }
      ],
      content: {
        intro: '日式燉南瓜（かぼちゃの煮物）是一道風靡全球的日本家庭料理，甜鹹平衡的醬汁將南瓜的自然甜味完美地提引出來。這道食譜不需要任何廚藝技巧，用家裡的電鍋就能輕鬆完成！',
        paragraphs: [
          {
            question: '材料（3～4人份）',
            answer: '南瓜 1/4 顆（約 400g）、日式醬油 2 大匙、味醂 2 大匙、砂糖 1 大匙、清酒 1 大匙（可省略）、水 100ml、昆布或柴魚片少許（可省略，增加鮮味）。'
          },
          {
            question: '做法步驟',
            answer: '①南瓜去籽，切成約 3cm 大小的塊狀，皮可保留。②將醬油、味醂、砂糖、清酒和水混合成醬汁。③南瓜放入電鍋內鍋，淋上醬汁，外鍋加 1 杯水。④蓋上鍋蓋，等電鍋跳起後燜 10 分鐘，讓南瓜繼續吸收醬汁。⑤開鍋確認南瓜熟透（竹籤可輕鬆插入），即可盛盤。'
          },
          {
            question: '為什麼南瓜要帶皮烹飪？',
            answer: '南瓜皮含有豐富的β-胡蘿蔔素和纖維質，帶皮烹飪不僅更營養，也能讓南瓜在燉煮時保持形狀完整，不容易散開。日式料理中通常保留南瓜皮，綠皮與橙黃果肉的色彩對比也讓料理更加美觀。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買南瓜：',
          keyword: '南瓜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '栗子南瓜', sellerName: '台南農友', unit: '1 顆 / 個', price: '120', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '金瓜（南瓜）', sellerName: '屏東農場', unit: '2kg / 個', price: '90', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '有機南瓜', sellerName: '花蓮有機農場', unit: '1 顆 / 個', price: '180', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 14,
      category: 'recipes',
      title: '鳳梨炒木耳：酸甜清脆的台式家常菜，讓晚餐充滿南洋風情',
      image: 'image/S__20611108.png',
      tags: [
        { label: '食譜', to: '/tag/recipes' },
        { label: '鳳梨', to: '/tag/pineapple' }
      ],
      content: {
        intro: '鳳梨不只適合做甜點，拿來炒菜才是台灣農村的老玩法！鳳梨的天然酸味與木耳的脆嫩相互輝映，清爽開胃，是夏天最消暑的下飯料理。這道菜費時不超過 15 分鐘，零失敗！',
        paragraphs: [
          {
            question: '材料（2～3人份）',
            answer: '新鮮鳳梨 1/4 顆（切成小塊）、黑木耳 100g（泡發後）、薑片 3～4 片、辣椒 1 根（可省略）、醬油 1 大匙、砂糖 1 茶匙、鹽少許、食用油 2 大匙、太白粉水少許（勾芡用，可省略）。'
          },
          {
            question: '做法步驟',
            answer: '①黑木耳泡發後切成適口大小，鳳梨切小塊備用。②熱油鍋，爆香薑片和辣椒。③先下木耳大火翻炒 1 分鐘，加醬油和少許糖調味。④下鳳梨塊，大火快炒 1～2 分鐘，讓鳳梨的酸甜融入木耳中。⑤試味道，需要再加鹽調整鹹淡，起鍋前可輕微勾薄芡增加光澤感。'
          },
          {
            question: '挑選鳳梨的技巧是什麼？',
            answer: '挑選底部圓潤、葉片翠綠且不易拔起（代表熟度夠）的鳳梨。輕敲鳳梨底部，聲音沉悶扎實代表果肉飽滿。聞底部若有明顯甜香，代表熟度適中。避免挑選外皮已出現軟爛黑斑或滲液的鳳梨。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買鳳梨：',
          keyword: '鳳梨'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '關廟鳳梨', sellerName: '台南關廟農場', unit: '1 顆 / 個', price: '180', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '牛奶鳳梨', sellerName: '嘉義農友', unit: '1 顆 / 個', price: '280', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '金鑽鳳梨', sellerName: '屏東果農', unit: '1 顆 / 個', price: '200', imageUrl: '/image/chinese-pear.png' }
      ]
    },
    {
      id: 15,
      category: 'recipes',
      title: '西瓜涼拌沙拉：夏日派對必備，5 分鐘端上桌的清涼甜品',
      image: 'image/S__20611108.png',
      tags: [
        { label: '食譜', to: '/tag/recipes' },
        { label: '西瓜', to: '/tag/watermelon' }
      ],
      content: {
        intro: '西瓜涼拌沙拉是近年風靡社群媒體的夏日甜品，鮮豔的紅綠配色超級上鏡，又清涼消暑。這道食譜靈感來自地中海料理，西瓜搭配薄荷與少許鹽，把西瓜的甜味完全釋放出來！',
        paragraphs: [
          {
            question: '材料（4人份）',
            answer: '去皮西瓜 600g（切成 3cm 方塊）、新鮮薄荷葉 一小把（粗略切碎）、檸檬汁 1 大匙、鹽 1/4 茶匙、橄欖油 1 大匙（可省略）、黑胡椒少許。選配：菲達起司（Feta cheese）50g 壓碎撒上，增加鹹香層次。'
          },
          {
            question: '做法步驟',
            answer: '①西瓜去皮去籽，切成均勻大小的方塊，排盤。②薄荷葉洗淨，取葉片切碎（或保留整葉裝飾）。③在西瓜上撒鹽，靜置 2 分鐘讓鹽分稍微滲入，幫助提味。④淋上檸檬汁和橄欖油，撒上薄荷葉和黑胡椒。⑤若加菲達起司，最後撒上即可。冷藏 15 分鐘後食用風味更佳。'
          },
          {
            question: '為什麼加鹽會讓西瓜更甜？',
            answer: '這是一個有趣的味覺科學現象！鹽分能抑制我們感受苦味的味覺受體，讓舌頭對甜味更敏感，因此加了少許鹽的西瓜，嚐起來反而比純吃更甜。這個技巧同樣適用於哈密瓜、芒果等甜度高的水果。'
          }
        ],
        relatedProducts: {
          title: '來這裡購買西瓜：',
          keyword: '西瓜'
        }
      },
      relatedCardItems: [
        { status: 'Hot', productTitle: '大玉西瓜', sellerName: '花蓮富里農場', unit: '半顆 / 個', price: '280', imageUrl: '/image/chinese-pear.png' },
        { status: 'New', productTitle: '無籽小玉西瓜', sellerName: '台南農友', unit: '1 顆 / 個', price: '220', imageUrl: '/image/chinese-pear.png' },
        { status: 'Hot', productTitle: '黃肉西瓜', sellerName: '屏東果園', unit: '1 顆 / 個', price: '300', imageUrl: '/image/chinese-pear.png' }
      ]
    }
  ]

  // 依分類和搜尋關鍵字篩選
  const filteredList = computed(() => {
    return knowledgeList.filter(item => {
      const matchCategory = activeCategory.value === 'all' || item.category === activeCategory.value
      const keyword = searchKeyword.value.trim().toLowerCase()
      const matchSearch = !keyword || item.title.toLowerCase().includes(keyword)
      return matchCategory && matchSearch
    })
  })

  // 依 ID 取得單篇文章
  const getById = (id: number | string) => knowledgeList.find(item => item.id === Number(id))

  const setCategory = (value: string) => { activeCategory.value = value }
  const setSearch = (keyword: string) => { searchKeyword.value = keyword }

  return {
    knowledgeList,
    filteredList,
    activeCategory,
    searchKeyword,
    getById,
    setCategory,
    setSearch
  }
})
