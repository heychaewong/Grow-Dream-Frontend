import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { BoardPreview } from '@/data/home';

const TONES = {
  green: { border: Colors.primary, avatar: Colors.primary },
  yellow: { border: Colors.yellow, avatar: Colors.yellow },
} as const;

type BoardPreviewCardProps = {
  post: BoardPreview;
  onPress: () => void;
};

/** 커뮤니티 게시판 미리보기 카드 */
export function BoardPreviewCard({ post, onPress }: BoardPreviewCardProps) {
  const tone = TONES[post.tone];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${post.board} 게시판으로 이동`}
      style={({ pressed }) => [styles.card, { borderColor: tone.border }, pressed && { opacity: 0.7 }]}>
      <View style={styles.titleRow}>
        <AppText size="body" weight="bold">
          {post.board}
        </AppText>
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      </View>

      <View style={styles.body}>
        <View style={[styles.avatar, { backgroundColor: tone.avatar }]}>
          <Ionicons name="person" size={22} color={Colors.white} />
        </View>
        <View style={styles.texts}>
          <AppText size="small" weight="medium">
            {post.author}
          </AppText>
          <AppText size="small" numberOfLines={1}>
            {post.content}
          </AppText>
        </View>
        <AppText size="caption" weight="medium" color={Colors.textSub} style={styles.time}>
          {post.time}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
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
    width: 36,
    height: 36,
    borderRadius: 18,
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
