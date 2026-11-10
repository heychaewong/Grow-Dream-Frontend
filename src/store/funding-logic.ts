/** 후원·신청 상태 변경. 화면과 상관없는 순수 함수라 테스트하기 쉬워요. */

export type Sponsorship = { recipientId: string; amount: number };

export type FundingState = {
  sponsorships: Sponsorship[];
  appliedProgramIds: string[];
  bookmarkedProgramIds: string[];
  personalApplied: boolean;
};

/** 정기후원 시작 또는 금액 변경. 같은 수급자는 한 번만 후원 목록에 있어요. */
export const sponsor = (list: Sponsorship[], recipientId: string, amount: number): Sponsorship[] => [
  ...list.filter((s) => s.recipientId !== recipientId),
  { recipientId, amount },
];

/** 목록에 없을 때만 추가해요 (같은 공고에 두 번 신청하지 않게). */
export const addUnique = (list: string[], id: string) => (list.includes(id) ? list : [...list, id]);

/** 있으면 빼고 없으면 넣어요 (관심 공고 ⭐). */
export const toggleItem = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
