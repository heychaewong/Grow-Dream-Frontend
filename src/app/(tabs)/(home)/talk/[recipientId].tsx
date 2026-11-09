import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TalkAvatar, TalkCard } from '@/components/talk/talk-card';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';
import { recipients } from '@/data/funding';
import { letters } from '@/data/talk';
import { useFundingStore } from '@/store/funding-store';

type MyMessage = { id: string; text: string };

/** 후원자와 수급자가 소식을 주고받는 화면 */
export default function SponsorChatScreen() {
  const { recipientId } = useLocalSearchParams<{ recipientId: string }>();
  const recipient = recipients.find((r) => r.id === recipientId);
  const { isSponsoring } = useFundingStore();
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<MyMessage[]>([]);
  const scrollRef = useRef<ScrollViewInstance>(null);
  // 메시지를 보냈을 때만 맨 아래로 내려가요 (처음 열 때는 위에서부터 읽게).
  const scrollOnNextLayout = useRef(false);

  if (!recipient) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="후원자와 대화" />
        <AppText style={styles.empty}>대화 상대를 찾을 수 없어요.</AppText>
      </SafeAreaView>
    );
  }

  const sponsoring = isSponsoring(recipient.id);
  const list = letters.filter((l) => l.recipientId === recipient.id);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    scrollOnNextLayout.current = true;
    setSent((s) => [...s, { id: String(Date.now()), text }]);
    setDraft('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="후원자와 대화" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.band} />
        <ScrollView
          ref={scrollRef}
          style={styles.feed}
          contentContainerStyle={styles.feedContent}
          onContentSizeChange={() => {
            if (!scrollOnNextLayout.current) return;
            scrollOnNextLayout.current = false;
            scrollRef.current?.scrollToEnd({ animated: true });
          }}>
          {list.length === 0 && (
            <AppText size="body" color={Colors.textMuted} style={styles.empty}>
              아직 {recipient.name} 님의 소식이 없어요.
            </AppText>
          )}
          {list.map((l) => (
            <TalkCard
              key={l.id}
              avatar={<TalkAvatar color={Colors.primarySoft} />}
              title={recipient.name}
              time={l.time}
              badge={sponsoring ? '후원중' : '소식'}
              text={l.text}
              imageLabel={l.imageLabel}
            />
          ))}

          {sent.map((m) => (
            <View key={m.id} style={styles.myMessage}>
              <AppText size="small" weight="semibold" color={Colors.primary}>
                나의 응원 메시지
              </AppText>
              <AppText size="body">{m.text}</AppText>
            </View>
          ))}
        </ScrollView>

        {sponsoring ? (
          <View style={styles.composer}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={send}
              placeholder={`${recipient.name} 님에게 응원 메시지 보내기`}
              placeholderTextColor={Colors.textMuted}
              style={styles.input}
              returnKeyType="send"
              accessibilityLabel="응원 메시지 입력"
            />
            <Pressable
              onPress={send}
              disabled={!draft.trim()}
              style={[styles.sendButton, !draft.trim() && { opacity: 0.4 }]}
              accessibilityRole="button"
              accessibilityLabel="보내기">
              <Ionicons name="send" size={18} color={Colors.white} />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => router.push('/funding/donate')} style={styles.cta} accessibilityRole="button">
            <AppText size="body" weight="bold" color={Colors.white}>
              후원하고 응원 메시지 보내기
            </AppText>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  band: {
    height: 28,
    marginTop: Spacing.md,
    backgroundColor: Colors.talkBand,
  },
  feed: {
    backgroundColor: Colors.talkCream,
  },
  feedContent: {
    gap: Spacing.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
  myMessage: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
    gap: 4,
    padding: Spacing.lg,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.primaryTint,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    height: 42,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.text,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  cta: {
    alignItems: 'center',
    margin: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryDark,
  },
});
