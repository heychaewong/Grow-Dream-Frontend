import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { CoinBadge } from '@/components/ui/coin-badge';
import { Colors, Spacing } from '@/constants/theme';

/** 로고 + 코인 + 검색 + 알림 */
export function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        {/* TODO: Figma 로고 이미지로 교체 */}
        <View style={styles.logo}>
          <MaterialCommunityIcons name="sprout" size={26} color={Colors.primary} />
        </View>
        <AppText size="headline" weight="extrabold" color={Colors.primary}>
          키워드림
        </AppText>
      </View>

      <View style={styles.actions}>
        <CoinBadge />
        <Ionicons name="search-outline" size={26} color={Colors.text} accessibilityLabel="검색" />
        <Ionicons name="notifications-outline" size={26} color={Colors.text} accessibilityLabel="알림" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
});
