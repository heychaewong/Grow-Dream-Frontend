/** 홈 화면 가상 데이터 */

export const todayQuestion = {
  number: 1,
  highlight: '가치있는 삶',
  rest: '이란 당신에게 어떤 것인가요?',
};

export type BoardPreview = {
  id: string;
  board: string;
  author: string;
  content: string;
  time: string;
};

export const boardPreviews: BoardPreview[] = [
  { id: 'today', board: '오늘의 질문', author: '익명의 민트초코', content: '오늘 답변은 다들 어떻게 쓰셨나요?', time: '1분 전' },
  { id: 'info', board: '정보공유', author: '익명의 고릴라', content: '자취 생활 꿀팁 8가지 추천', time: '30초 전' },
  { id: 'free', board: '일반 게시판', author: '익명의 이구아나', content: '오랜만에 운동하러 나왔어요!', time: '방금' },
  { id: 'economy', board: '경제 게시판', author: '익명의 고양이', content: '청년 도약 계좌 가입 후기 남겨요', time: '3분 전' },
];
