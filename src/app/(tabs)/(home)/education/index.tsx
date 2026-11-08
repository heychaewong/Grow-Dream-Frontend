import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors } from '@/constants/theme';

export default function EducationMainScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="경제 교육" />
      <View style={styles.body}>
        <AppText color={Colors.textMuted}>경제교육 화면 준비 중</AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
