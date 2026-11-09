import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

const HEIGHT = 206;

/** 펀딩 메인 상단의 넘겨 보는 배너 */
export function HeroSlides() {
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);
  const slides = [<StatSlide key="stat" />, <UsageSlide key="usage" />, <TogetherSlide key="together" />];

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width) setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View onLayout={onLayout}>
      {width > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={32}
          accessibilityLabel="펀딩 소개 배너">
          {slides.map((slide, i) => (
            <View key={i} style={{ width, height: HEIGHT }}>
              {slide}
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.pager}>
        <AppText size="small" weight="bold" color={Colors.white}>
          {page + 1} / {slides.length}
        </AppText>
      </View>
    </View>
  );
}

/** Figma 원본 슬라이드: 고립·은둔 청년 통계 */
function StatSlide() {
  return (
    <View style={styles.slide}>
      <View style={styles.statArea}>
        <View style={[styles.circle, styles.smallCircle]}>
          <AppText size="bodyLarge" weight="bold">
            4.7%
          </AppText>
          <AppText size="caption" weight="semibold">
            약 220만명
          </AppText>
        </View>
        <MaterialCommunityIcons name="arrow-right-bold" size={40} color={Colors.coin} style={styles.arrow} />
        <View style={[styles.circle, styles.bigCircle]}>
          <AppText size="title" weight="bold">
            6.0%
          </AppText>
          <AppText size="small" weight="semibold">
            약 280만명
          </AppText>
        </View>
      </View>
      <View style={styles.statPanel}>
        <AppText size="caption" color={Colors.white} style={styles.panelText}>
          코로나 이후,{'\n'}고립·은둔 청년의{'\n'}숫자가
        </AppText>
        <AppText size="body" weight="bold" color={Colors.white} style={styles.center}>
          “약 54만명”{'\n'}증가하며
        </AppText>
        <AppText size="caption" color={Colors.white} style={styles.panelText}>
          새로운 사회 문제로{'\n'}떠오르고 있습니다
        </AppText>
      </View>
    </View>
  );
}

function UsageSlide() {
  const items = [
    { icon: 'school-outline' as const, label: '경제·진로 교육' },
    { icon: 'certificate-outline' as const, label: '자격증 응시료' },
    { icon: 'home-heart' as const, label: '자립 생활비' },
  ];
  return (
    <View style={[styles.slide, styles.messageSlide]}>
      <AppText size="title" weight="bold" color={Colors.white}>
        후원금은 이렇게 쓰여요
      </AppText>
      <View style={styles.usageRow}>
        {items.map((item) => (
          <View key={item.label} style={styles.usageItem}>
            <View style={styles.usageIcon}>
              <MaterialCommunityIcons name={item.icon} size={30} color={Colors.primaryDark} />
            </View>
            <AppText size="small" weight="semibold" color={Colors.white}>
              {item.label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

function TogetherSlide() {
  return (
    <View style={[styles.slide, styles.messageSlide]}>
      <MaterialCommunityIcons name="hand-heart" size={48} color={Colors.highlight} />
      <AppText size="title" weight="bold" color={Colors.white} style={styles.center}>
        한 사람의 꿈이 자라는 과정을{'\n'}가장 가까이에서 함께해요
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  slide: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.heroGray,
  },
  statArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  smallCircle: {
    width: 78,
    height: 78,
    marginTop: 60,
    backgroundColor: Colors.borderLight,
  },
  bigCircle: {
    width: 110,
    height: 110,
    marginBottom: 40,
    backgroundColor: Colors.divider,
  },
  arrow: {
    marginHorizontal: -8,
    zIndex: 1,
    transform: [{ rotate: '-25deg' }],
  },
  statPanel: {
    width: 140,
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.primaryDark,
  },
  panelText: {
    lineHeight: 19,
  },
  messageSlide: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    backgroundColor: Colors.primaryDark,
  },
  usageRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  usageItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  usageIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mint,
  },
  pager: {
    alignSelf: 'center',
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primaryDark,
  },
});
