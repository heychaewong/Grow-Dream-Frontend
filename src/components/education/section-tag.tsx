import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors } from '@/constants/theme';

/** 초록색 사각 라벨 (기초금융교육, 세부 분야 교육 등) */
export function SectionTag({ label, dot }: { label: string; dot?: boolean }) {
  return (
    <View style={styles.wrap}>
      {dot && <View style={styles.dot} />}
      <View style={styles.tag}>
        <AppText size="small" weight="bold" color={Colors.white}>
          {label}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.quizGreen,
  },
  dot: {
    position: 'absolute',
    left: -5,
    top: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.wrong,
    zIndex: 1,
  },
});
