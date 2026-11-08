import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { Checkbox, Radio } from '@/components/ui/radio';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';
import { TERMS } from '@/data/funding';
import { currentUser } from '@/data/user';
import { useFundingStore } from '@/store/funding-store';

const INTRO_MAX = 300;

export default function PersonalApplyScreen() {
  const { personalApplied, submitPersonalApplication } = useFundingStore();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'남' | '여' | null>(null);
  const [birth, setBirth] = useState({ year: '2004', month: '', day: '' });
  const [profileAttached, setProfileAttached] = useState(false);
  const [photoAttached, setPhotoAttached] = useState(false);
  const [agreed, setAgreed] = useState<string[]>([]);
  const [intro, setIntro] = useState('');
  const [termOpen, setTermOpen] = useState<string | null>(null);
  const [doneVisible, setDoneVisible] = useState(false);

  const birthValid =
    /^\d{4}$/.test(birth.year) && Number(birth.month) >= 1 && Number(birth.month) <= 12 && Number(birth.day) >= 1 && Number(birth.day) <= 31;
  const allAgreed = TERMS.every((t) => agreed.includes(t.id));
  const canSubmit = name.trim() !== '' && gender !== null && birthValid && profileAttached && allAgreed;

  const toggleTerm = (id: string) =>
    setAgreed((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const submit = () => {
    submitPersonalApplication();
    setDoneVisible(true);
  };

  const missing = [
    !name.trim() && '이름',
    !gender && '성별',
    !birthValid && '생년월일',
    !profileAttached && '마이페이지 업로드',
    !allAgreed && '필수 약관 동의',
  ].filter(Boolean);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="개인 후원 신청하기" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {personalApplied && (
          <View style={styles.notice}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
            <AppText size="small" weight="semibold" color={Colors.primary}>
              이미 신청했어요. 다시 제출하면 내용이 수정돼요.
            </AppText>
          </View>
        )}

        <SectionTitle>기본 정보 작성</SectionTitle>
        <Row>
          <AppText size="body" style={styles.label}>
            이름
          </AppText>
          <Field value={name} onChangeText={setName} style={styles.nameField} accessibilityLabel="이름" />
          <AppText size="body" style={styles.genderLabel}>
            성별
          </AppText>
          <Radio label="남" selected={gender === '남'} onPress={() => setGender('남')} />
          <Radio label="여" selected={gender === '여'} onPress={() => setGender('여')} />
        </Row>
        <Row>
          <AppText size="body" style={styles.label}>
            생년월일
          </AppText>
          <Field
            value={birth.year}
            onChangeText={(year) => setBirth((b) => ({ ...b, year }))}
            placeholder="년"
            keyboardType="number-pad"
            maxLength={4}
            style={[styles.birthField, styles.birthYear]}
            accessibilityLabel="태어난 해"
          />
          <Field
            value={birth.month}
            onChangeText={(month) => setBirth((b) => ({ ...b, month }))}
            placeholder="월"
            keyboardType="number-pad"
            maxLength={2}
            style={styles.birthField}
            accessibilityLabel="태어난 달"
          />
          <Field
            value={birth.day}
            onChangeText={(day) => setBirth((b) => ({ ...b, day }))}
            placeholder="일"
            keyboardType="number-pad"
            maxLength={2}
            style={styles.birthField}
            accessibilityLabel="태어난 날"
          />
        </Row>
        <Row align="flex-start">
          <AppText size="body" style={styles.label}>
            마이페이지{'\n'}업로드
          </AppText>
          <Pressable
            onPress={() => setProfileAttached((a) => !a)}
            style={[styles.upload, profileAttached && styles.uploadDone]}
            accessibilityRole="button"
            accessibilityLabel={profileAttached ? '마이페이지 첨부 취소' : '마이페이지 첨부하기'}>
            {profileAttached ? (
              <>
                <Ionicons name="person-circle" size={36} color={Colors.primary} />
                <AppText size="small" weight="bold">
                  {currentUser.name} 님의 마이페이지
                </AppText>
                <AppText size="caption" color={Colors.textMuted}>
                  꿈 · 경제교육 진도 · 진로 로드맵이 함께 공개돼요
                </AppText>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="folder-upload-outline" size={28} color={Colors.textMuted} />
                <AppText size="caption" color={Colors.textMuted}>
                  클릭하여 업로드하기
                </AppText>
              </>
            )}
          </Pressable>
        </Row>

        <SectionTitle>약관 동의</SectionTitle>
        <View style={styles.terms}>
          {TERMS.map((t) => (
            <View key={t.id} style={styles.termRow}>
              <Checkbox label={t.label} checked={agreed.includes(t.id)} onPress={() => toggleTerm(t.id)} />
              <Pressable onPress={() => setTermOpen(t.label)} hitSlop={8} accessibilityRole="link">
                <AppText size="small" color={Colors.blue} style={styles.link}>
                  보기
                </AppText>
              </Pressable>
            </View>
          ))}
        </View>

        <SectionTitle>자기 PR ⭐</SectionTitle>
        <Row>
          <AppText size="body">(선택) 사진 업로드</AppText>
          <Pressable
            onPress={() => setPhotoAttached((a) => !a)}
            style={styles.fileButton}
            accessibilityRole="button">
            <Ionicons name={photoAttached ? 'image' : 'share-outline'} size={14} color={Colors.white} />
            <AppText size="caption" weight="semibold" color={Colors.white}>
              {photoAttached ? '사진 1장 선택됨' : '파일선택'}
            </AppText>
          </Pressable>
        </Row>
        <View style={styles.introBlock}>
          <AppText size="body">자신을 한 줄로 소개한다면?</AppText>
          <View style={styles.textareaBox}>
            <TextInput
              value={intro}
              onChangeText={(t) => setIntro(t.slice(0, INTRO_MAX))}
              multiline
              placeholder="예) 세상의 아름다움을 디자인하는 헤어 디자이너가 되고 싶어요."
              placeholderTextColor={Colors.textMuted}
              style={styles.textarea}
              accessibilityLabel="한 줄 소개"
            />
            <AppText size="caption" color={Colors.textMuted} style={styles.counter}>
              ( {intro.length} / {INTRO_MAX} )
            </AppText>
          </View>
        </View>

        <Pressable
          onPress={submit}
          disabled={!canSubmit}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSubmit }}
          style={({ pressed }) => [styles.submit, (!canSubmit || pressed) && { opacity: 0.5 }]}>
          <AppText size="bodyLarge" weight="bold" color={Colors.white}>
            신청하기
          </AppText>
        </Pressable>
        {!canSubmit && (
          <AppText size="caption" color={Colors.textMuted} style={styles.center}>
            {missing.join(', ')}을(를) 완료해 주세요.
          </AppText>
        )}
      </ScrollView>

      <AppModal visible={termOpen !== null} onClose={() => setTermOpen(null)} showClose cardStyle={styles.termModal}>
        <AppText size="bodyLarge" weight="bold" style={styles.termTitle}>
          {termOpen}
        </AppText>
        <AppText size="small" color={Colors.textSub}>
          키워드림은 후원 연결을 위해 이름, 생년월일, 성별, 마이페이지 정보를 수집하며, 후원 기간이 끝나면 관련 법령에
          따라 안전하게 파기합니다. (데모용 예시 문구예요)
        </AppText>
      </AppModal>

      <AppModal visible={doneVisible} onClose={() => router.back()} cardStyle={styles.doneModal}>
        <Ionicons name="checkmark-circle" size={56} color={Colors.primary} />
        <AppText size="title" weight="bold">
          신청이 완료되었어요
        </AppText>
        <AppText size="small" color={Colors.textSub} style={styles.center}>
          키워드림이 활동 내역과 자기 PR을 확인한 뒤{'\n'}정기후원 수급자 목록에 올려 드릴게요.
        </AppText>
        <Pressable onPress={() => router.back()} style={styles.doneButton} accessibilityRole="button">
          <AppText size="body" weight="bold" color={Colors.white}>
            확인
          </AppText>
        </Pressable>
      </AppModal>
    </SafeAreaView>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <AppText size="title" weight="bold" style={styles.sectionTitle}>
      {children}
    </AppText>
  );
}

function Row({ children, align = 'center' }: { children: ReactNode; align?: 'center' | 'flex-start' }) {
  return <View style={[styles.row, { alignItems: align }]}>{children}</View>;
}

function Field(props: TextInputProps) {
  return <TextInput placeholderTextColor={Colors.textMuted} {...props} style={[styles.field, props.style]} />;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  center: { textAlign: 'center' },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryTint,
  },
  sectionTitle: {
    marginTop: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primarySoft,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primarySoft,
  },
  label: {
    width: 80,
  },
  genderLabel: {
    marginLeft: Spacing.md,
  },
  field: {
    height: 30,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small,
    color: Colors.text,
  },
  nameField: {
    flex: 1,
    minWidth: 80,
  },
  birthField: {
    width: 70,
    textAlign: 'center',
  },
  birthYear: {
    backgroundColor: Colors.primaryTint,
  },
  upload: {
    flex: 1,
    minHeight: 126,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
  },
  uploadDone: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryTint,
  },
  terms: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    textDecorationLine: 'underline',
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
  },
  introBlock: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  textareaBox: {
    minHeight: 100,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
  },
  textarea: {
    flex: 1,
    minHeight: 60,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  counter: {
    alignSelf: 'flex-end',
  },
  submit: {
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryDark,
  },
  termModal: {
    padding: Spacing.xl,
    paddingTop: 0,
    gap: Spacing.md,
  },
  termTitle: {
    marginTop: -Spacing.sm,
  },
  doneModal: {
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  doneButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryDark,
  },
});
