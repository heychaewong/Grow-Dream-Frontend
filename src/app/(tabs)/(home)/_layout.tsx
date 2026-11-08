import { Stack } from 'expo-router';

import { Colors } from '@/constants/theme';

/** 홈 탭 안의 화면들(경제교육 등)은 하단 탭을 유지한 채 쌓여요. */
export default function HomeStackLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }} />;
}
