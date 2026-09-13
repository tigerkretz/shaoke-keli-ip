export type CatId = 'shaoye' | 'keli'

export interface Character {
  id: CatId
  name: string
  nameEn: string
  motif: string
  tag: string
  tagEn: string
  quote: string
  appearance: string[]
  personality: string[]
  likes: string[]
  dislikes: string[]
  portrait: string
  sheet: string
  poses: { src: string; label: string }[]
}

export const characters: Record<CatId, Character> = {
  shaoye: {
    id: 'shaoye',
    name: '少爷',
    nameEn: 'Shào Yé',
    motif: '皇冠',
    tag: '高冷但是黏人',
    tagEn: 'Cool, secretly clingy',
    quote: '别靠太近……好吧，再靠近一点也可以。',
    appearance: [
      '长毛，白底棕灰斑',
      '胸与脸雪白，头背虎斑',
      '蓬松深色尾尖',
      '绿金色眼睛，粉鼻',
    ],
    personality: ['表面上高冷傲娇', '其实超级黏人', '不承认自己想被靠近', '可丽在身边才会安心'],
    likes: ['可丽、晒太阳、窝在你身边'],
    dislikes: ['太吵的环境、陌生的人'],
    portrait: '/shaoke-keli-ip/assets/crops/shaoye-portrait.png',
    sheet: '/shaoke-keli-ip/assets/shaoye-sheet.png',
    poses: [
      { src: '/shaoke-keli-ip/assets/crops/pose-shaoye-stand.jpg', label: '优雅站立' },
      { src: '/shaoke-keli-ip/assets/crops/pose-shaoye-loaf.jpg', label: '趴下发呆' },
      { src: '/shaoke-keli-ip/assets/crops/pose-shaoye-sleep.jpg', label: '卷着尾巴睡觉' },
    ],
  },
  keli: {
    id: 'keli',
    name: '可丽',
    nameEn: 'Kě Lì',
    motif: '小花',
    tag: '胆小但是非常黏少爷',
    tagEn: 'Timid, Super clingy',
    quote: '只要有少爷在，我就会很勇敢！',
    appearance: [
      '金渐层英短，体态圆润',
      '奶油胸口与口鼻',
      '橘色短毛虎斑',
      '大绿眼，粉鼻，尾尖深色',
    ],
    personality: ['软萌胆小', '离开少爷就害怕', '黏人程度满分', '把少爷当成全世界的挡风处'],
    likes: ['少爷、黏贴、温暖的角落'],
    dislikes: ['突然的声响、陌生环境'],
    portrait: '/shaoke-keli-ip/assets/crops/keli-portrait.png',
    sheet: '/shaoke-keli-ip/assets/keli-sheet.png',
    poses: [
      { src: '/shaoke-keli-ip/assets/crops/pose-keli-loaf.jpg', label: '跟着少爷' },
      { src: '/shaoke-keli-ip/assets/crops/pose-keli-sit.jpg', label: '求黏贴' },
      { src: '/shaoke-keli-ip/assets/crops/pose-keli-sleep.jpg', label: '和少爷一起睡' },
    ],
  },
}

export const navItems = [
  { href: '#top', label: '首页', en: 'Home' },
  { href: '#characters', label: '角色', en: 'Cast' },
  { href: '#relationship', label: '关系', en: 'Bond' },
  { href: '#expressions', label: '表情', en: 'Faces' },
  { href: '#stories', label: '日常', en: 'Days' },
  { href: '#merch', label: '周边', en: 'Goods' },
] as const

export const relationships = [
  {
    id: 'cuddle',
    kicker: 'Better together',
    title: '和你在一起，就是最舒服的事',
    preview: '少爷负责当枕头。可丽负责把脸埋进去。',
    body: '不需要说话。贴着，世界就会变小、变暖、变刚刚好。',
    image: '/shaoke-keli-ip/assets/crops/rel-cuddle.jpg',
  },
  {
    id: 'protect',
    kicker: "You're safe with me",
    title: '别怕，我在你身后',
    preview: '少爷站在风前面。可丽把爪子搭在他身上。',
    body: '陌生声音先传到少爷耳朵里。可丽躲一会儿，再慢慢把鼻子伸出来。',
    image: '/shaoke-keli-ip/assets/crops/rel-protect.jpg',
  },
  {
    id: 'sleep',
    kicker: 'Same dream',
    title: '一起做更温暖的梦吧',
    preview: '靠近一点，噩梦就会比较短。',
    body: '同一条毯子，两种睡相。少爷装睡，可丽真的睡着。',
    image: '/shaoke-keli-ip/assets/crops/rel-sleep.jpg',
  },
  {
    id: 'sunset',
    kicker: 'Good view',
    title: '看着同一片天空，就觉得一切都很好',
    preview: '不必肩并肩说话。一起看，就已经是陪伴。',
    body: '一天结束的时候，他们选同一扇窗。少了谁，晚霞都会少一块温度。',
    image: '/shaoke-keli-ip/assets/crops/rel-sunset.jpg',
  },
] as const

export const expressions = [
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-aloof.jpg', who: '少爷', name: '高冷脸', en: 'Aloof' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-wonder.jpg', who: '少爷', name: '疑惑', en: 'Wonder' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-blank.jpg', who: '少爷', name: '无奈', en: 'Blank' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-happy.jpg', who: '少爷', name: '其实很开心', en: 'Secretly glad' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-glance.jpg', who: '少爷', name: '看着你', en: 'Glance' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-curious.jpg', who: '可丽', name: '好奇', en: 'Curious' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-shy.jpg', who: '可丽', name: '有点害怕', en: 'Shy' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-joy.jpg', who: '可丽', name: '开心', en: 'Joy' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-wink.jpg', who: '可丽', name: '撒娇', en: 'Wink' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-soft.jpg', who: '可丽', name: '舒服', en: 'Soft' },
] as const

export const stories = [
  {
    src: '/shaoke-keli-ip/assets/crops/story-aloof.png',
    title: '少爷：高冷脸',
    en: 'Cool face',
    line: '先装作不在意。尾巴已经出卖了。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-shy.png',
    title: '可丽：有点害怕',
    en: 'A little scared',
    line: '世界很大。少爷在的时候，就刚好。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-loaf.png',
    title: '一起发呆',
    en: 'Loaf together',
    line: '什么也不做，也要并排。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-glance.png',
    title: '少爷：偷偷宠着你',
    en: 'Secretly watching',
    line: '回一下头就好。被抓到的话，就说是风。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-happy.png',
    title: '可丽：超满足',
    en: 'Full heart',
    line: '贴在一起的时候，胆子会变大。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-sleep.png',
    title: '一起睡觉',
    en: 'Sleep together',
    line: '靠近一点，噩梦就会比较短。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-hide.png',
    title: '躲在少爷身后',
    en: 'Behind him',
    line: '纸箱只是借口。真正的避风港是旁边那团毛。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-bed.png',
    title: '一起晒太阳',
    en: 'Sunbed',
    line: '同一只窝，两种睡相。',
  },
] as const

export const merchBoard = {
  src: '/shaoke-keli-ip/assets/merch-board.png',
  name: '周边一览',
  en: 'Merch board',
  note: '抱枕、立牌、马克杯、帆布袋与小物。',
} as const

export const merch = [
  {
    src: '/shaoke-keli-ip/assets/crops/merch-pillow.jpg',
    name: '抱枕',
    en: 'Pillow',
    note: '贴在一起的夏天和冬天。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-standee.jpg',
    name: '亚克力立牌',
    en: 'Acrylic stand',
    note: '一对才算完整。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-pins.jpg',
    name: '贴纸与徽章',
    en: 'Pins & stickers',
    note: '小小的周边，装下大大的喜欢。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-mug.jpg',
    name: '马克杯',
    en: 'Mug',
    note: '一杯温暖，装下和你在一起的每一天。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-tote.jpg',
    name: '帆布袋',
    en: 'Tote bag',
    note: '一起看世界。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-goods.jpg',
    name: '钥匙扣与胶带',
    en: 'Keychain & washi',
    note: '把喜欢带进生活的每个角落。',
  },
] as const

export const officialSheets = [
  {
    src: '/shaoke-keli-ip/assets/duo-hero.png',
    thumb: '/shaoke-keli-ip/assets/crops/duo-pair.png',
    name: '双人主视觉',
    en: 'Duo poster',
  },
  {
    src: '/shaoke-keli-ip/assets/shaoye-sheet.png',
    thumb: '/shaoke-keli-ip/assets/crops/shaoye-portrait.png',
    name: '少爷设定表',
    en: 'Shào Yé sheet',
  },
  {
    src: '/shaoke-keli-ip/assets/keli-sheet.png',
    thumb: '/shaoke-keli-ip/assets/crops/keli-portrait.png',
    name: '可丽设定表',
    en: 'Kě Lì sheet',
  },
] as const
