import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BoardPreviewCard } from '@/components/home/board-preview-card';
import { HomeHeader } from '@/components/home/home-header';
import { QuickMenu, type QuickMenuItem } from '@/components/home/quick-menu';
import { TodayQuestionBanner } from '@/components/home/today-question-banner';
import { HighlightTitle } from '@/components/ui/highlight-title';
import { Colors, Spacing } from '@/constants/theme';
import { boardPreviews, todayQuestion } from '@/data/home';

const QUICK_MENU: QuickMenuItem[] = [
  { label: '경제교육', icon: 'cash-outline', iconColor: Colors.primary, href: '/education' },
  { label: '진로 로드맵', icon: 'git-network-outline', iconColor: Colors.blue, href: '/roadmap' },
  { label: '펀딩', icon: 'bulb-outline', iconColor: Colors.coin, href: '/funding' },
  { label: '키워드림톡', icon: 'phone-portrait-outline', iconColor: Colors.blue, href: '/talk' },
];

const comingSoon = (title: string) => router.push({ pathname: '/coming-soon', params: { title } });

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <HomeHeader />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TodayQuestionBanner {...todayQuestion} onPressAnswer={() => comingSoon('오늘의 질문')} />

        <View style={styles.menu}>
          <QuickMenu items={QUICK_MENU} />
        </View>

        <View style={styles.community}>
          <HighlightTitle style={styles.communityTitle}>커뮤니티</HighlightTitle>
          {boardPreviews.map((post) => (
            <BoardPreviewCard key={post.id} post={post} onPress={() => comingSoon(post.board)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    paddingBottom: Spacing.xxl,
  },
  menu: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  community: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  communityTitle: {
    marginBottom: Spacing.xs,
  },
});
