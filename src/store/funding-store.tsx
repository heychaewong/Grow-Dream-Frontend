import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import * as logic from './funding-logic';
import type { FundingState, Sponsorship } from './funding-logic';
import { usePersistentState } from './persist';

type FundingStore = {
  sponsorships: Sponsorship[];
  appliedProgramIds: string[];
  bookmarkedProgramIds: string[];
  personalApplied: boolean;
  sponsor: (recipientId: string, amount: number) => void;
  applyProgram: (programId: string) => void;
  toggleBookmark: (programId: string) => void;
  submitPersonalApplication: () => void;
  isSponsoring: (recipientId: string) => boolean;
};

const FundingStoreContext = createContext<FundingStore | null>(null);

const initialFundingState: FundingState = {
  // Figma 대화창처럼 류제홍 님은 이미 후원 중인 상태로 시작해요.
  sponsorships: [{ recipientId: 'jehong', amount: 30000 }],
  appliedProgramIds: [],
  bookmarkedProgramIds: [],
  personalApplied: false,
};

/** 후원·교육 신청·관심 공고. 기기에 저장돼서 앱을 다시 열어도 남아요. */
export function FundingStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = usePersistentState<FundingState>('funding', initialFundingState);

  const sponsor = useCallback(
    (recipientId: string, amount: number) =>
      setState((s) => ({ ...s, sponsorships: logic.sponsor(s.sponsorships, recipientId, amount) })),
    [setState],
  );

  const applyProgram = useCallback(
    (id: string) => setState((s) => ({ ...s, appliedProgramIds: logic.addUnique(s.appliedProgramIds, id) })),
    [setState],
  );

  const toggleBookmark = useCallback(
    (id: string) => setState((s) => ({ ...s, bookmarkedProgramIds: logic.toggleItem(s.bookmarkedProgramIds, id) })),
    [setState],
  );

  const submitPersonalApplication = useCallback(() => setState((s) => ({ ...s, personalApplied: true })), [setState]);

  const isSponsoring = useCallback(
    (recipientId: string) => state.sponsorships.some((s) => s.recipientId === recipientId),
    [state.sponsorships],
  );

  const value = useMemo(
    () => ({ ...state, sponsor, applyProgram, toggleBookmark, submitPersonalApplication, isSponsoring }),
    [state, sponsor, applyProgram, toggleBookmark, submitPersonalApplication, isSponsoring],
  );

  return <FundingStoreContext.Provider value={value}>{children}</FundingStoreContext.Provider>;
}

export function useFundingStore() {
  const store = useContext(FundingStoreContext);
  if (!store) throw new Error('useFundingStore는 FundingStoreProvider 안에서만 쓸 수 있어요.');
  return store;
}
