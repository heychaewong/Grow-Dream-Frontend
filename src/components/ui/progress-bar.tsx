import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme';

type ProgressBarProps = {
  /** 0 ~ 1 */
  value: number;
  height?: number;
  color?: string;
  trackColor?: string;
  style?: ViewStyle;
};

export function ProgressBar({
  value,
  height = 11,
  color = Colors.primary,
  trackColor = Colors.track,
  style,
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));

  return (
    <View
      style={[styles.track, { height, borderRadius: height / 2, backgroundColor: trackColor }, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}>
      <View style={{ width: `${clamped * 100}%`, height, borderRadius: height / 2, backgroundColor: color }} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
  },
});
