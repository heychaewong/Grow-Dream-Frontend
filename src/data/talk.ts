/** 키워드림톡 가상 데이터 */

export type Channel = {
  id: string;
  name: string;
  /** 카드 제목 (채널 이름과 다를 때) */
  title: string;
  icon: string;
  iconColor: string;
  /** 후원 중인 수급자 채널이면 수급자 id */
  recipientId?: string;
};

export const channels: Channel[] = [
  { id: 'issue', name: 'Issue', title: '오늘의 Issue', icon: 'earth', iconColor: '#5BA3E0' },
  { id: 'policy', name: '정책 알리미', title: '청년 정책 알리미', icon: 'gavel', iconColor: '#C9783B' },
];

export type FeedPost = {
  id: string;
  channelId: string;
  time: string;
  text: string;
  imageLabel?: string;
  likes: number;
  saves: number;
};

export const feedPosts: FeedPost[] = [
  {
    id: 'p1',
    channelId: 'issue',
    time: '30분 전',
    text: "9호 태풍 '종다리'가 한반도 쪽으로 북상하고 있습니다. 중대본 1단계 가동과 함께 위기 경보도 '주의'로 상향됐습니다.",
    imageLabel: '태풍 소식',
    likes: 1642,
    saves: 956,
  },
  {
    id: 'p2',
    channelId: 'policy',
    time: '30분 전',
    text: '청년 도약 계좌 신규 가입 신청이 이번 달 말까지 진행됩니다. 자격 조건과 신청 방법을 확인해 보세요.',
    likes: 812,
    saves: 1204,
  },
  {
    id: 'p3',
    channelId: 'policy',
    time: '2시간 전',
    text: '자립준비청년을 위한 주거 지원 사업 2차 모집이 시작됐어요. 거주지 관할 주민센터에서 상담받을 수 있어요.',
    likes: 455,
    saves: 630,
  },
  {
    id: 'p4',
    channelId: 'issue',
    time: '5시간 전',
    text: '기준금리가 동결됐습니다. 예·적금 금리 흐름이 당분간 유지될 것으로 보여요.',
    likes: 301,
    saves: 128,
  },
];

export type Letter = {
  id: string;
  recipientId: string;
  time: string;
  text: string;
  imageLabel?: string;
};

/** 수급자가 후원자에게 보내는 소식 */
export const letters: Letter[] = [
  {
    id: 'l1',
    recipientId: 'jehong',
    time: '3일 전',
    text: '벌써 늦여름이라니 시간이 정말 빠르네요. 후원자님은 잘 지내고 계신가요? 저는 자랑할 소식이 하나 있어요 😚 일주일 전 면접을 보고 온 사회적기업에 합격했답니다!! 🎉🎉 어제부터 근무하고 있는데, 어색하고 힘들긴 하지만 보람이 더 큰 것 같아요.',
    imageLabel: '합격 소식',
  },
  {
    id: 'l2',
    recipientId: 'jehong',
    time: '2026.07.20',
    text: '안녕하세요 후원자님! 여름 휴가 잘 보내고 계신가요? 저도 어제 동생과 집 근처 계곡에 다녀왔는데 너무 즐거운 경험이었어요 😎🌊 맞다, 최근 사회적기업 입사라는 새로운 목표가 생겼어요! 키워드림 기업 펀딩을 통해 교육을 받으면서 열심히 준비하고 있어요.',
  },
  {
    id: 'l3',
    recipientId: 'seoyeon',
    time: '1일 전',
    text: '후원자님 덕분에 약학 편입 준비용 교재를 샀어요. 경제교육 3강까지 들으면서 용돈 기입장도 쓰기 시작했답니다. 늘 감사드려요!',
  },
];
