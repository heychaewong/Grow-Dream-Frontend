import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Spacing } from '@/constants/theme';

type HomeHeaderProps = {
  coins: number;
};

/** 로고 + 코인 + 검색 + 알림 */
export function HomeHeader({ coins }: HomeHeaderProps) {
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
        <View style={styles.coin} accessibilityLabel={`보유 코인 ${coins}개`}>
          <View style={styles.coinIcon}>
            <AppText size="caption" weight="extrabold" color={Colors.white}>
              $
            </AppText>
          </View>
          <AppText size="body" weight="bold">
            {coins}
          </AppText>
        </View>
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
  coin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingLeft: 6,
    paddingRight: 18,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.yellow,
  },
  coinIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.coin,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
