/**
 * 키워드림 디자인 토큰.
 * 색상은 Figma 화면 캡처에서 추출한 값이에요.
 */

export const Colors = {
  // 브랜드 초록
  primary: '#507C5C',
  primaryDark: '#244B25',
  primarySoft: '#84A38E',
  primaryTint: '#E9FAE5',
  mint: '#D3E3D6',

  // 브랜드 노랑
  yellow: '#FFE77B',
  highlight: '#FFEC95',
  cream: '#FFF3BF',
  creamLight: '#FFFCEF',
  coin: '#FFC107',

  // 진로 로드맵 포인트
  blue: '#2894DC',
  blueTint: '#E4EDF9',
  beige: '#F4E2B9',

  // 기본
  white: '#FFFFFF',
  black: '#000000',
  text: '#000000',
  textSub: '#404040',
  textMuted: '#868686',
  border: '#868686',
  borderLight: '#BFBFBF',
  divider: '#DFDFDF',
  track: '#D9D9D9',
  surface: '#F5F5F5',

  // 경제교육 퀴즈
  quizGreen: '#5CB85C',
  quizGreenSoft: '#B5E3B5',
  wrong: '#F03A2E',
  alert: '#FF8A8A',

  // 랭킹
  gold: '#E8B92F',
  silver: '#9E9E9E',
  bronze: '#D9822B',
  orange: '#F7B54A',

  // 펀딩 / 키워드림톡
  heroGray: '#4A564B',
  mustard: '#E8C33A',
  talkCream: '#FFF8DE',
  talkBand: '#F3E8C2',

  dim: 'rgba(0, 0, 0, 0.35)',
} as const;

/** 굵기별 Pretendard 폰트 이름. Android는 커스텀 폰트의 fontWeight를 무시해서 이름으로 구분해요. */
export const FontFamily = {
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  semibold: 'Pretendard-SemiBold',
  bold: 'Pretendard-Bold',
  extrabold: 'Pretendard-ExtraBold',
} as const;

export type FontWeightName = keyof typeof FontFamily;

export const FontSources = {
  [FontFamily.regular]: require('@/assets/fonts/Pretendard-Regular.otf'),
  [FontFamily.medium]: require('@/assets/fonts/Pretendard-Medium.otf'),
  [FontFamily.semibold]: require('@/assets/fonts/Pretendard-SemiBold.otf'),
  [FontFamily.bold]: require('@/assets/fonts/Pretendard-Bold.otf'),
  [FontFamily.extrabold]: require('@/assets/fonts/Pretendard-ExtraBold.otf'),
};

/** 글자 크기 단계. 본문(body)은 17이에요. 자세한 쓰임은 DESIGN.md를 봐요. */
export const FontSize = {
  caption: 13,
  small: 15,
  body: 17,
  bodyLarge: 20,
  title: 24,
  headline: 28,
  display: 32,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

/** Figma 프레임 폭. 웹에서는 이 폭으로 가운데 정렬해요. */
export const AppMaxWidth = 430;
