import { Stack } from 'expo-router';

import '@/global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      {/* goal/[id], crear, rescate are added here once those routes exist */}
    </Stack>
  );
}
