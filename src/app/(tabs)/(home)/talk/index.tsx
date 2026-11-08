import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TalkAvatar, TalkCard } from '@/components/talk/talk-card';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { recipients } from '@/data/funding';
import { channels, feedPosts } from '@/data/talk';
import { useFundingStore } from '@/store/funding-store';

export default function TalkMainScreen() {
  const { sponsorships } = useFundingStore();
  const [channel, setChannel] = useState<string | null>(null);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const sponsored = sponsorships
    .map((s) => recipients.find((r) => r.id === s.recipientId))
    .filter((r): r is NonNullable<typeof r> => !!r);

  const posts = feedPosts.filter((p) => !channel || p.channelId === channel);
  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="키워드림톡" />

      {/* 채널 띠 */}
      <View style={styles.band}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.channels}>
          {channels.map((c) => (
            <ChannelTile
              key={c.id}
              label={c.name}
              active={channel === c.id}
              onPress={() => setChannel((cur) => (cur === c.id ? null : c.id))}>
              <MaterialCommunityIcons
                name={c.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={44}
                color={c.iconColor}
              />
            </ChannelTile>
          ))}
          {sponsored.map((r) => (
            <ChannelTile
              key={r.id}
              label={r.name}
              onPress={() => router.push({ pathname: '/talk/[recipientId]', params: { recipientId: r.id } })}>
              <TalkAvatar color={Colors.primarySoft} size={56} />
            </ChannelTile>
          ))}
          <ChannelTile label="추가" onPress={() => router.push('/funding/donate')}>
            <Ionicons name="add-circle-outline" size={40} color={Colors.text} />
          </ChannelTile>
        </ScrollView>
      </View>

      <ScrollView style={styles.feed} contentContainerStyle={styles.feedContent} showsVerticalScrollIndicator={false}>
        {channel && (
          <Pressable onPress={() => setChannel(null)} style={styles.filterNotice} accessibilityRole="button">
            <AppText size="small" color={Colors.textSub}>
              {channels.find((c) => c.id === channel)?.name} 소식만 보는 중 · 전체 보기
            </AppText>
            <Ionicons name="close" size={14} color={Colors.textSub} />
          </Pressable>
        )}

        {posts.map((post) => {
          const c = channels.find((x) => x.id === post.channelId)!;
          const isLiked = liked.includes(post.id);
          const isSaved = saved.includes(post.id);
          return (
            <TalkCard
              key={post.id}
              avatar={
                <TalkAvatar
                  icon={c.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  color={c.iconColor}
                />
              }
              title={c.title}
              time={post.time}
              badge="팔로우중"
              text={post.text}
              imageLabel={post.imageLabel}
              footer={
                <View style={styles.actions}>
                  <ActionIcon
                    icon={isLiked ? 'heart' : 'heart-outline'}
                    color={isLiked ? Colors.wrong : Colors.text}
                    count={post.likes + (isLiked ? 1 : 0)}
                    label="좋아요"
                    onPress={() => toggle(liked, setLiked, post.id)}
                  />
                  <ActionIcon
                    icon={isSaved ? 'bookmark' : 'bookmark-outline'}
                    color={Colors.text}
                    count={post.saves + (isSaved ? 1 : 0)}
                    label="저장"
                    onPress={() => toggle(saved, setSaved, post.id)}
                  />
                  <Pressable
                    onPress={() => Share.share({ message: post.text }).catch(() => {})}
                    style={styles.share}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="공유">
                    <Ionicons name="share-social-outline" size={22} color={Colors.text} />
                  </Pressable>
                </View>
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function ChannelTile({
  label,
  children,
  onPress,
  active,
}: {
  label: string;
  children: ReactNode;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tileColumn} accessibilityRole="button" accessibilityLabel={label}>
      <View style={[styles.tile, active && styles.tileActive]}>{children}</View>
      <AppText size="body" weight="bold">
        {label}
      </AppText>
    </Pressable>
  );
}

function ActionIcon({
  icon,
  color,
  count,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  count: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.action} accessibilityRole="button" accessibilityLabel={`${label} ${count}`}>
      <Ionicons name={icon} size={24} color={color} />
      <AppText size="small" color={Colors.textSub}>
        {count.toLocaleString('ko-KR')}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  band: {
    marginTop: Spacing.md,
    backgroundColor: Colors.talkBand,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },
  channels: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  tileColumn: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tile: {
    width: 76,
    height: 76,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tileActive: {
    borderColor: Colors.mustard,
  },
  feed: {
    backgroundColor: Colors.talkCream,
  },
  feedContent: {
    gap: Spacing.xl,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  filterNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.white,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.xs,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  share: {
    marginLeft: 'auto',
  },
});
