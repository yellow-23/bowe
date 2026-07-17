import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/shared/components/Avatar';
import { BOTTOM_TAB_BAR_HEIGHT } from '@/shared/components/BottomBar';
import { colors } from '@/shared/theme/colors';

import { EMOJIS, FEED, KIND_META } from './mock';

export function AmigosScreen() {
  const insets = useSafeAreaInsets();
  const [reactions, setReactions] = useState<Record<number, string | null>>({});

  const react = (id: number, emoji: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setReactions((r) => ({ ...r, [id]: r[id] === emoji ? null : emoji }));
  };

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: BOTTOM_TAB_BAR_HEIGHT + 20 }}>
      <View className="px-[22px] pb-0.5 pt-2.5">
        <Text className="text-[13px] font-bold text-faint">Tu círculo cercano · 6 personas</Text>
        <Text className="mt-1 text-[32px] font-extrabold tracking-tighter text-ink">Amigos</Text>
      </View>

      <View className="gap-3 px-[18px] pt-3.5">
        {FEED.map((ev) => {
          const meta = KIND_META[ev.kind];
          const tag = ev.kind === 'done' ? `${meta.label} · ${ev.streak}` : meta.label;
          const active = reactions[ev.id];

          return (
            <View key={ev.id} className="rounded-[22px] border border-border bg-white p-4">
              <View className="flex-row items-center gap-[11px]">
                <Avatar name={ev.who} size={42} />
                <View className="flex-1">
                  <Text className="text-[15px] leading-5">
                    <Text className="font-extrabold text-ink">{ev.who}</Text>{' '}
                    <Text className="font-semibold text-muted">{ev.action}</Text>
                  </Text>
                  <Text className="mt-0.5 text-xs font-semibold text-faint">{ev.when}</Text>
                </View>
                <View className="rounded-lg px-[9px] py-1.5" style={{ backgroundColor: meta.tagBg }}>
                  <Text className="text-[10px] font-extrabold tracking-wide" style={{ color: meta.accent }}>
                    {tag}
                  </Text>
                </View>
              </View>

              <View className="mt-3 rounded-2xl p-[13px]" style={{ backgroundColor: meta.goalBg }}>
                <Text className="text-[14.5px] font-bold text-[#4A463F]">{ev.goal}</Text>
              </View>

              {ev.risk && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    router.push('/rescate' as never);
                  }}
                  className="mt-[11px] h-[46px] items-center justify-center rounded-2xl bg-coral">
                  <Text className="text-[15px] font-extrabold text-white">Rescatar a Mateo</Text>
                </TouchableOpacity>
              )}

              <View className="mt-3 flex-row gap-2">
                {EMOJIS.map((e) => (
                  <TouchableOpacity
                    key={e}
                    activeOpacity={0.8}
                    onPress={() => react(ev.id, e)}
                    className="h-[38px] flex-1 items-center justify-center rounded-xl border-2"
                    style={{
                      backgroundColor: active === e ? colors.violetBg : '#F7F3EC',
                      borderColor: active === e ? colors.violet : 'transparent',
                    }}>
                    <Text className="text-[17px]">{e}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
