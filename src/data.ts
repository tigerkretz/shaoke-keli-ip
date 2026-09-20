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
    portrait: '/shaoke-keli-ip/assets/social/cutout-shaoye-3x4.webp',
    sheet: '/shaoke-keli-ip/assets/shaoye-sheet.webp',
    poses: [
      { src: '/shaoke-keli-ip/assets/crops/pose-shaoye-stand.webp', label: '优雅站立' },
      { src: '/shaoke-keli-ip/assets/crops/pose-shaoye-loaf.webp', label: '趴下发呆' },
      { src: '/shaoke-keli-ip/assets/crops/pose-shaoye-sleep.webp', label: '卷着尾巴睡觉' },
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
      '金渐层短毛，体型娇小',
      '奶油胸口与口鼻',
      '暖金被毛，深色尾尖',
      '大绿眼，粉鼻',
    ],
    personality: ['软萌胆小', '离开少爷就害怕', '黏人程度满分', '把少爷当成全世界的挡风处'],
    likes: ['少爷、黏贴、温暖的角落'],
    dislikes: ['突然的声响、陌生环境'],
    portrait: '/shaoke-keli-ip/assets/social/cutout-keli-3x4.webp',
    sheet: '/shaoke-keli-ip/assets/keli-sheet.webp',
    poses: [
      { src: '/shaoke-keli-ip/assets/crops/pose-keli-loaf.webp', label: '跟着少爷' },
      { src: '/shaoke-keli-ip/assets/crops/pose-keli-sit.webp', label: '求黏贴' },
      { src: '/shaoke-keli-ip/assets/crops/pose-keli-sleep.webp', label: '和少爷一起睡' },
    ],
  },
}

export const navItems = [
  { href: '#top', label: '首页', en: 'Home' },
  { href: '#characters', label: '角色', en: 'Cast' },
  { href: '#relationship', label: '关系', en: 'Bond' },
  { href: '#expressions', label: '表情', en: 'Faces' },
  { href: '#stories', label: '日常', en: 'Days' },
  { href: '#downloads', label: '下载', en: 'Free' },
  { href: '#merch', label: '周边', en: 'Goods' },
] as const

export const relationships = [
  {
    id: 'cuddle',
    kicker: 'Better together',
    title: '和你在一起，就是最舒服的事',
    preview: '少爷负责当枕头。可丽负责把脸埋进去。',
    body: '不需要说话。贴着，世界就会变小、变暖、变刚刚好。',
    image: '/shaoke-keli-ip/assets/crops/rel-cuddle.webp',
  },
  {
    id: 'protect',
    kicker: "You're safe with me",
    title: '别怕，我在你身后',
    preview: '少爷站在风前面。可丽把爪子搭在他身上。',
    body: '陌生声音先传到少爷耳朵里。可丽躲一会儿，再慢慢把鼻子伸出来。',
    image: '/shaoke-keli-ip/assets/crops/rel-protect.webp',
  },
  {
    id: 'sleep',
    kicker: 'Same dream',
    title: '一起做更温暖的梦吧',
    preview: '靠近一点，噩梦就会比较短。',
    body: '同一条毯子，两种睡相。少爷装睡，可丽真的睡着。',
    image: '/shaoke-keli-ip/assets/crops/rel-sleep.webp',
  },
  {
    id: 'sunset',
    kicker: 'Good view',
    title: '看着同一片天空，就觉得一切都很好',
    preview: '不必肩并肩说话。一起看，就已经是陪伴。',
    body: '一天结束的时候，他们选同一扇窗。少了谁，晚霞都会少一块温度。',
    image: '/shaoke-keli-ip/assets/crops/rel-sunset.webp',
  },
] as const

export const expressions = [
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-aloof.webp', who: '少爷', name: '高冷脸', en: 'Aloof' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-wonder.webp', who: '少爷', name: '疑惑', en: 'Wonder' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-blank.webp', who: '少爷', name: '无奈', en: 'Blank' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-happy.webp', who: '少爷', name: '其实很开心', en: 'Secretly glad' },
  { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-glance.webp', who: '少爷', name: '看着你', en: 'Glance' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-curious.webp', who: '可丽', name: '好奇', en: 'Curious' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-shy.webp', who: '可丽', name: '有点害怕', en: 'Shy' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-joy.webp', who: '可丽', name: '开心', en: 'Joy' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-wink.webp', who: '可丽', name: '撒娇', en: 'Wink' },
  { src: '/shaoke-keli-ip/assets/crops/expr-keli-soft.webp', who: '可丽', name: '舒服', en: 'Soft' },
] as const

export const stories = [
  {
    src: '/shaoke-keli-ip/assets/crops/story-aloof.webp',
    title: '少爷：高冷脸',
    en: 'Cool face',
    line: '先装作不在意。尾巴已经出卖了。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-shy.webp',
    title: '可丽：有点害怕',
    en: 'A little scared',
    line: '世界很大。少爷在的时候，就刚好。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-loaf.webp',
    title: '一起发呆',
    en: 'Loaf together',
    line: '什么也不做，也要并排。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-glance.webp',
    title: '少爷：偷偷宠着你',
    en: 'Secretly watching',
    line: '回一下头就好。被抓到的话，就说是风。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-happy.webp',
    title: '可丽：超满足',
    en: 'Full heart',
    line: '贴在一起的时候，胆子会变大。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-sleep.webp',
    title: '一起睡觉',
    en: 'Sleep together',
    line: '靠近一点，噩梦就会比较短。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-hide.webp',
    title: '躲在少爷身后',
    en: 'Behind him',
    line: '纸箱只是借口。真正的避风港是旁边那团毛。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/story-bed.webp',
    title: '一起晒太阳',
    en: 'Sunbed',
    line: '同一只窝，两种睡相。',
  },
] as const

export const merchBoard = {
  src: '/shaoke-keli-ip/assets/merch-board.webp',
  name: '周边一览',
  en: 'Merch board',
  note: '抱枕、立牌、马克杯、帆布袋与小物。',
} as const

export const merch = [
  {
    src: '/shaoke-keli-ip/assets/crops/merch-pillow.webp',
    name: '抱枕',
    en: 'Pillow',
    note: '贴在一起的夏天和冬天。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-standee.webp',
    name: '亚克力立牌',
    en: 'Acrylic stand',
    note: '一对才算完整。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-pins.webp',
    name: '贴纸与徽章',
    en: 'Pins & stickers',
    note: '小小的周边，装下大大的喜欢。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-mug.webp',
    name: '马克杯',
    en: 'Mug',
    note: '一杯温暖，装下和你在一起的每一天。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-tote.webp',
    name: '帆布袋',
    en: 'Tote bag',
    note: '一起看世界。',
  },
  {
    src: '/shaoke-keli-ip/assets/crops/merch-goods.webp',
    name: '钥匙扣与胶带',
    en: 'Keychain & washi',
    note: '把喜欢带进生活的每个角落。',
  },
] as const

export const officialSheets = [
  {
    src: '/shaoke-keli-ip/assets/duo-hero.webp',
    thumb: '/shaoke-keli-ip/assets/crops/duo-pair.webp',
    name: '双人主视觉',
    en: 'Duo poster',
  },
  {
    src: '/shaoke-keli-ip/assets/shaoye-sheet.webp',
    thumb: '/shaoke-keli-ip/assets/social/cutout-shaoye-3x4.webp',
    name: '少爷设定表',
    en: 'Shào Yé sheet',
  },
  {
    src: '/shaoke-keli-ip/assets/keli-sheet.webp',
    thumb: '/shaoke-keli-ip/assets/social/cutout-keli-3x4.webp',
    name: '可丽设定表',
    en: 'Kě Lì sheet',
  },
] as const


/**
 * 免费素材下载区。
 * 预览走轻量 webp，下载走高清成品（表情包给 PNG，聊天软件兼容性最好）。
 * 手机壁纸统一 20:9（1080×2400），原生即该比例，无需裁切。
 */
export type DownloadItem = {
  src: string
  href: string
  file: string
  name: string
  who: string
  spec: string
  w: number
  h: number
}

const WP = '/shaoke-keli-ip/assets/wallpapers'
const STK = '/shaoke-keli-ip/assets/downloads/stickers'
const AVA = '/shaoke-keli-ip/assets/downloads/avatars'
const CUT = '/shaoke-keli-ip/assets/downloads/cutouts'

export const downloadTabs = [
  { id: 'wallpaper', label: '手机壁纸', en: 'Wallpapers', hint: '20:9 竖屏，1080 × 2400。锁屏、主屏都留了干净空白。' },
  { id: 'sticker', label: '表情包', en: 'Stickers', hint: '1024 × 1024 透明 PNG，可直接加进微信/QQ 表情。' },
  { id: 'avatar', label: '头像', en: 'Avatars', hint: '512 × 512 方图，社交账号直接用。' },
  { id: 'cutout', label: '立绘', en: 'Cutouts', hint: '透明底 PNG，做海报、贴纸、二次创作都方便。' },
] as const

export const downloads: Record<(typeof downloadTabs)[number]['id'], DownloadItem[]> = {
  wallpaper: [
    { src: `${WP}/wp-duo-sit.webp`, href: `${WP}/wp-duo-sit.webp`, file: '少爷和可丽-壁纸-并排坐.webp', name: '并排坐', who: '少爷 × 可丽', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-duo-sunset.webp`, href: `${WP}/wp-duo-sunset.webp`, file: '少爷和可丽-壁纸-看夕阳.webp', name: '看夕阳', who: '少爷 × 可丽', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-duo-sleep.webp`, href: `${WP}/wp-duo-sleep.webp`, file: '少爷和可丽-壁纸-相拥而眠.webp', name: '相拥而眠', who: '少爷 × 可丽', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-duo-cuddle.webp`, href: `${WP}/wp-duo-cuddle.webp`, file: '少爷和可丽-壁纸-贴贴.webp', name: '贴贴', who: '少爷 × 可丽', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-shaoye-sit.webp`, href: `${WP}/wp-shaoye-sit.webp`, file: '少爷-壁纸-端坐.webp', name: '端坐', who: '少爷', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-shaoye-aloof.webp`, href: `${WP}/wp-shaoye-aloof.webp`, file: '少爷-壁纸-高冷.webp', name: '高冷', who: '少爷', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-keli-sit.webp`, href: `${WP}/wp-keli-sit.webp`, file: '可丽-壁纸-乖巧坐.webp', name: '乖巧坐', who: '可丽', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
    { src: `${WP}/wp-keli-curl.webp`, href: `${WP}/wp-keli-curl.webp`, file: '可丽-壁纸-蜷睡.webp', name: '蜷睡', who: '可丽', spec: '1080 × 2400 · WebP', w: 1080, h: 2400 },
  ],
  sticker: [
    { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-aloof.webp', href: `${STK}/expr-shaoye-aloof.png`, file: '少爷-高冷脸.png', name: '高冷脸', who: '少爷', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-wonder.webp', href: `${STK}/expr-shaoye-wonder.png`, file: '少爷-疑惑.png', name: '疑惑', who: '少爷', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-blank.webp', href: `${STK}/expr-shaoye-blank.png`, file: '少爷-无奈.png', name: '无奈', who: '少爷', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-happy.webp', href: `${STK}/expr-shaoye-happy.png`, file: '少爷-其实很开心.png', name: '其实很开心', who: '少爷', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-shaoye-glance.webp', href: `${STK}/expr-shaoye-glance.png`, file: '少爷-看着你.png', name: '看着你', who: '少爷', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-keli-curious.webp', href: `${STK}/expr-keli-curious.png`, file: '可丽-好奇.png', name: '好奇', who: '可丽', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-keli-joy.webp', href: `${STK}/expr-keli-joy.png`, file: '可丽-开心.png', name: '开心', who: '可丽', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-keli-shy.webp', href: `${STK}/expr-keli-shy.png`, file: '可丽-害羞.png', name: '害羞', who: '可丽', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-keli-soft.webp', href: `${STK}/expr-keli-soft.png`, file: '可丽-舒服.png', name: '舒服', who: '可丽', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
    { src: '/shaoke-keli-ip/assets/crops/expr-keli-wink.webp', href: `${STK}/expr-keli-wink.png`, file: '可丽-眨眼.png', name: '眨眼', who: '可丽', spec: '1024 × 1024 · PNG', w: 1254, h: 1254 },
  ],
  avatar: [
    { src: `${AVA}/avatar-shaoye.png`, href: `${AVA}/avatar-shaoye.png`, file: '头像-少爷.png', name: '少爷', who: '正面', spec: '512 × 512 · PNG', w: 512, h: 512 },
    { src: `${AVA}/avatar-keli.png`, href: `${AVA}/avatar-keli.png`, file: '头像-可丽.png', name: '可丽', who: '正面', spec: '512 × 512 · PNG', w: 512, h: 512 },
    { src: `${AVA}/avatar-duo.png`, href: `${AVA}/avatar-duo.png`, file: '头像-双猫合影.png', name: '双猫合影', who: '少爷 × 可丽', spec: '512 × 512 · PNG', w: 512, h: 512 },
    { src: `${AVA}/avatar-shaoye-aloof.png`, href: `${AVA}/avatar-shaoye-aloof.png`, file: '头像-少爷高冷.png', name: '高冷脸', who: '少爷', spec: '512 × 512 · PNG', w: 512, h: 512 },
    { src: `${AVA}/avatar-shaoye-happy.png`, href: `${AVA}/avatar-shaoye-happy.png`, file: '头像-少爷偷笑.png', name: '其实很开心', who: '少爷', spec: '512 × 512 · PNG', w: 512, h: 512 },
    { src: `${AVA}/avatar-keli-joy.png`, href: `${AVA}/avatar-keli-joy.png`, file: '头像-可丽开心.png', name: '开心', who: '可丽', spec: '512 × 512 · PNG', w: 512, h: 512 },
    { src: `${AVA}/avatar-keli-wink.png`, href: `${AVA}/avatar-keli-wink.png`, file: '头像-可丽眨眼.png', name: '眨眼', who: '可丽', spec: '512 × 512 · PNG', w: 512, h: 512 },
  ],
  cutout: [
    { src: `${CUT}/cutout-shaoye-stand.png`, href: `${CUT}/cutout-shaoye-stand.png`, file: '立绘-少爷端坐.png', name: '少爷 · 端坐', who: '透明底 PNG', spec: '1000 × 1000 · PNG 透明底', w: 1200, h: 1200 },
    { src: `${CUT}/cutout-keli-sit.png`, href: `${CUT}/cutout-keli-sit.png`, file: '立绘-可丽乖巧坐.png', name: '可丽 · 乖巧坐', who: '透明底 PNG', spec: '1000 × 1000 · PNG 透明底', w: 1200, h: 1200 },
    { src: `${CUT}/cutout-shaoye-loaf.png`, href: `${CUT}/cutout-shaoye-loaf.png`, file: '立绘-少爷猫面包.png', name: '少爷 · 猫面包', who: '透明底 PNG', spec: '1000 × 1000 · PNG 透明底', w: 1200, h: 1200 },
    { src: `${CUT}/cutout-keli-curl.png`, href: `${CUT}/cutout-keli-curl.png`, file: '立绘-可丽蜷睡.png', name: '可丽 · 蜷睡', who: '透明底 PNG', spec: '1000 × 1000 · PNG 透明底', w: 1200, h: 1200 },
  ],
}
