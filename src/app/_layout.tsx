import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppMaxWidth, Colors, FontSources } from '@/constants/theme';
import { AppStoreProvider } from '@/store/app-store';
import { RoadmapStoreProvider } from '@/store/roadmap-store';

SplashScreen.preventAutoHideAsync();

// 웹에서 입력칸을 누르면 생기는 브라우저 기본 테두리를 없애요 (디자인에 없는 요소).
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = 'input:focus, textarea:focus { outline: none; }';
  document.head.appendChild(style);
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(FontSources);

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <RoadmapStoreProvider>
          <StatusBar style="dark" />
          {/* 웹에서 넓은 화면으로 열어도 폰 화면 폭으로 보이도록 가운데 정렬 */}
          <View style={styles.outer}>
            <View style={styles.app}>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }} />
            </View>
          </View>
        </RoadmapStoreProvider>
      </AppStoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  app: {
    flex: 1,
    width: '100%',
    maxWidth: AppMaxWidth,
    backgroundColor: Colors.white,
  },
});
