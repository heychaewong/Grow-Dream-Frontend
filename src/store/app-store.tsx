import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { initialCompletedChapters, lectures } from '@/data/education';
import { currentUser } from '@/data/user';

type AppState = {
  coins: number;
  /** 강의 id → 완료한 장 수 (장은 순서대로만 들을 수 있어요) */
  completedChapters: Record<number, number>;
  /** 코인을 이미 받은 퀴즈 id (같은 퀴즈로 두 번 받지 않도록) */
  rewardedQuizIds: string[];
};

type AppStore = AppState & {
  /** 퀴즈 보상. 처음 푼 퀴즈만 코인을 주고, 실제로 준 코인 수를 돌려줘요. */
  rewardQuiz: (quizId: string, coins: number) => number;
  completeChapter: (lectureId: number, chapterIndex: number) => void;
};

const AppStoreContext = createContext<AppStore | null>(null);

/** 데모용 전역 상태. 실제 서비스라면 서버와 동기화될 부분이에요. */
export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    coins: currentUser.coins,
    completedChapters: initialCompletedChapters,
    rewardedQuizIds: [],
  });

  const rewardQuiz = useCallback(
    (quizId: string, coins: number) => {
      if (state.rewardedQuizIds.includes(quizId) || coins <= 0) return 0;
      setState((s) =>
        s.rewardedQuizIds.includes(quizId)
          ? s
          : { ...s, coins: s.coins + coins, rewardedQuizIds: [...s.rewardedQuizIds, quizId] },
      );
      return coins;
    },
    [state.rewardedQuizIds],
  );

  const completeChapter = useCallback((lectureId: number, chapterIndex: number) => {
    setState((s) => {
      const done = s.completedChapters[lectureId] ?? 0;
      // 지금 들을 차례인 장을 끝냈을 때만 진도가 올라가요.
      if (chapterIndex !== done) return s;
      return { ...s, completedChapters: { ...s.completedChapters, [lectureId]: done + 1 } };
    });
  }, []);

  const value = useMemo(() => ({ ...state, rewardQuiz, completeChapter }), [state, rewardQuiz, completeChapter]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error('useAppStore는 AppStoreProvider 안에서만 쓸 수 있어요.');
  return store;
}

/** 기초금융교육 진도 계산 */
export function useCourseProgress() {
  const { completedChapters } = useAppStore();

  return useMemo(() => {
    const total = lectures.reduce((sum, l) => sum + l.chapters.length, 0);
    const done = lectures.reduce((sum, l) => sum + Math.min(completedChapters[l.id] ?? 0, l.chapters.length), 0);

    const lectureStatus = lectures.map((lecture, i) => {
      const completed = Math.min(completedChapters[lecture.id] ?? 0, lecture.chapters.length);
      const prev = lectures[i - 1];
      const prevDone = !prev || (completedChapters[prev.id] ?? 0) >= prev.chapters.length;
      return {
        lecture,
        completed,
        progress: completed / lecture.chapters.length,
        unlocked: prevDone,
        isDone: completed >= lecture.chapters.length,
      };
    });

    // 마지막으로 끝낸 장 (예: 3강 1장)
    let last: { lectureId: number; chapterTitle: string } | null = null;
    for (const s of lectureStatus) {
      if (s.completed > 0) last = { lectureId: s.lecture.id, chapterTitle: s.lecture.chapters[s.completed - 1].title };
    }

    return { total, done, progress: total ? done / total : 0, lectureStatus, last };
  }, [completedChapters]);
}
