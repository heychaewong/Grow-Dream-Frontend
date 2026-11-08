import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import { Colors } from '@/constants/theme';
import type { Goal, GoalType } from '@/data/roadmap';

const ROW_HEIGHT = 137;
const TOP = 40;
const LINE = 8;
const BOTTOM_PAD = 70;

type StationStyle = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  size: number;
  shape: 'circle' | 'square';
};

const STATION: Record<GoalType, StationStyle> = {
  start: { icon: 'pencil-outline', size: 63, shape: 'circle' },
  school: { icon: 'town-hall', size: 84, shape: 'circle' },
  activity: { icon: 'pencil-outline', size: 63, shape: 'square' },
  certificate: { icon: 'certificate-outline', size: 72, shape: 'circle' },
  job: { icon: 'briefcase-outline', size: 72, shape: 'circle' },
  goal: { icon: 'school-outline', size: 84, shape: 'circle' },
};

/**
 * 정류장 위치: 세로 → 가로 → 세로 → 가로 … 로 꺾이는 지그재그(뱀) 모양.
 * i % 4 가 0,1 이면 왼쪽 열, 2,3 이면 오른쪽 열이고, 행은 (i+1)/2 를 내림한 값이에요.
 */
export function stationPoint(index: number, width: number) {
  const left = Math.round(width * 0.35);
  const right = Math.round(width * 0.69);
  const x = index % 4 < 2 ? left : right;
  const y = TOP + Math.floor((index + 1) / 2) * ROW_HEIGHT;
  return { x, y };
}

export function routeMapHeight(count: number) {
  return TOP + Math.floor(count / 2) * ROW_HEIGHT + BOTTOM_PAD;
}

type RouteMapProps = {
  goals: Goal[];
  onPressGoal: (index: number) => void;
  /** 편집 모드면 정류장마다 삭제 버튼이 보여요 */
  editing?: boolean;
  onRemoveGoal?: (index: number) => void;
};

export function RouteMap({ goals, onPressGoal, editing, onRemoveGoal }: RouteMapProps) {
  const [width, setWidth] = useState(0);
  const height = routeMapHeight(goals.length);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const points = goals.map((_, i) => stationPoint(i, width));
  const first = points[0];
  const last = points[points.length - 1];
  // 왼쪽 끝에서 들어와서, 마지막 정류장과 가까운 쪽 끝으로 빠져나가요.
  const route = first
    ? [{ x: 0, y: first.y }, ...points, { x: last.x > width / 2 ? width : 0, y: last.y }]
    : [];

  const toAttr = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width > 0 && (
        <>
          <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
            {/* 다른 사람들의 로드맵 (배경 장식) */}
            <Polyline
              points={toAttr([
                { x: 0, y: TOP + 68 },
                { x: width * 0.55, y: TOP + 68 },
                { x: width * 0.55, y: TOP + 2 },
                { x: width, y: TOP + 2 },
              ])}
              stroke={Colors.beige}
              strokeWidth={LINE}
              fill="none"
            />
            <Polyline
              points={toAttr([
                { x: 0, y: TOP + ROW_HEIGHT * 1.53 },
                { x: width, y: TOP + ROW_HEIGHT * 1.53 },
              ])}
              stroke="#CFE0F3"
              strokeWidth={LINE}
              fill="none"
            />
            {/* 내 로드맵 */}
            <Polyline points={toAttr(route)} stroke={Colors.blue} strokeWidth={LINE} fill="none" strokeLinejoin="miter" />
          </Svg>

          {goals.map((goal, i) => {
            const style = STATION[goal.type];
            const p = points[i];
            return (
              <View
                key={goal.id}
                style={[styles.stationWrap, { left: p.x - style.size / 2, top: p.y - style.size / 2 }]}>
                <Pressable
                  onPress={() => onPressGoal(i)}
                  accessibilityRole="button"
                  accessibilityLabel={`목표 ${i + 1}: ${goal.title}`}
                  style={({ pressed }) => [
                    styles.station,
                    {
                      width: style.size,
                      height: style.size,
                      borderRadius: style.shape === 'circle' ? style.size / 2 : 2,
                      transform: [{ scale: pressed ? 0.94 : 1 }],
                    },
                  ]}>
                  <MaterialCommunityIcons name={style.icon} size={style.size * 0.55} color={Colors.text} />
                </Pressable>
                {goal.done && goal.type !== 'start' && (
                  <View style={styles.doneBadge}>
                    <Ionicons name="checkmark" size={14} color={Colors.white} />
                  </View>
                )}
                {editing && goal.type !== 'start' && (
                  <Pressable
                    onPress={() => onRemoveGoal?.(i)}
                    style={styles.removeBadge}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`${goal.title} 삭제`}>
                    <Ionicons name="close" size={14} color={Colors.white} />
                  </Pressable>
                )}
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  stationWrap: {
    position: 'absolute',
  },
  station: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
  },
  doneBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  removeBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.wrong,
  },
});
