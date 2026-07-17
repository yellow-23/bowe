import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, firstName } from '@/shared/components/Avatar';
import { ProgressBar } from '@/shared/components/ProgressBar';
import { colors } from '@/shared/theme/colors';

import { BOARD, goalById, streakColor, TYPE_COLOR, TYPE_LABEL } from './mock';

export function GoalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const goal = goalById(id);

  if (!goal) return null;

  const color = goal.risk ? colors.coral : streakColor(goal.streak);
  const chip = TYPE_COLOR[goal.type];

  let faces: string[];
  if (goal.type === 'individual') faces = goal.testigos ?? [];
  else if (goal.type === 'compartida' && goal.partner) faces = ['Lucas Mendoza', goal.partner.name];
  else faces = BOARD.slice(0, 3).map((b) => b.name);

  const done = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <View className="flex-1 bg-cream">
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 120 }}>
        <View className="flex-row items-center justify-between px-[22px]">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={8}
            className="h-10 w-10 items-center justify-center rounded-full border border-border bg-white">
            <Ionicons name="chevron-back" size={20} color={colors.ink} />
          </TouchableOpacity>
          <View className="rounded-full px-3 py-1.5" style={{ backgroundColor: chip.bg }}>
            <Text className="text-[11px] font-extrabold tracking-wide" style={{ color: chip.color }}>
              {TYPE_LABEL[goal.type]}
            </Text>
          </View>
        </View>

        <View className="px-[22px] pt-5">
          <Text className="text-[32px] font-extrabold leading-[40px] tracking-tight text-ink">{goal.title}</Text>
          <Text className="mt-1.5 text-[14px] font-semibold text-muted">{goal.sub}</Text>
        </View>

        {goal.risk && (
          <Animated.View
            entering={FadeInDown.duration(400)}
            className="mx-[18px] mt-4 flex-row items-center gap-3 rounded-[22px] border-[1.5px] bg-coral-bg p-[15px]"
            style={{ borderColor: colors.coralBorder }}>
            <View className="h-10 w-10 items-center justify-center rounded-2xl bg-coral">
              <Ionicons name="alert" size={20} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-extrabold text-coral-dark">Estás en riesgo</Text>
              <Text className="text-[12.5px] font-semibold text-[#B5705C]">
                Tus testigos ya lo saben. Todavía llegas.
              </Text>
            </View>
          </Animated.View>
        )}

        <Animated.View
          entering={FadeInDown.delay(60).duration(400)}
          className="mx-[18px] mt-4 rounded-3xl border border-border bg-white p-[18px]">
          <View className="flex-row items-end justify-between">
            <Text className="text-[13px] font-extrabold tracking-wide text-faint">TU PROGRESO</Text>
            <Text className="text-[28px] font-extrabold" style={{ color }}>
              {Math.round(goal.progress * 100)}%
            </Text>
          </View>
          <ProgressBar pct={goal.progress} color={color} faces={faces} />
          {goal.streak > 0 && (
            <View className="mt-3 flex-row items-center gap-1.5">
              <Ionicons name="flash" size={14} color={colors.violet} />
              <Text className="text-[13px] font-bold text-muted">
                Racha de {goal.streak} — tus testigos cuentan contigo
              </Text>
            </View>
          )}
        </Animated.View>

        {goal.type === 'individual' && goal.testigos && (
          <Animated.View entering={FadeInDown.delay(120).duration(400)} className="mx-[18px] mt-4">
            <Text className="px-1 pb-2 text-[13px] font-extrabold tracking-wide text-faint">
              TE ESTÁN MIRANDO
            </Text>
            <View className="rounded-3xl border border-border bg-white">
              {goal.testigos.map((name, i) => (
                <View
                  key={name}
                  className="flex-row items-center gap-3 p-[14px]"
                  style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.border }}>
                  <Avatar name={name} size={38} />
                  <Text className="flex-1 text-[15px] font-bold text-ink">{name}</Text>
                  <Ionicons name="eye" size={16} color={colors.faint} />
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        {goal.type === 'compartida' && goal.partner && (
          <Animated.View entering={FadeInDown.delay(120).duration(400)} className="mx-[18px] mt-4">
            <Text className="px-1 pb-2 text-[13px] font-extrabold tracking-wide text-faint">MANO A MANO</Text>
            <View className="gap-4 rounded-3xl border border-border bg-white p-[18px]">
              <View>
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-[14px] font-extrabold text-ink">Tú</Text>
                  <Text className="text-[13px] font-extrabold" style={{ color: colors.violet }}>
                    {Math.round(goal.progress * 100)}%
                  </Text>
                </View>
                <ProgressBar pct={goal.progress} color={colors.violet} height={9} />
              </View>
              <View>
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-[14px] font-extrabold text-ink">{firstName(goal.partner.name)}</Text>
                  <Text className="text-[13px] font-extrabold" style={{ color: colors.blue }}>
                    {Math.round(goal.partner.progress * 100)}%
                  </Text>
                </View>
                <ProgressBar pct={goal.partner.progress} color={colors.blue} height={9} />
              </View>
              {goal.apuesta && (
                <View className="rounded-2xl bg-gold-bg p-[13px]">
                  <Text className="text-[11px] font-extrabold tracking-wide text-gold-dark">LA APUESTA</Text>
                  <Text className="mt-1 text-[14px] font-bold text-[#4A463F]">{goal.apuesta}</Text>
                </View>
              )}
            </View>
          </Animated.View>
        )}

        {goal.type === 'desafio' && (
          <Animated.View entering={FadeInDown.delay(120).duration(400)} className="mx-[18px] mt-4">
            <Text className="px-1 pb-2 text-[13px] font-extrabold tracking-wide text-faint">EN JUEGO</Text>
            <View className="rounded-3xl border border-border bg-white">
              {BOARD.map((entry, i) => (
                <View
                  key={entry.name}
                  className="flex-row items-center gap-3 p-[14px]"
                  style={{
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: colors.border,
                    backgroundColor: entry.me ? colors.violetBg : 'transparent',
                    borderRadius: entry.me ? 18 : 0,
                  }}>
                  <Text className="w-6 text-center text-[15px] font-extrabold text-faint">{entry.rank}</Text>
                  <Avatar name={entry.name} size={36} />
                  <Text className="flex-1 text-[15px] font-bold text-ink">{entry.name}</Text>
                  <Text className="text-[14px] font-extrabold" style={{ color: entry.me ? colors.violet : colors.muted }}>
                    {entry.hrs} h
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-6" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={done}
          className="h-14 items-center justify-center rounded-2xl bg-violet"
          style={{ shadowColor: colors.violet, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.32, shadowRadius: 20, elevation: 4 }}>
          <Text className="text-[16.5px] font-extrabold text-white">Marcar cumplida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
