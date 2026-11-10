/** 코인·학습 진도 계산. 화면이나 React와 상관없는 순수 함수라 테스트하기 쉬워요. */

import type { Lecture } from '@/data/education';

export type AppState = {
  coins: number;
  /** 강의 id → 완료한 장 수 (장은 순서대로만 들을 수 있어요) */
  completedChapters: Record<number, number>;
  /** 코인을 이미 받은 퀴즈 id (같은 퀴즈로 두 번 받지 않도록) */
  rewardedQuizIds: string[];
  /** 홈의 "오늘의 질문" 답변. 아직 안 썼으면 빈 문자열 */
  todayAnswer: string;
};

/** 퀴즈 보상. 처음 푼 퀴즈만 코인을 주고, 실제로 준 코인 수를 함께 돌려줘요. */
export function rewardQuiz(state: AppState, quizId: string, coins: number): { state: AppState; granted: number } {
  if (coins <= 0 || state.rewardedQuizIds.includes(quizId)) return { state, granted: 0 };
  return {
    state: { ...state, coins: state.coins + coins, rewardedQuizIds: [...state.rewardedQuizIds, quizId] },
    granted: coins,
  };
}

/** 장을 끝냈을 때. 지금 들을 차례인 장을 끝냈을 때만 진도가 올라가요. */
export function completeChapter(state: AppState, lectureId: number, chapterIndex: number): AppState {
  const done = state.completedChapters[lectureId] ?? 0;
  if (chapterIndex !== done) return state;
  return { ...state, completedChapters: { ...state.completedChapters, [lectureId]: done + 1 } };
}

/** 강의 전체 진도. 앞 강의를 다 끝내야 다음 강의가 열려요. */
export function computeCourseProgress(lectures: Lecture[], completedChapters: Record<number, number>) {
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
}
