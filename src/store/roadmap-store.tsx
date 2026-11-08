import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { initialRoadmaps, type Goal, type Roadmap } from '@/data/roadmap';

type RoadmapStore = {
  roadmaps: Roadmap[];
  /** 목표를 추가해요. 최종 목표가 있으면 그 바로 앞에 넣어요. */
  addGoal: (roadmapId: string, goal: Omit<Goal, 'id'>) => void;
  removeGoal: (roadmapId: string, goalId: string) => void;
  toggleGoalDone: (roadmapId: string, goalId: string) => void;
};

const RoadmapStoreContext = createContext<RoadmapStore | null>(null);

let nextId = 1;

export function RoadmapStoreProvider({ children }: { children: ReactNode }) {
  const [roadmaps, setRoadmaps] = useState(initialRoadmaps);

  const updateGoals = useCallback((roadmapId: string, fn: (goals: Goal[]) => Goal[]) => {
    setRoadmaps((list) => list.map((r) => (r.id === roadmapId ? { ...r, goals: fn(r.goals) } : r)));
  }, []);

  const addGoal = useCallback(
    (roadmapId: string, goal: Omit<Goal, 'id'>) =>
      updateGoals(roadmapId, (goals) => {
        const created: Goal = { ...goal, id: `new-${nextId++}` };
        const last = goals[goals.length - 1];
        return last?.type === 'goal' ? [...goals.slice(0, -1), created, last] : [...goals, created];
      }),
    [updateGoals],
  );

  const removeGoal = useCallback(
    (roadmapId: string, goalId: string) => updateGoals(roadmapId, (goals) => goals.filter((g) => g.id !== goalId)),
    [updateGoals],
  );

  const toggleGoalDone = useCallback(
    (roadmapId: string, goalId: string) =>
      updateGoals(roadmapId, (goals) => goals.map((g) => (g.id === goalId ? { ...g, done: !g.done } : g))),
    [updateGoals],
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
