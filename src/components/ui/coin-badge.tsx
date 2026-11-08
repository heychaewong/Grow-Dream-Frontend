import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { useAppStore } from '@/store/app-store';

import { AppText } from './app-text';

/** 보유 코인 표시. 퀴즈로 코인을 받으면 모든 화면에서 같이 바뀌어요. */
export function CoinBadge() {
  const { coins } = useAppStore();

  return (
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
  );
}

const styles = StyleSheet.create({
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
