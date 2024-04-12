export default {
  baseURL: "http://localhost:8080",
  imBaseURL: "http://localhost:81",
  webURL: "http://localhost",

  // baseURL: "https://poetize.cn/api",
  // imBaseURL: "https://poetize.cn/im",
  // webURL: "https://poetize.cn",

  hitokoto: "https://v1.hitokoto.cn",
  shehui: "https://api.oick.cn/yulu/api.php",
  tocbot: "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.min.js",
  jinrishici: "https://v1.jinrishici.com/all.json",
  random_image: "https://0w0-0v0.s3.ap-northeast-2.amazonaws.com/images/zsKgDs.jpg?",
  //前后端定义的密钥，AES使用16位
  cryptojs_key: "aoligeimeimaobin",
  qiniuUrl: "https://upload.qiniup.com",
  qiniuDownload: "$$$$七牛云下载地址，仿照【https://file.poetize.cn/】",

  friendWebName: "POETIZE",
  friendUrl: "https://poetize.cn",
  friendAvatar: "https://s1.ax1x.com/2022/11/10/z9E7X4.jpg",
  friendIntroduction: "这是一个 Vue2 Vue3 与 SpringBoot 结合的产物～",
  friendCover: "https://s1.ax1x.com/2022/11/10/z9VlHs.png",

  favoriteVideo: "$$$$自己找一个视频链接作为百宝箱的封面",

  loveWeiYan: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
  loveMessage: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
  albums: "https://s1.ax1x.com/2022/12/04/zsKh5V.jpg",
  loveLike: "https://cdn.cbd.int//hexo-butterfly-envelope/lib/violet.jpg",
  loveSortId: 1,
  loveLabelId: 1,

  friendBG: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
  friendLetterTop: "https://cdn.cbd.int/hexo-butterfly-envelope/lib/before.png",
  friendLetterBottom: "https://cdn.cbd.int/hexo-butterfly-envelope/lib/after.png",
  friendLetterBiLi: "https://cdn.cbd.int/hexo-butterfly-envelope/lib/line.png",
  friendLetterMiddle: "https://cdn.cbd.int//hexo-butterfly-envelope/lib/violet.jpg",

  before_color_list: ["#ff4b2b", "#EF794F", "#67C23A", "orange", "rgb(131, 123, 199)", "#23d5ab"],

  tree_hole_color: ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab", "rgb(131, 123, 199)", "#23d5ab"],

  before_color_1: "black",
  after_color_1: "linear-gradient(45deg, #f43f3b, #ec008c)",

  before_color_2: "rgb(131, 123, 199)",
  after_color_2: "linear-gradient(45deg, #f43f3b, #ec008c)",

  sortColor: ["linear-gradient(to right, #358bff, #15c6ff)",
    "linear-gradient(to right, #18e7ae, #1eebeb)",
    "linear-gradient(to right, #ff6655, #ffbf37)",
    "linear-gradient(120deg, rgba(255, 39, 232, 1) 0%, rgba(255, 128, 0, 1) 100%)",
    "linear-gradient(120deg, rgba(91, 39, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)"
  ],

  diaryCategories: {
    "life": { "name": "生活", "color": "#FF9500", "english": "life" },
    "study": { "name": "学习", "color": "#4CD964", "english": "study" },
    "event": { "name": "大事", "color": "#FF3B30", "english": "event" },
    "sport": { "name": "运动", "color": "#FFCC00", "english": "sport" },
    "todo": { "name": "待办", "color": "#24C5FF", "english": "todo" },
    "work": { "name": "工作", "color": "#007AFF", "english": "work" },
    "game": { "name": "游戏", "color": "#5AC8FA", "english": "game" },
    "film": { "name": "电影", "color": "#FF2D70", "english": "film" },
    "article": { "name": "文章", "color": "#CC73E1", "english": "article" },
    "bill": { "name": "账单", "color": "#8bc34a", "english": "bill" },
    "memo": { "name": "备忘", "color": "#BABABA", "english": "memo" },
    "play": { "name": "剧本", "color": "#00AAFF", "english": "play" },
    "sentiment": { "name": "情感", "color": "#00C975", "english": "sentiment" },
    "week": { "name": "周报", "color": "#5856D6", "english": "week" }
  },
  weather: {
    "sunny": { "id": 1, "name": "晴天", "english": "sunny" },
    "breezy": { "id": 2, "name": "微风", "english": "breezy" },
    "windy": { "id": 3, "name": "大风", "english": "windy" },
    "rainy": { "id": 4, "name": "雨天", "english": "rainy" },
    "snowy": { "id": 5, "name": "雪天", "english": "snowy" },
    "hail": { "id": 6, "name": "冰雹", "english": "hail" },
    "cloudy": { "id": 7, "name": "多云", "english": "cloudy" },
    "dull": { "id": 8, "name": "阴天", "english": "dull" },
    "misty": { "id": 9, "name": "雾天", "english": "misty" },
    "rainbow": { "id": 11, "name": "彩虹", "english": "rainbow" },
    "sandstorm": { "id": 12, "name": "沙尘暴", "english": "sandstorm" },
    "thunderstorm": { "id": 13, "name": "雷暴", "english": "thunderstorm" },
    "tornado": { "id": 14, "name": "龙卷风", "english": "tornado" },
  },

  pageColor: "#ee7752",
  commentPageColor: "#23d5ab",
  userId: 1,
  source: 0,

  emojiList: ['衰', '鄙视', '再见', '捂嘴', '摸鱼', '奋斗', '白眼', '可怜', '皱眉', '鼓掌', '烦恼', '吐舌', '挖鼻', '委屈', '滑稽', '啊这', '生气', '害羞', '晕', '好色', '流泪', '吐血', '微笑', '酷', '坏笑', '吓', '大兵', '哭笑', '困', '呲牙']
}
