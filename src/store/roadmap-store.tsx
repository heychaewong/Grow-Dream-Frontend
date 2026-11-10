import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import { initialRoadmaps, type Goal, type Roadmap } from '@/data/roadmap';

import { usePersistentState } from './persist';
import * as logic from './roadmap-logic';

type RoadmapStore = {
  roadmaps: Roadmap[];
  /** 목표를 추가해요. 최종 목표가 있으면 그 바로 앞에 넣어요. */
  addGoal: (roadmapId: string, goal: Omit<Goal, 'id'>) => void;
  removeGoal: (roadmapId: string, goalId: string) => void;
  toggleGoalDone: (roadmapId: string, goalId: string) => void;
};

const RoadmapStoreContext = createContext<RoadmapStore | null>(null);

/** 진로 로드맵. 기기에 저장돼서 앱을 다시 열어도 남아요. */
export function RoadmapStoreProvider({ children }: { children: ReactNode }) {
  const [roadmaps, setRoadmaps] = usePersistentState<Roadmap[]>('roadmaps', initialRoadmaps);

  const update = useCallback(
    (roadmapId: string, fn: (goals: Goal[]) => Goal[]) => setRoadmaps((list) => logic.updateGoals(list, roadmapId, fn)),
    [setRoadmaps],
  );

  const addGoal = useCallback(
    (roadmapId: string, goal: Omit<Goal, 'id'>) =>
      update(roadmapId, (goals) => logic.insertGoal(goals, { ...goal, id: logic.newGoalId() })),
    [update],
  );

  const removeGoal = useCallback(
    (roadmapId: string, goalId: string) => update(roadmapId, (goals) => logic.removeGoal(goals, goalId)),
    [update],
  );

  const toggleGoalDone = useCallback(
    (roadmapId: string, goalId: string) => update(roadmapId, (goals) => logic.toggleGoalDone(goals, goalId)),
    [update],
  );

  const value = useMemo(
    () => ({ roadmaps, addGoal, removeGoal, toggleGoalDone }),
    [roadmaps, addGoal, removeGoal, toggleGoalDone],
  );

  return <RoadmapStoreContext.Provider value={value}>{children}</RoadmapStoreContext.Provider>;
}

export function useRoadmapStore() {
  const store = useContext(RoadmapStoreContext);
  if (!store) throw new Error('useRoadmapStore는 RoadmapStoreProvider 안에서만 쓸 수 있어요.');
  return store;
}
