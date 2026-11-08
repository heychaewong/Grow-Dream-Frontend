/** 진로 로드맵 가상 데이터 */

export type GoalType = 'start' | 'school' | 'activity' | 'certificate' | 'job' | 'goal';

export type Goal = {
  id: string;
  type: GoalType;
  title: string;
  age?: number;
  /** 모집 전형 같은 짧은 태그 */
  tag?: string;
  /** 모집시기 등 한 줄 안내 */
  info?: string;
  /** 자격증처럼 완료 체크가 가능한 목표 */
  done?: boolean;
};

export type Roadmap = {
  id: string;
  title: string;
  goals: Goal[];
  /** 편집 패널에 보여줄 추천 활동 */
  suggestions: Omit<Goal, 'id'>[];
};

export const GOAL_TYPE_LABEL: Record<GoalType, string> = {
  start: '시작',
  school: '진학',
  activity: '활동',
  certificate: '자격증',
  job: '취업',
  goal: '최종 목표',
};

export const initialRoadmaps: Roadmap[] = [
  {
    id: 'hair',
    title: '내 꿈은 헤어 디자이너 !!',
    goals: [
      { id: 'h1', type: 'start', title: '고등학교 졸업', age: 19, done: true },
      {
        id: 'h2',
        type: 'school',
        title: '국립 채원 대학교 입학',
        age: 21,
        tag: '정시모집',
        info: '모집시기: 2026년 12월 29일 ~ 12월 31일',
      },
      { id: 'h3', type: 'activity', title: '헤어 디자인 전문 학원 수강', age: 22 },
      { id: 'h4', type: 'certificate', title: '미용사(일반) 자격증 취득', age: 23, tag: '국가기술자격' },
      { id: 'h5', type: 'goal', title: '헤어 디자이너 데뷔', age: 25 },
    ],
    suggestions: [
      { type: 'certificate', title: '미용사(일반) 자격증 취득하기' },
      { type: 'activity', title: '미용 전문 학원 수강' },
      { type: 'activity', title: '미용실 인턴 경험 쌓기' },
    ],
  },
  {
    id: 'social',
    title: '사회복지사가 되어 봉사하기',
    goals: [
      { id: 's1', type: 'start', title: '고등학교 졸업', age: 19, done: true },
      { id: 's2', type: 'school', title: '사회복지학과 입학', age: 20, tag: '수시모집' },
      { id: 's3', type: 'activity', title: '봉사활동 100시간', age: 21 },
      { id: 's4', type: 'certificate', title: '사회복지사 2급 취득', age: 24, tag: '국가자격' },
      { id: 's5', type: 'goal', title: '사회복지사', age: 24 },
    ],
    suggestions: [
      { type: 'activity', title: '지역아동센터 봉사' },
      { type: 'certificate', title: '청소년상담사 3급 취득' },
    ],
  },
  {
    id: 'cafe',
    title: '나만의 카페 창업하기',
    goals: [
      { id: 'c1', type: 'start', title: '바리스타 입문', age: 20, done: true },
      { id: 'c2', type: 'certificate', title: '바리스타 2급 취득', age: 20, tag: '민간자격' },
      { id: 'c3', type: 'job', title: '카페 매니저로 일하기', age: 22 },
      { id: 'c4', type: 'goal', title: '카페 창업', age: 26 },
    ],
    suggestions: [
      { type: 'activity', title: '청년 창업 교육 수강' },
      { type: 'certificate', title: '위생관리 교육 이수' },
    ],
  },
];

/** AI 추천 / 직접 탐색용 목표 목록 */
export const goalCatalog: Omit<Goal, 'id'>[] = [
  { type: 'school', title: '국립 채원 대학교 입학', tag: '정시모집' },
  { type: 'school', title: '한국 여자 대학교 입학', tag: '수시모집' },
  { type: 'certificate', title: '컴퓨터활용능력 2급 취득', tag: '국가기술자격' },
  { type: 'certificate', title: '미용사(일반) 자격증 취득', tag: '국가기술자격' },
  { type: 'activity', title: '청년 취업 부트캠프 참가' },
  { type: 'activity', title: '면접 준비 스터디' },
  { type: 'job', title: '사회적기업 입사' },
  { type: 'certificate', title: '바리스타 2급 취득', tag: '민간자격' },
];

export const shortTermPlans = [
  {
    title: '졸업 후 사회적기업 입사 Plan',
    steps: [
      { label: '자격증 공부', weight: 3, color: '#2894DC' },
      { label: '부트캠프 참가', weight: 2, color: '#F4C95D' },
      { label: '면접 준비', weight: 1, color: '#84A38E' },
    ],
  },
  {
    title: '1년 안에 국가자격증 Plan',
    steps: [
      { label: '필기 준비', weight: 2, color: '#2894DC' },
      { label: '실기 연습', weight: 3, color: '#F4C95D' },
      { label: '시험 응시', weight: 1, color: '#84A38E' },
    ],
  },
];
