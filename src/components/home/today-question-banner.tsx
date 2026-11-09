import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';

type TodayQuestionBannerProps = {
  number: number;
  highlight: string;
  rest: string;
  /** 저장된 답변. 없으면 빈 문자열이에요. */
  answer: string;
  onSubmitAnswer: (answer: string) => void;
};

const RING_COUNT = 3;
const MAX_LENGTH = 100;

/** 스프링 노트 모양의 "오늘의 질문" 배너. 화면 이동 없이 이 자리에서 바로 답변을 써요. */
export function TodayQuestionBanner({ number, highlight, rest, answer, onSubmitAnswer }: TodayQuestionBannerProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(answer);

  const startEditing = () => {
    setDraft(answer);
    setEditing(true);
  };

  const save = () => {
    onSubmitAnswer(draft.trim());
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* 노트 스프링 고리 */}
      <View style={styles.rings} pointerEvents="none">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <View key={i} style={styles.ringRow}>
            <View style={styles.wire} />
            <View style={styles.ring} />
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.question}>
          <AppText size="bodyLarge" weight="medium">
            No.{String(number).padStart(2, '0')}
          </AppText>
          <AppText size="bodyLarge" style={styles.flex}>
            <AppText size="bodyLarge" weight="bold">
              {highlight}
            </AppText>
            {rest}
          </AppText>
        </View>

        {editing ? (
          <View style={styles.editor}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              autoFocus
              multiline
              maxLength={MAX_LENGTH}
              placeholder="나의 생각을 자유롭게 적어 보세요"
              placeholderTextColor={Colors.textMuted}
              style={styles.input}
              accessibilityLabel="오늘의 질문 답변 입력"
            />
            <View style={styles.editorFooter}>
              <AppText size="small" color={Colors.textMuted}>
                {draft.length}/{MAX_LENGTH}
              </AppText>
              <View style={styles.editorButtons}>
                <Pressable onPress={() => setEditing(false)} hitSlop={8} accessibilityRole="button">
                  <AppText size="body" weight="medium" color={Colors.textMuted}>
                    취소
                  </AppText>
                </Pressable>
                <Pressable
                  onPress={save}
                  disabled={!draft.trim()}
                  style={[styles.saveButton, !draft.trim() && { opacity: 0.4 }]}
                  accessibilityRole="button">
                  <AppText size="body" weight="bold" color={Colors.white}>
                    등록
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        ) : answer ? (
          <View style={styles.answerBox}>
            <AppText size="bodyLarge" style={styles.answerText}>
              {answer}
            </AppText>
            <Pressable onPress={startEditing} hitSlop={8} style={styles.answerLink} accessibilityRole="button">
              <Ionicons name="create-outline" size={18} color={Colors.textMuted} />
              <AppText size="body" color={Colors.textMuted}>
                답변 수정하기
              </AppText>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={startEditing}
            accessibilityRole="button"
            style={({ pressed }) => [styles.answerLink, pressed && { opacity: 0.6 }]}>
            <Ionicons name="create-outline" size={20} color={Colors.textMuted} />
            <AppText size="bodyLarge" color={Colors.textMuted}>
              답변 작성하기
            </AppText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 204,
    backgroundColor: Colors.cream,
    overflow: 'hidden',
  },
  flex: { flex: 1 },
  rings: {
    width: 46,
    paddingTop: 16,
    gap: 52,
  },
  ringRow: {
    height: 23,
    justifyContent: 'center',
  },
  wire: {
    position: 'absolute',
    left: 0,
    width: 34,
    height: 13,
    borderRadius: 6,
    backgroundColor: Colors.surface,
  },
  ring: {
    marginLeft: 21,
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: Spacing.xl,
    paddingRight: Spacing.xl,
    paddingLeft: Spacing.lg,
    gap: Spacing.lg,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  answerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: Spacing.sm,
    alignSelf: 'flex-start',
  },
  editor: {
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
  },
  input: {
    minHeight: 72,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.bodyLarge,
    lineHeight: Math.round(FontSize.bodyLarge * 1.4),
    color: Colors.text,
    textAlignVertical: 'top',
    outlineWidth: 0,
  },
  editorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editorButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  saveButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
  answerBox: {
    gap: Spacing.md,
    marginLeft: Spacing.sm,
  },
  answerText: {
    // 노트에 적은 것처럼 밑줄을 그어요.
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mustard,
  },
});
