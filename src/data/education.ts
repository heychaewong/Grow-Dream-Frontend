/**
 * 경제교육 가상 데이터.
 * 문장 안의 **굵게**, ==형광펜== 표시는 RichText 컴포넌트가 해석해요.
 */

export type OxQuestion = {
  id: string;
  type: 'ox';
  text: string;
  answer: 'O' | 'X';
  explanation?: string;
};

export type BlankQuestion = {
  id: string;
  type: 'blank';
  text: string;
  answer: string;
  explanation?: string;
};

export type QuizQuestion = OxQuestion | BlankQuestion;

export type Chapter = {
  title: string;
  /** 학습 화면에 보여줄 문장들 */
  lesson?: string[];
  quiz?: QuizQuestion[];
};

export type Lecture = {
  id: number;
  title: string;
  chapters: Chapter[];
};

export const BASIC_COURSE_TITLE = '기초금융교육';
export const BASIC_COURSE_DESCRIPTION = '성공적인 자립을 위한 기본 경제 교육서입니다.';
export const BASIC_COURSE_STARTED_AT = '2026년 10월 06일';

const savingHabitQuiz: QuizQuestion[] = [
  { id: 'q1', type: 'ox', text: '예금이란 은행에 돈을 저축하는 것이다.', answer: 'O' },
  {
    id: 'q2',
    type: 'ox',
    text: '입출금은 인터넷으로도 불가능하다.',
    answer: 'X',
    explanation:
      '컴퓨터나 스마트폰으로도 입출금이 가능해졌어요.\n\n컴퓨터로 하는 것은 인터넷 뱅킹,\n\n스마트폰으로 하는 것은 모바일 뱅킹이라고 불러요.',
  },
  { id: 'q3', type: 'ox', text: '저축 계획을 세우는 것이 올바른 소비습관을 형성할 수 있다.', answer: 'O' },
  {
    id: 'q4',
    type: 'blank',
    text: '저축하는 습관을 기르기 위해선 은행에 가서 OO을 만들어야 한다.',
    answer: '통장',
    explanation: '은행에서 통장(계좌)을 만들면 돈을 안전하게 모으고 입출금 기록도 확인할 수 있어요.',
  },
  {
    id: 'q5',
    type: 'blank',
    text: '저축한 돈을 찾는 것을 OO이라고 한다.',
    answer: '출금',
    explanation: '은행에 돈을 넣는 것은 입금, 저축한 돈을 찾는 것은 출금이에요.',
  },
];

const wiseSavingQuiz: QuizQuestion[] = [
  { id: 'q1', type: 'ox', text: '비상금은 갑작스러운 지출에 대비하는 돈이다.', answer: 'O' },
  {
    id: 'q2',
    type: 'ox',
    text: '적금은 언제든 자유롭게 넣고 뺄 수 있는 통장이다.',
    answer: 'X',
    explanation: '적금은 정해진 기간 동안 꾸준히 넣는 상품이에요. 자유롭게 넣고 빼는 건 입출금 통장이에요.',
  },
  {
    id: 'q3',
    type: 'blank',
    text: '월급을 받으면 먼저 OO부터 하고 남은 돈을 쓰는 것이 좋다.',
    answer: '저축',
    explanation: '"먼저 저축하고 남은 돈으로 생활하기"가 돈을 모으는 가장 쉬운 방법이에요.',
  },
];

export const lectures: Lecture[] = [
  {
    id: 1,
    title: '돈 관리하기',
    chapters: [{ title: '돈이란 무엇일까' }, { title: '용돈 기입장 쓰기' }, { title: '필요와 욕구' }, { title: '예산 세우기' }],
  },
  {
    id: 2,
    title: '현명하게 돈 쓰기',
    chapters: [
      { title: '똑똑한 소비자' },
      { title: '가격 비교하기' },
      { title: '충동구매 막기' },
      { title: '할부와 이자' },
      { title: '중고 거래 안전하게' },
    ],
  },
  {
    id: 3,
    title: '알차게 돈 모으기',
    chapters: [
      {
        title: '슬기로운 저축 생활',
        lesson: ['**비상금**이란 갑작스러운 지출에 대비해 모아 두는 돈', '**적금**이란 정해진 기간 동안 꾸준히 넣는 저축'],
        quiz: wiseSavingQuiz,
      },
      {
        title: '저축하는 좋은 습관',
        lesson: ['**입금**이란 은행에 돈을 저축하는 것', '**출금**이란 저축한 돈을 찾는 것'],
        quiz: savingHabitQuiz,
      },
      { title: '만 원이 만 원이 아니야!' },
      { title: '투자 클라쓰' },
    ],
  },
  { id: 4, title: '위험 대비하기', chapters: [{ title: '보험의 기초' }, { title: '금융사기 예방' }] },
  {
    id: 5,
    title: '금융과 의사결정',
    chapters: [{ title: '기회비용' }, { title: '신용이란' }, { title: '대출 이해하기' }, { title: '좋은 선택하기' }],
  },
  {
    id: 6,
    title: '수입과 지출 관리',
    chapters: [{ title: '월급 명세서 읽기' }, { title: '고정비와 변동비' }, { title: '가계부 쓰기' }],
  },
  {
    id: 7,
    title: '저축과 투자',
    chapters: [{ title: '금리 이해하기' }, { title: '주식 첫걸음' }, { title: '펀드와 ETF' }, { title: '분산 투자' }],
  },
];

/** 처음 상태: 1·2강 완료, 3강은 1장까지 완료 */
export const initialCompletedChapters: Record<number, number> = { 1: 4, 2: 5, 3: 1 };

export const advancedCourses = [
  { id: 'stock', title: '주식', color: '#6B93B0' },
  { id: 'asset', title: '자산관리', color: '#A8A86A' },
  { id: 'tax', title: '세금', color: '#A274B8' },
];

export const dailyQuiz = {
  id: 'daily-0704',
  dateLabel: '11월 08일',
  /** 경제교육 메인 카드용 (형광펜 강조) */
  preview: '**올해 초,** 청년의\n==자산 형성==과 ==주거 안정==을 위해\n통장과 대출을 연계한\n**주거지원 방식은?**',
  question: '올해 초, 청년의 자산 형성과 주거 안정을 위해\n통장과 대출을 연계한 주거지원 방식은?',
  answer: '청년 도약 계좌',
  explanation:
    '일정 금액을 매달 저축하면 정부가 매칭 지원금을 더해주는 방식으로, 청년들이 자산을 형성할 수 있도록 돕는 제도예요.\n\n이 계좌를 통해 청년들은 5년 동안 꾸준히 저축할 경우 만기 시점에 목돈을 마련할 수 있어요.',
};

export const todayIssue = {
  title: '오늘의 이슈',
  question: '**금리**가 내려가면 금에 대한\n**투자 매력**이 상대적으로 증가할까?',
  pages: [
    '최근 국제 금값이 사상 최고치를 기록하며\n**급등**하고 있습니다.\n\n금리 인하 시기에는 금의 매력이 **상승**하며,\n변동성이 큰 금융시장에서 **안전자산**으로\n주목받고 있습니다.',
    '**금은 이자를 지급하지 않는 자산이기 때문에,**\n\n금리가 높을 때는 예금과 같은\n이자 지급 자산이 더 매력적으로 보일 수 있습니다.\n\n반대로 금리가 내려가면 이자 수익의 차이가 줄어들어\n금의 **투자 매력이 상대적으로 커집니다.**',
  ],
  source: {
    title: '"가격 얼마든 재산 지키려면 사둬라" 불안할 때 뜨는 \'이것\' 어디까지 갈까',
    url: 'https://n.news.naver.com/mnews/article/009/0005351293?sid=101',
  },
};

export type RankingEntry = {
  name: string;
  ox: number;
  multiple: number;
  daily: number;
  isMe?: boolean;
};

export const ranking: RankingEntry[] = [
  { name: '김도윤', ox: 20, multiple: 15, daily: 10 },
  { name: '이하늘', ox: 18, multiple: 14, daily: 9, isMe: true },
  { name: '박서준', ox: 18, multiple: 13, daily: 8 },
  { name: '최유나', ox: 16, multiple: 11, daily: 8 },
  { name: '정민호', ox: 15, multiple: 11, daily: 7 },
  { name: '한지우', ox: 15, multiple: 10, daily: 6 },
  { name: '오세아', ox: 14, multiple: 9, daily: 5 },
  { name: '윤태오', ox: 13, multiple: 9, daily: 5 },
];

export const formatRankingRecord = (r: Pick<RankingEntry, 'ox' | 'multiple' | 'daily'>) =>
  `OX ${r.ox}문제 · 객관식 ${r.multiple}문제 · 데일리 ${r.daily}문제`;
