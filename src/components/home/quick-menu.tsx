import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius } from '@/constants/theme';

export type QuickMenuItem = {
  label: string;
  /** Figma 일러스트 대신 쓰는 오픈소스 아이콘 (저작권 문제 회피) */
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  href: Href;
};

/** 경제교육 / 진로 로드맵 / 펀딩 / 키워드림톡 바로가기 */
export function QuickMenu({ items }: { items: QuickMenuItem[] }) {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => router.push(item.href)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.6 }]}>
          <View style={styles.iconBox}>
            <Ionicons name={item.icon} size={40} color={item.iconColor} />
          </View>
          <AppText size="body" weight="semibold" style={styles.label}>
            {item.label}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  item: {
    alignItems: 'center',
    gap: 8,
    width: 90,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  label: {
    textAlign: 'center',
  },
});
