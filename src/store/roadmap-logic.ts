/** 로드맵 목표 편집. 화면과 상관없는 순수 함수라 테스트하기 쉬워요. */

import type { Goal, Roadmap } from '@/data/roadmap';

/** 새 목표 id. 저장된 목표와 겹치지 않도록 시간과 난수를 섞어요. */
export const newGoalId = () => `new-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/** 목표를 추가해요. 마지막이 최종 목표(goal)면 그 바로 앞에 넣어서 최종 목표가 항상 끝에 있게 해요. */
export function insertGoal(goals: Goal[], goal: Goal): Goal[] {
  const last = goals[goals.length - 1];
  return last?.type === 'goal' ? [...goals.slice(0, -1), goal, last] : [...goals, goal];
}

export const removeGoal = (goals: Goal[], goalId: string) => goals.filter((g) => g.id !== goalId);

export const toggleGoalDone = (goals: Goal[], goalId: string) =>
  goals.map((g) => (g.id === goalId ? { ...g, done: !g.done } : g));

/** 로드맵 하나의 목표 목록만 바꿔요. */
export const updateGoals = (roadmaps: Roadmap[], roadmapId: string, fn: (goals: Goal[]) => Goal[]) =>
  roadmaps.map((r) => (r.id === roadmapId ? { ...r, goals: fn(r.goals) } : r));
