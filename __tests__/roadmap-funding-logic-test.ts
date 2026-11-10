import type { Goal, Roadmap } from '@/data/roadmap';
import { addUnique, sponsor, toggleItem } from '@/store/funding-logic';
import { insertGoal, newGoalId, removeGoal, toggleGoalDone, updateGoals } from '@/store/roadmap-logic';

const goal = (id: string, type: Goal['type'], extra: Partial<Goal> = {}) => ({ id, type, title: id, ...extra }) as Goal;

describe('로드맵 목표 편집', () => {
  const goals = [goal('a', 'school'), goal('b', 'certificate'), goal('final', 'goal')];

  test('최종 목표가 있으면 새 목표는 그 바로 앞에 들어가요', () => {
    const result = insertGoal(goals, goal('new', 'activity'));
    expect(result.map((g) => g.id)).toEqual(['a', 'b', 'new', 'final']);
  });

  test('최종 목표가 없으면 맨 끝에 들어가요', () => {
    const result = insertGoal([goal('a', 'school')], goal('new', 'activity'));
    expect(result.map((g) => g.id)).toEqual(['a', 'new']);
  });

  test('빈 로드맵에도 추가할 수 있어요', () => {
    expect(insertGoal([], goal('new', 'activity')).map((g) => g.id)).toEqual(['new']);
  });

  test('목표를 지워요', () => {
    expect(removeGoal(goals, 'b').map((g) => g.id)).toEqual(['a', 'final']);
  });

  test('완료 표시를 켰다 껐다 해요', () => {
    const on = toggleGoalDone(goals, 'b');
    expect(on.find((g) => g.id === 'b')?.done).toBe(true);
    expect(toggleGoalDone(on, 'b').find((g) => g.id === 'b')?.done).toBe(false);
  });

  test('고른 로드맵만 바뀌어요', () => {
    const roadmaps = [
      { id: 'r1', goals },
      { id: 'r2', goals },
    ] as Roadmap[];
    const result = updateGoals(roadmaps, 'r1', (g) => removeGoal(g, 'a'));
    expect(result[0].goals).toHaveLength(2);
    expect(result[1].goals).toBe(goals);
  });

  test('새 목표 id는 매번 달라요 (저장된 목표와 겹치지 않게)', () => {
    const ids = new Set(Array.from({ length: 50 }, newGoalId));
    expect(ids.size).toBe(50);
  });
});

describe('후원과 신청', () => {
  test('같은 수급자를 다시 후원하면 금액만 바뀌어요', () => {
    const list = sponsor([{ recipientId: 'jehong', amount: 30000 }], 'jehong', 50000);
    expect(list).toEqual([{ recipientId: 'jehong', amount: 50000 }]);
  });

  test('새 수급자는 목록에 추가돼요', () => {
    expect(sponsor([{ recipientId: 'jehong', amount: 30000 }], 'seoyeon', 10000)).toHaveLength(2);
  });

  test('같은 공고에 두 번 신청해도 한 번만 기록돼요', () => {
    expect(addUnique(addUnique([], 'office'), 'office')).toEqual(['office']);
  });

  test('관심 공고는 누를 때마다 등록·해제돼요', () => {
    const on = toggleItem([], 'office');
    expect(on).toEqual(['office']);
    expect(toggleItem(on, 'office')).toEqual([]);
  });
});
