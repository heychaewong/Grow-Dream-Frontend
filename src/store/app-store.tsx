import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import { initialCompletedChapters, lectures } from '@/data/education';
import { currentUser } from '@/data/user';

import * as logic from './app-logic';
import type { AppState } from './app-logic';
import { usePersistentState } from './persist';

type AppStore = AppState & {
  /** 퀴즈 보상. 처음 푼 퀴즈만 코인을 주고, 실제로 준 코인 수를 돌려줘요. */
  rewardQuiz: (quizId: string, coins: number) => number;
  completeChapter: (lectureId: number, chapterIndex: number) => void;
  setTodayAnswer: (answer: string) => void;
};

const AppStoreContext = createContext<AppStore | null>(null);

export const initialAppState: AppState = {
  coins: currentUser.coins,
  completedChapters: initialCompletedChapters,
  rewardedQuizIds: [],
  todayAnswer: '',
};

/** 코인·학습 진도·오늘의 질문 답변. 기기에 저장돼서 앱을 다시 열어도 남아요. */
export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = usePersistentState<AppState>('app', initialAppState);

  const rewardQuiz = useCallback(
    (quizId: string, coins: number) => {
      // 보상 여부는 지금 state로 판단해서 바로 돌려주고, 저장은 최신 state 기준으로 해요.
      const { granted } = logic.rewardQuiz(state, quizId, coins);
      if (granted > 0) setState((s) => logic.rewardQuiz(s, quizId, coins).state);
      return granted;
    },
    [state, setState],
  );

  const completeChapter = useCallback(
    (lectureId: number, chapterIndex: number) => setState((s) => logic.completeChapter(s, lectureId, chapterIndex)),
    [setState],
  );

  const setTodayAnswer = useCallback((todayAnswer: string) => setState((s) => ({ ...s, todayAnswer })), [setState]);

  const value = useMemo(
    () => ({ ...state, rewardQuiz, completeChapter, setTodayAnswer }),
    [state, rewardQuiz, completeChapter, setTodayAnswer],
  );

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
  return useMemo(() => logic.computeCourseProgress(lectures, completedChapters), [completedChapters]);
}
