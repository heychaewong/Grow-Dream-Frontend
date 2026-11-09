import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { Colors, FontSize, Radius } from '@/constants/theme';

import { AppText } from './app-text';

type PillProps = {
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
  color?: string;
  size?: keyof typeof FontSize;
  style?: ViewStyle;
};

/** "자세히 보기", "프로필 수정" 같은 작은 둥근 버튼 */
export function Pill({
  label,
  onPress,
  backgroundColor = Colors.primarySoft,
  color = Colors.white,
  size = 'caption',
  style,
}: PillProps) {
  return (
    <Pressable hitSlop={8}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.pill, { backgroundColor, opacity: pressed ? 0.7 : 1 }, style]}>
      <AppText size={size} weight="semibold" color={color}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
});
