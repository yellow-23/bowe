import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOTTOM_TAB_BAR_HEIGHT } from '@/shared/components/BottomBar';
import { colors } from '@/shared/theme/colors';

import { GoalCard } from './GoalCard';
import { GOALS } from './mock';

const riskGoal = GOALS.find((g) => g.risk);

export function MetasScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: BOTTOM_TAB_BAR_HEIGHT + 20 }}>
      <View className="px-[22px] pb-0.5 pt-2.5">
        <Text className="text-[13px] font-bold text-faint">Jueves 12 de junio</Text>
        <Text className="mt-1 text-[32px] font-extrabold tracking-tighter text-ink">Hola, Lucas</Text>
      </View>

      {riskGoal && (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push(`/goal/${riskGoal.id}` as never); // route pending
          }}
          className="mx-[18px] mb-1 mt-4 flex-row items-center gap-[13px] rounded-[22px] border-[1.5px] bg-coral-bg p-[15px]"
          style={{ borderColor: colors.coralBorder }}>
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-coral">
            <Ionicons name="alert" size={22} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-extrabold text-coral-dark">Una meta necesita un empujón</Text>
            <Text className="mt-0.5 text-[13px] font-semibold text-[#B5705C]">
              Ensayo de Historia · queda 1 h 48
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.coralDark} />
        </TouchableOpacity>
      )}

      <Text className="px-[22px] pb-2 pt-3.5 text-[13px] font-extrabold tracking-wide text-faint">
        TUS METAS ACTIVAS
      </Text>
      <View className="gap-[13px] px-[18px]">
        {GOALS.map((g) => (
          <GoalCard key={g.id} goal={g} />
        ))}
      </View>
    </ScrollView>
  );
}
