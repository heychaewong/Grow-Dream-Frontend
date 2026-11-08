import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Spacing } from '@/constants/theme';

/** 아직 구현하지 않은 화면을 대신 보여줘요. */
export default function ComingSoonScreen() {
  const { title } = useLocalSearchParams<{ title?: string }>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={title ?? '준비 중'} right={<View />} />
      <View style={styles.body}>
        <MaterialCommunityIcons name="sprout" size={56} color={Colors.primarySoft} />
        <AppText size="bodyLarge" weight="bold">
          열심히 자라는 중이에요
        </AppText>
        <AppText color={Colors.textMuted}>이 화면은 곧 만나볼 수 있어요.</AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
});
