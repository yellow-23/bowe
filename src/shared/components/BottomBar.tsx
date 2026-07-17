import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, usePathname } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme/colors';

export const BOTTOM_TAB_BAR_HEIGHT = 92;

export function BottomBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const go = (href: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace(href as never);
  };

  return (
    <View
      className="absolute inset-x-0 bottom-0 flex-row items-start border-t border-[#EDE5D8] bg-cream/95 px-6 pt-3"
      style={{ height: BOTTOM_TAB_BAR_HEIGHT, paddingBottom: Math.max(insets.bottom, 12) }}>
      <TabButton active={pathname === '/'} icon="radio-button-on-outline" label="Metas" onPress={() => go('/')} />
      <TabButton
        active={pathname === '/amigos'}
        icon="people-outline"
        label="Amigos"
        onPress={() => go('/amigos')}
      />
      <View className="flex-1 items-center">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push('/crear' as never);
          }}
          className="-mt-3.5 h-[58px] w-[58px] items-center justify-center rounded-[20px] bg-violet"
          style={{ shadowColor: colors.violet, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 22, elevation: 6 }}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <TabButton
        active={pathname === '/perfil'}
        icon="person-outline"
        label="Perfil"
        onPress={() => go('/perfil')}
      />
    </View>
  );
}

function TabButton({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
}) {
  const color = active ? colors.violet : '#BDB4A4';
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} className="flex-1 items-center gap-1">
      <Ionicons name={icon} size={24} color={color} />
      <Text className="text-[10.5px] font-extrabold" style={{ color }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
