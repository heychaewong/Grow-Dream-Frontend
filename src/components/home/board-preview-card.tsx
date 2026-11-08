import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { BoardPreview } from '@/data/home';

/** 테두리는 모두 브랜드 초록으로 통일하고, 아바타 색만 게시판별로 달라요. */
const AVATAR_COLORS = {
  green: Colors.primary,
  yellow: Colors.yellow,
} as const;

type BoardPreviewCardProps = {
  post: BoardPreview;
  onPress: () => void;
};

/** 커뮤니티 게시판 미리보기 카드 */
export function BoardPreviewCard({ post, onPress }: BoardPreviewCardProps) {
  const avatarColor = AVATAR_COLORS[post.tone];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${post.board} 게시판으로 이동`}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
      <View style={styles.titleRow}>
        <AppText size="bodyLarge" weight="bold">
          {post.board}
        </AppText>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </View>

      <View style={styles.body}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Ionicons name="person" size={24} color={Colors.white} />
        </View>
        <View style={styles.texts}>
          <AppText size="body" weight="semibold">
            {post.author}
          </AppText>
          <AppText size="body" numberOfLines={1}>
            {post.content}
          </AppText>
        </View>
        <AppText size="small" weight="medium" color={Colors.textSub} style={styles.time}>
          {post.time}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingLeft: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 4,
  },
  time: {
    alignSelf: 'flex-end',
  },
});
