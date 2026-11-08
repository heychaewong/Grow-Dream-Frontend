import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

type TalkCardProps = {
  avatar: ReactNode;
  title: string;
  time: string;
  badge: string;
  text: string;
  /** 사진 자리 (원본 사진은 출처를 알 수 없어 임시 그림으로 대신해요) */
  imageLabel?: string;
  footer?: ReactNode;
};

/** 키워드림톡의 흰 카드 (피드 글, 수급자 소식 공통) */
export function TalkCard({ avatar, title, time, badge, text, imageLabel, footer }: TalkCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        {avatar}
        <View style={styles.headText}>
          <AppText size="bodyLarge" weight="semibold">
            {title}
          </AppText>
          <AppText size="small" color={Colors.textMuted}>
            {time}
          </AppText>
        </View>
        <View style={styles.badge}>
          <AppText size="caption" weight="bold">
            {badge}
          </AppText>
        </View>
      </View>

      <AppText size="body" weight="medium" style={styles.text}>
        {text}
      </AppText>

      {imageLabel && (
        <View style={styles.image} accessibilityLabel={`${imageLabel} 사진 자리`}>
          <MaterialCommunityIcons name="image-filter-hdr" size={44} color={Colors.primarySoft} />
          <AppText size="caption" color={Colors.textMuted}>
            {imageLabel}
          </AppText>
        </View>
      )}

      {footer}
    </View>
  );
}

/** 동그란 채널/사람 아바타 */
export function TalkAvatar({
  icon,
  color,
  size = 56,
}: {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  size?: number;
}) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      {icon ? (
        <MaterialCommunityIcons name={icon} size={size * 0.55} color={Colors.white} />
      ) : (
        <Ionicons name="person" size={size * 0.55} color={Colors.white} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.md,
    padding: Spacing.xl,
    borderRadius: 24,
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headText: {
    flex: 1,
    gap: 2,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.highlight,
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  text: {
    lineHeight: 24,
  },
  image: {
    height: 190,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.surface,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
