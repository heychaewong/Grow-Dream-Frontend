import { Fragment } from 'react';
import { StyleSheet, type TextStyle } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

import { AppText, type AppTextProps } from './app-text';

type Segment = { text: string; bold?: boolean; mark?: boolean };

/** "**굵게**", "==형광펜==" 표시를 잘라서 조각으로 만들어요. */
export function parseRichText(input: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /(\*\*[^*]+\*\*|==[^=]+==)/g;
  let lastIndex = 0;
  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) segments.push({ text: input.slice(lastIndex, index) });
    const token = match[0];
    if (token.startsWith('**')) segments.push({ text: token.slice(2, -2), bold: true });
    else segments.push({ text: token.slice(2, -2), mark: true });
    lastIndex = index + token.length;
  }
  if (lastIndex < input.length) segments.push({ text: input.slice(lastIndex) });
  return segments;
}

type RichTextProps = Omit<AppTextProps, 'children'> & {
  children: string;
  markStyle?: TextStyle;
};

export function RichText({ children, markStyle, ...rest }: RichTextProps) {
  return (
    <AppText {...rest}>
      {parseRichText(children).map((seg, i) => (
        <Fragment key={i}>
          {seg.bold ? (
            <AppText {...rest} weight="bold" style={undefined}>
              {seg.text}
            </AppText>
          ) : seg.mark ? (
            <AppText {...rest} weight="bold" color={Colors.white} style={[styles.mark, markStyle]}>
              {seg.text}
            </AppText>
          ) : (
            seg.text
          )}
        </Fragment>
      ))}
    </AppText>
  );
}

const styles = StyleSheet.create({
  mark: {
    backgroundColor: Colors.quizGreen,
    fontFamily: FontFamily.bold,
  },
});
