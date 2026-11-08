import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type Sponsorship = { recipientId: string; amount: number };

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

export function FundingStoreProvider({ children }: { children: ReactNode }) {
  // Figma 대화창처럼 류제홍 님은 이미 후원 중인 상태로 시작해요.
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([{ recipientId: 'jehong', amount: 30000 }]);
  const [appliedProgramIds, setApplied] = useState<string[]>([]);
  const [bookmarkedProgramIds, setBookmarked] = useState<string[]>([]);
  const [personalApplied, setPersonalApplied] = useState(false);

  const sponsor = useCallback((recipientId: string, amount: number) => {
    setSponsorships((list) => [...list.filter((s) => s.recipientId !== recipientId), { recipientId, amount }]);
  }, []);

  const applyProgram = useCallback((id: string) => {
    setApplied((list) => (list.includes(id) ? list : [...list, id]));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarked((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }, []);

  const submitPersonalApplication = useCallback(() => setPersonalApplied(true), []);

  const isSponsoring = useCallback(
    (recipientId: string) => sponsorships.some((s) => s.recipientId === recipientId),
    [sponsorships],
  );

  const value = useMemo(
    () => ({
      sponsorships,
      appliedProgramIds,
      bookmarkedProgramIds,
      personalApplied,
      sponsor,
      applyProgram,
      toggleBookmark,
      submitPersonalApplication,
      isSponsoring,
    }),
    [
      sponsorships,
      appliedProgramIds,
      bookmarkedProgramIds,
      personalApplied,
      sponsor,
      applyProgram,
      toggleBookmark,
      submitPersonalApplication,
      isSponsoring,
    ],
  );

  return <FundingStoreContext.Provider value={value}>{children}</FundingStoreContext.Provider>;
}

export function useFundingStore() {
  const store = useContext(FundingStoreContext);
  if (!store) throw new Error('useFundingStore는 FundingStoreProvider 안에서만 쓸 수 있어요.');
  return store;
}
