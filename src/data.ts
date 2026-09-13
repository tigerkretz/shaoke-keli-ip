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
  poses: { src: string; label: string }[]
}

export const characters: Record<CatId, Character> = {
  shaoye: {
    id: 'shaoye',
    name: '少爷',
    nameEn: 'Shào Yé',
    motif: '皇冠',
    tag: '高冷但黏人',
    tagEn: 'Cool, secretly clingy',
    quote: '嗯……算了，来吧。',
    appearance: [
      '长毛白底，胸与脸雪白',
      '头背棕灰虎斑',
      '蓬松深色尾尖',
      '绿金色眼睛，粉鼻',
    ],
    personality: ['表面上高冷傲娇', '其实超级黏人', '不承认自己想被靠近', '可丽在身边才会安心'],
    likes: ['高处与安静', '可丽靠过来（但不说）', '被轻轻摸摸头'],
    dislikes: ['太吵的环境', '被冷落', '可丽受惊'],
    portrait: '/assets/crops/hero-shaoye.jpg',
    poses: [
      { src: '/assets/crops/shaoye-sit.jpg', label: '坐姿' },
      { src: '/assets/crops/shaoye-stand.jpg', label: '侧立' },
      { src: '/assets/crops/shaoye-sit34.jpg', label: '回眸' },
      { src: '/assets/crops/shaoye-walk.jpg', label: '行走' },
    ],
  },
  keli: {
    id: 'keli',
    name: '可丽',
    nameEn: 'Kě Lì',
    motif: '小花',
    tag: '胆小但超黏少爷',
    tagEn: 'Timid, Super clingy',
    quote: '有少爷在，我就不怕了。',
    appearance: [
      '金渐层英短，体态圆润',
      '奶油胸口与口鼻',
      '橘色短毛虎斑',
      '大绿眼，粉鼻，尾尖深色',
    ],
    personality: ['软萌胆小', '离开少爷就害怕', '黏人程度满分', '把少爷当成全世界的挡风处'],
    likes: ['黏着少爷', '安静角落', '被护在身后'],
    dislikes: ['大声与陌生环境', '少爷不在', '突然的靠近'],
    portrait: '/assets/crops/hero-keli.jpg',
    poses: [
      { src: '/assets/crops/keli-sit.jpg', label: '坐姿' },
      { src: '/assets/crops/keli-stand.jpg', label: '侧立' },
      { src: '/assets/crops/keli-sit34.jpg', label: '回眸' },
      { src: '/assets/crops/keli-walk.jpg', label: '行走' },
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
  { href: '#coming', label: '素材', en: 'Soon' },
] as const

export const relationships = [
  {
    id: 'tsundere',
    kicker: '傲娇 vs 黏人',
    title: '一个不说，一个不走',
    preview: '少爷把温柔藏在尾巴后面。可丽把勇气挂在少爷身上。',
    body: '少爷看起来很高冷，可丽一靠近又舍不得推开。可丽看起来很胆小，可只要贴着少爷，全世界都变小了。',
    image: '/assets/crops/hero-duo.jpg',
  },
  {
    id: 'windbreaker',
    kicker: '保护者 / 挡风的人',
    title: '他站在风前面',
    preview: '少爷负责装作没事。可丽负责把真心说出来。',
    body: '陌生声音、突然的脚步、太大的世界——少爷会先竖起耳朵。可丽躲在他身后，再慢慢把爪子伸出来。',
    image: '/assets/crops/story-work.jpg',
  },
  {
    id: 'together',
    kicker: 'Always together',
    title: '有你在，世界没那么可怕',
    preview: '不是谁更勇敢，是两个人刚好拼成一件完整的外套。',
    body: '他们性格完全不同，却走成同一条路。少了谁，日常都会少一块温度。',
    image: '/assets/crops/story-sleep.jpg',
  },
] as const

export const expressions = [
  {
    src: '/assets/crops/expr-shaoye-aloof.jpg',
    who: '少爷',
    name: '高冷？（无语）',
    en: 'Aloof',
  },
  {
    src: '/assets/crops/expr-shaoye-tsundere.jpg',
    who: '少爷',
    name: '傲娇',
    en: 'Tsundere',
  },
  {
    src: '/assets/crops/expr-shaoye-happy.jpg',
    who: '少爷',
    name: '其实很开心',
    en: 'Secretly glad',
  },
  {
    src: '/assets/crops/expr-keli-together.jpg',
    who: '可丽',
    name: '有少爷在',
    en: 'Safe now',
  },
  {
    src: '/assets/crops/expr-keli-joy.jpg',
    who: '可丽',
    name: '开心！黏紧紧',
    en: 'Clingy joy',
  },
  {
    src: '/assets/crops/expr-keli-shy.jpg',
    who: '可丽',
    name: '害怕 / 委屈',
    en: 'Timid',
  },
] as const

export const stories = [
  {
    src: '/assets/crops/story-work.jpg',
    title: '工作也要一起？',
    en: 'Work, but together',
    line: '少爷在认真装忙。可丽在认真装成抱枕。',
  },
  {
    src: '/assets/crops/story-glance.jpg',
    title: '有点想你，但不会说',
    en: 'I missed you. Not saying it.',
    line: '回一下头就好。被抓到的话，就说是风。',
  },
  {
    src: '/assets/crops/story-sleep.jpg',
    title: '一起才安心',
    en: 'Sleep, then the world is quiet',
    line: '同一块石头、同一团阳光。靠近一点，噩梦就会比较短。',
  },
  {
    src: '/assets/crops/story-home.jpg',
    title: '来家吧，一起好了',
    en: 'Come home',
    line: '门一开，可丽先跑。少爷走在后面，假装不是在跟着。',
  },
] as const

export const merch = [
  {
    src: '/assets/crops/merch-plush.jpg',
    name: '绒毛玩偶',
    en: 'Plush pair',
    note: '一对才能带回家。',
  },
  {
    src: '/assets/crops/merch-stand.jpg',
    name: '压克力立牌',
    en: 'Acrylic stand',
    note: '桌上的小小挡风处。',
  },
  {
    src: '/assets/crops/merch-mug.jpg',
    name: '马克杯',
    en: 'Mugs',
    note: '一杯少爷，一杯可丽。',
  },
  {
    src: '/assets/crops/merch-tote.jpg',
    name: '帆布袋',
    en: 'Tote',
    note: '装得下零食，装不下分离。',
  },
  {
    src: '/assets/crops/merch-phone.jpg',
    name: '手机壳',
    en: 'Phone case',
    note: '亮屏也是他们。',
  },
] as const
