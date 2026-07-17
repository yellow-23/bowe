import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/shared/components/Avatar';
import { BOTTOM_TAB_BAR_HEIGHT } from '@/shared/components/BottomBar';
import { colors } from '@/shared/theme/colors';

const STATS = [
  { value: '12', label: 'racha máxima', color: colors.violet, bg: colors.violetBg },
  { value: '23', label: 'metas cumplidas', color: colors.goldDark, bg: colors.goldBg },
  { value: '4', label: 'rescates hechos', color: colors.coralDark, bg: colors.coralBg },
];

const CIRCULO = [
  { name: 'Sofía Reinoso', racha: 12 },
  { name: 'Mateo Quiroga', racha: 6 },
  { name: 'Valentina Paz', racha: 9 },
  { name: 'Tomás Linares', racha: 3 },
  { name: 'Camila Ferré', racha: 4 },
  { name: 'Benja Salas', racha: 0 },
];

export function PerfilScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: BOTTOM_TAB_BAR_HEIGHT + 20 }}>
      <View className="px-[22px] pb-0.5 pt-2.5">
        <Text className="text-[13px] font-bold text-faint">En Bowe desde marzo</Text>
        <Text className="mt-1 text-[32px] font-extrabold tracking-tighter text-ink">Perfil</Text>
      </View>

      <Animated.View entering={FadeInDown.duration(400)} className="items-center pt-4">
        <Avatar name="Lucas Mendoza" size={84} />
        <Text className="mt-3 text-[22px] font-extrabold tracking-tight text-ink">Lucas Mendoza</Text>
        <View className="mt-1 flex-row items-center gap-1.5">
          <Ionicons name="eye" size={13} color={colors.faint} />
          <Text className="text-[13px] font-bold text-muted">6 personas te miran</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(400)} className="flex-row gap-2.5 px-[18px] pt-5">
        {STATS.map((s) => (
          <View key={s.label} className="flex-1 items-center rounded-[22px] p-[14px]" style={{ backgroundColor: s.bg }}>
            <Text className="text-[26px] font-extrabold" style={{ color: s.color }}>
              {s.value}
            </Text>
            <Text className="mt-0.5 text-center text-[11px] font-bold" style={{ color: s.color }}>
              {s.label}
            </Text>
          </View>
        ))}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(400)}>
        <Text className="px-[22px] pb-2 pt-6 text-[13px] font-extrabold tracking-wide text-faint">
          TU CÍRCULO CERCANO
        </Text>
        <View className="mx-[18px] rounded-3xl border border-border bg-white">
          {CIRCULO.map((p, i) => (
            <View
              key={p.name}
              className="flex-row items-center gap-3 p-[14px]"
              style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.border }}>
              <Avatar name={p.name} size={38} />
              <Text className="flex-1 text-[15px] font-bold text-ink">{p.name}</Text>
              {p.racha > 0 ? (
                <View className="flex-row items-center gap-1 rounded-full bg-violet-bg px-2.5 py-1">
                  <Ionicons name="flash" size={12} color={colors.violet} />
                  <Text className="text-xs font-extrabold text-violet">{p.racha}</Text>
                </View>
              ) : (
                <Text className="text-xs font-bold text-faint">sin racha</Text>
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
