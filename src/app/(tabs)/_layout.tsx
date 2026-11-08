import { Tabs } from 'expo-router/tabs';

import { BottomTabBar } from '@/components/bottom-tab-bar';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="my" />
    </Tabs>
  );
}
