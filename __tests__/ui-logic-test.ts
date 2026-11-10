import { isCorrect } from '@/components/education/chapter-quiz';
import { routeMapHeight, stationPoint } from '@/components/roadmap/route-map';
import { parseRichText } from '@/components/ui/rich-text';
import type { QuizQuestion } from '@/data/education';

describe('parseRichText: **굵게**, ==형광펜== 문법', () => {
  test('일반 글자, 굵은 글자, 형광펜 글자로 나눠요', () => {
    expect(parseRichText('올해 **청년**의 ==자산 형성==을 위해')).toEqual([
      { text: '올해 ' },
      { text: '청년', bold: true },
      { text: '의 ' },
      { text: '자산 형성', mark: true },
      { text: '을 위해' },
    ]);
  });

  test('표시가 없으면 글 전체가 한 조각이에요', () => {
    expect(parseRichText('그냥 문장')).toEqual([{ text: '그냥 문장' }]);
  });

  test('닫히지 않은 표시는 그대로 글자로 둬요', () => {
    expect(parseRichText('**닫히지 않음')).toEqual([{ text: '**닫히지 않음' }]);
  });
});

describe('isCorrect: 빈칸 퀴즈 채점', () => {
  const q = { answer: '청년 도약 계좌' } as QuizQuestion;

  test('띄어쓰기가 달라도 정답으로 인정해요', () => {
    expect(isCorrect(q, '청년도약계좌')).toBe(true);
    expect(isCorrect(q, ' 청년 도약  계좌 ')).toBe(true);
  });

  test('다른 답이나 빈 답은 오답이에요', () => {
    expect(isCorrect(q, '청년 희망 적금')).toBe(false);
    expect(isCorrect(q, '')).toBe(false);
    expect(isCorrect(q, undefined)).toBe(false);
  });
});

describe('stationPoint: 진로 로드맵 정류장 위치', () => {
  const width = 400;

  test('정류장은 왼쪽 2개, 오른쪽 2개씩 번갈아 지그재그로 놓여요', () => {
    const xs = [0, 1, 2, 3, 4, 5].map((i) => stationPoint(i, width).x);
    const [left, right] = [Math.round(width * 0.35), Math.round(width * 0.69)];
    expect(xs).toEqual([left, left, right, right, left, left]);
  });

  test('두 정류장마다 한 줄씩 아래로 내려가요', () => {
    const ys = [0, 1, 2, 3, 4].map((i) => stationPoint(i, width).y);
    expect(ys[1]).toBe(ys[2]);
    expect(ys[3]).toBe(ys[4]);
    expect(ys[1]).toBeGreaterThan(ys[0]);
    expect(ys[3]).toBeGreaterThan(ys[1]);
  });

  test('목표가 늘면 노선도 높이도 늘어나요', () => {
    expect(routeMapHeight(6)).toBeGreaterThan(routeMapHeight(4));
    expect(stationPoint(5, width).y).toBeLessThan(routeMapHeight(6));
  });
});
