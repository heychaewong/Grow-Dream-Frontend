import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Colors } from '@/constants/theme';

export default function MyPageScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppText size="headline" weight="bold">
        마이페이지
      </AppText>
      <AppText color={Colors.textMuted}>준비 중</AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
});
