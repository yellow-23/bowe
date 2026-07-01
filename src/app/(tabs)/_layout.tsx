import { Slot } from 'expo-router';
import { View } from 'react-native';

import { BottomBar } from '@/shared/components/BottomBar';

export default function TabsLayout() {
  return (
    <View className="flex-1 bg-cream">
      <Slot />
      <BottomBar />
    </View>
  );
}
