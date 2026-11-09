import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { BoardPreview } from '@/data/home';

type BoardPreviewCardProps = {
  post: BoardPreview;
  onPress: () => void;
};

/** 커뮤니티 게시판 미리보기 카드 */
export function BoardPreviewCard({ post, onPress }: BoardPreviewCardProps) {
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
        <Ionicons name="chevron-forward" size={22} color={Colors.textMuted} />
      </View>

      <View style={styles.body}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={26} color={Colors.white} />
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
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  texts: {
    flex: 1,
    gap: 4,
  },
  time: {
    alignSelf: 'flex-end',
  },
});
