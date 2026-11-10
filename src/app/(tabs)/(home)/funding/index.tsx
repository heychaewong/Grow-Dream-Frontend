import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroSlides } from '@/components/funding/hero-slides';
import { AppModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { Radio } from '@/components/ui/radio';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { fundingFeatures } from '@/data/funding';

/** 형광펜 강조가 들어간 제목 한 줄 */
function MarkedTitle({ before, mark, after }: { before: string; mark: string; after: string }) {
  return (
    <AppText size="title" weight="bold" style={styles.markedTitle}>
      {before}
      <AppText size="title" weight="bold" style={styles.mark}>
        {mark}
      </AppText>
      {after}
    </AppText>
  );
}

export default function FundingMainScreen() {
  const [typeModal, setTypeModal] = useState(false);

  const chooseType = (type: 'personal' | 'company') => {
    setTypeModal(false);
    router.push(type === 'personal' ? '/funding/apply-personal' : '/funding/apply-company');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="펀딩" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <MarkedTitle before="지금, " mark="대한민국 청년" after="들은" />
        <HeroSlides />

        <MarkedTitle before="키워드림의 " mark="후원자" after="가 되어 주세요" />
        <View style={styles.features}>
          {fundingFeatures.map((f) => (
            <View key={f.title} style={styles.feature}>
              <View style={styles.featureIcon}>
                <MaterialCommunityIcons name={f.icon} size={48} color={Colors.primary} />
              </View>
              <AppText size="body" weight="bold">
                {f.title}
              </AppText>
              <AppText size="small" style={styles.center}>
                {f.description}
              </AppText>
            </View>
          ))}
        </View>

        <View style={styles.cta}>
          <AppText size="title" weight="bold" style={styles.center}>
            혼자 해낸 과거에서{'\n'}함께 갈 미래로
          </AppText>
          <View style={styles.ctaButtons}>
            <CtaButton label="후원 신청하기" onPress={() => setTypeModal(true)} />
            <CtaButton label="정기후원하기" onPress={() => router.push('/funding/donate')} />
          </View>
        </View>
      </ScrollView>

      <AppModal visible={typeModal} onClose={() => setTypeModal(false)} cardStyle={styles.modal}>
        <AppText size="title" weight="bold">
          후원 신청하기
        </AppText>
        <AppText size="body" style={styles.modalSub}>
          후원 유형을 선택하세요
        </AppText>
        <View style={styles.options}>
          <Radio label="개인 후원 신청하기" selected={false} onPress={() => chooseType('personal')} />
          <Radio label="기업 대상 교육 펀딩 신청하기" selected={false} onPress={() => chooseType('company')} />
        </View>
      </AppModal>
    </SafeAreaView>
  );
}

function CtaButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.85 }]}>
      <AppText size="bodyLarge" weight="bold" color={Colors.white}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  center: { textAlign: 'center' },
  scroll: { gap: Spacing.lg },
  markedTitle: {
    paddingHorizontal: Spacing.xxl,
    marginTop: Spacing.sm,
  },
  mark: {
    backgroundColor: Colors.highlight,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.sm,
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  cta: {
    gap: Spacing.lg,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.mint,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  ctaButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryDark,
  },
  modal: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  modalSub: {
    marginTop: Spacing.sm,
  },
  options: {
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
});
