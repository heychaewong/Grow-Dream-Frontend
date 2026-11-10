import type { Lecture } from '@/data/education';
import { completeChapter, computeCourseProgress, rewardQuiz, type AppState } from '@/store/app-logic';

const base: AppState = { coins: 5, completedChapters: { 1: 2 }, rewardedQuizIds: [], todayAnswer: '' };

describe('rewardQuiz: 퀴즈 코인 보상', () => {
  test('처음 푼 퀴즈는 코인을 주고 받은 퀴즈로 기록해요', () => {
    const { state, granted } = rewardQuiz(base, 'quiz-1', 4);
    expect(granted).toBe(4);
    expect(state.coins).toBe(9);
    expect(state.rewardedQuizIds).toEqual(['quiz-1']);
  });

  test('같은 퀴즈로는 두 번 받을 수 없어요', () => {
    const once = rewardQuiz(base, 'quiz-1', 4).state;
    const twice = rewardQuiz(once, 'quiz-1', 4);
    expect(twice.granted).toBe(0);
    expect(twice.state).toBe(once);
  });

  test('0코인 이하 보상은 무시해요', () => {
    expect(rewardQuiz(base, 'quiz-2', 0)).toEqual({ state: base, granted: 0 });
  });

  test('원래 state는 바꾸지 않아요 (불변성)', () => {
    rewardQuiz(base, 'quiz-1', 4);
    expect(base.coins).toBe(5);
    expect(base.rewardedQuizIds).toEqual([]);
  });
});

describe('completeChapter: 장 완료', () => {
  test('들을 차례인 장을 끝내면 진도가 1 올라가요', () => {
    expect(completeChapter(base, 1, 2).completedChapters[1]).toBe(3);
  });

  test('이미 끝낸 장이나 건너뛴 장은 진도를 바꾸지 않아요', () => {
    expect(completeChapter(base, 1, 0)).toBe(base);
    expect(completeChapter(base, 1, 3)).toBe(base);
  });

  test('처음 듣는 강의는 0장부터 시작해요', () => {
    expect(completeChapter(base, 2, 0).completedChapters[2]).toBe(1);
  });
});

describe('computeCourseProgress: 강의 전체 진도', () => {
  const lectures: Lecture[] = [
    { id: 1, title: '첫 강의', chapters: [{ title: 'A' }, { title: 'B' }] },
    { id: 2, title: '둘째 강의', chapters: [{ title: 'C' }, { title: 'D' }] },
    { id: 3, title: '셋째 강의', chapters: [{ title: 'E' }] },
  ] as Lecture[];

  test('완료한 장 수와 진도율을 계산해요', () => {
    const result = computeCourseProgress(lectures, { 1: 2, 2: 1 });
    expect(result.total).toBe(5);
    expect(result.done).toBe(3);
    expect(result.progress).toBeCloseTo(0.6);
  });

  test('앞 강의를 다 끝내야 다음 강의가 열려요', () => {
    const { lectureStatus } = computeCourseProgress(lectures, { 1: 2, 2: 1 });
    expect(lectureStatus.map((s) => s.unlocked)).toEqual([true, true, false]);
    expect(lectureStatus.map((s) => s.isDone)).toEqual([true, false, false]);
  });

  test('마지막으로 끝낸 장을 알려 줘요', () => {
    expect(computeCourseProgress(lectures, { 1: 2, 2: 1 }).last).toEqual({ lectureId: 2, chapterTitle: 'C' });
    expect(computeCourseProgress(lectures, {}).last).toBeNull();
  });

  test('장 수보다 많이 저장돼 있어도 100%를 넘지 않아요', () => {
    const { done, lectureStatus } = computeCourseProgress(lectures, { 1: 9 });
    expect(done).toBe(2);
    expect(lectureStatus[0].progress).toBe(1);
  });
});
