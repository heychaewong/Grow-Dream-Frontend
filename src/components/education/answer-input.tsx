import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors, FontFamily, FontSize } from '@/constants/theme';

type AnswerInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  /** 채점 후 틀렸으면 빨간 테두리 */
  wrong?: boolean;
  width?: number;
};

/** 연두색 "✎ 답변 작성하기" 입력칸 */
export function AnswerInput({ value, onChangeText, editable = true, wrong, width = 150 }: AnswerInputProps) {
  return (
    <View style={[styles.box, { width }, wrong && styles.wrong]}>
      <Ionicons name="create-outline" size={16} color={Colors.textSub} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder="답변 작성하기"
        placeholderTextColor={Colors.textMuted}
        style={styles.input}
        returnKeyType="done"
        accessibilityLabel="답변 입력"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    paddingHorizontal: 8,
    height: 28,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: Colors.quizGreenSoft,
  },
  wrong: {
    borderColor: Colors.wrong,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    textAlign: 'center',
    fontFamily: FontFamily.medium,
    fontSize: FontSize.small,
    color: Colors.text,
    outlineWidth: 0,
  },
});
