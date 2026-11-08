/** 펀딩 가상 데이터 */

export const fundingFeatures = [
  {
    icon: 'account-switch-outline',
    title: '활발한 소통',
    description: '키워드림 자체 SNS 페이지에서\n수급자와 정기적으로 소통',
  },
  {
    icon: 'cash-check',
    title: '높은 투명성',
    description: '수급자에게 지급되는 정확한\n후원금 액수를 확인 가능',
  },
  {
    icon: 'arrow-up-bold-circle-outline',
    title: '보이는 성장',
    description: '수급자의 프로필에서 경제교육,\n진로로드맵 성과 상시 확인 가능',
  },
] as const;

export type Recipient = {
  id: string;
  name: string;
  dream: string;
  intro: string;
  gender: '여성' | '남성';
  age: number;
  /** 키워드림이 활동 내역·자기 PR을 검수했는지 */
  verified: boolean;
  /** 추천순 정렬용 점수 */
  score: number;
  uploadedAt: string;
};

export const recipients: Recipient[] = [
  {
    id: 'seoyeon',
    name: '이서연',
    dream: '약사',
    intro: '저는 인생의 해독제를 찾아 사람들에게 희망과 건강을 전하는, 별처럼 빛나는 존재입니다.',
    gender: '여성',
    age: 20,
    verified: true,
    score: 92,
    uploadedAt: '2026-11-07',
  },
  {
    id: 'jehong',
    name: '류제홍',
    dream: '헤어 디자이너',
    intro: '저는 세상의 아름다움을 디자인하는 헤어 디자이너의 길을 걷고자 하는 남학생입니다.',
    gender: '남성',
    age: 21,
    verified: true,
    score: 88,
    uploadedAt: '2026-11-05',
  },
  {
    id: 'sangcheol',
    name: '안상철',
    dream: '공무원',
    intro: '저는 희망의 씨앗을 심고 공공의 이익을 위해 헌신하는 공무원이 되기를 꿈꾸고 있습니다.',
    gender: '남성',
    age: 22,
    verified: false,
    score: 75,
    uploadedAt: '2026-11-06',
  },
  {
    id: 'deulle',
    name: '민들레',
    dream: '수학 교사',
    intro: '저는 수학이라는 세계 속에서 지혜의 열쇠를 찾고 꿈나무들에게 길을 안내하고 싶습니다.',
    gender: '여성',
    age: 19,
    verified: true,
    score: 81,
    uploadedAt: '2026-11-02',
  },
];

export type Program = {
  id: string;
  company: string;
  title: string;
  region: string;
  field: string;
  icon: string;
  iconColor: string;
  applied: number;
  capacity: number;
  description: string;
};

export const programs: Program[] = [
  {
    id: 'office',
    company: '사회적기업 엠제이에스(주)',
    title: '오피스 프로그램 활용 교육 공고',
    region: '대전',
    field: 'IT·사무',
    icon: 'microsoft-excel',
    iconColor: '#1D6F42',
    applied: 0,
    capacity: 15,
    description: '엑셀, 파워포인트 등 사무 프로그램을 실무 위주로 배우는 8주 과정이에요.',
  },
  {
    id: 'english',
    company: '사회적기업 이모탈글로벌(주)',
    title: '실용 영어 회화 교육 공고',
    region: '대전',
    field: '어학',
    icon: 'earth',
    iconColor: '#2894DC',
    applied: 10,
    capacity: 20,
    description: '원어민 강사와 함께하는 생활·직장 영어 회화 과정이에요.',
  },
  {
    id: 'software',
    company: '사회적기업 케이투컴퓨터(주)',
    title: '컴퓨터 소프트웨어 교육 공고',
    region: '대전',
    field: 'IT·사무',
    icon: 'desktop-classic',
    iconColor: '#3B5B7A',
    applied: 10,
    capacity: 10,
    description: '컴퓨터 기초부터 간단한 프로그래밍까지 배우는 과정이에요.',
  },
  {
    id: 'bakery',
    company: '사회적기업 가족방앗간(주)',
    title: '제과제빵 교육 프로그램 공고',
    region: '대전',
    field: '요리·제과',
    icon: 'baguette',
    iconColor: '#C98A3B',
    applied: 0,
    capacity: 15,
    description: '제과제빵 기능사 취득을 목표로 하는 실습 중심 과정이에요.',
  },
  {
    id: 'barista',
    company: '사회적기업 온기카페(주)',
    title: '바리스타 실무 교육 공고',
    region: '세종',
    field: '요리·제과',
    icon: 'coffee',
    iconColor: '#6F4E37',
    applied: 3,
    capacity: 12,
    description: '카페 현장 실습과 바리스타 2급 준비를 함께하는 과정이에요.',
  },
];

export const REGIONS = ['전체', '대전', '세종'];
export const FIELDS = ['전체', 'IT·사무', '어학', '요리·제과'];

export const TERMS = [
  { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의서' },
  { id: 'third', label: '[필수] 개인정보 제3자 제공 동의서' },
  { id: 'service', label: '[필수] 키워드림 개인 후원 이용 약관 동의' },
];

export const DONATION_AMOUNTS = [10000, 30000, 50000];
