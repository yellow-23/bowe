import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/shared/components/Avatar';
import { colors } from '@/shared/theme/colors';

const MENSAJES = ['Dale, que llegas 💪', 'Te quedan 38 min, muévete 😬', 'Si terminas, café pagado ☕'];

export function RescateScreen() {
  const insets = useSafeAreaInsets();
  const [mensaje, setMensaje] = useState(MENSAJES[0]);

  const enviar = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <View className="flex-1 bg-cream">
      <View style={{ paddingTop: insets.top + 14 }} className="flex-row justify-end px-[22px]">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={8}
          className="h-10 w-10 items-center justify-center rounded-full border border-border bg-white">
          <Ionicons name="close" size={20} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-[22px]">
        <Animated.View entering={FadeInDown.duration(400)} className="items-center pt-4">
          <Avatar name="Mateo Quiroga" size={76} />
          <Text className="mt-4 text-[13px] font-extrabold tracking-widest text-coral-dark">EN RIESGO</Text>
          <Text className="mt-1 text-center text-[28px] font-extrabold leading-[36px] tracking-tight text-ink">
            Mateo está{'\n'}por fallar
          </Text>
          <Text className="mt-2 text-center text-[15px] font-semibold text-muted">
            Estudiar Química 2 h · le quedan 38 minutos
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(60).duration(400)}
          className="mt-6 flex-row items-center gap-3 rounded-[22px] border-[1.5px] bg-coral-bg p-[15px]"
          style={{ borderColor: colors.coralBorder }}>
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-coral">
            <Ionicons name="shield-checkmark" size={20} color="#fff" />
          </View>
          <Text className="flex-1 text-[13px] font-bold leading-[18px] text-coral-dark">
            Tu rescate le avisa que lo viste y no se registra como fallo si llega. Solo sus testigos pueden
            hacerlo.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)}>
          <Text className="pb-2 pt-6 text-[13px] font-extrabold tracking-wide text-faint">
            MÁNDALE UN EMPUJÓN
          </Text>
          <View className="gap-2.5">
            {MENSAJES.map((m) => {
              const active = mensaje === m;
              return (
                <TouchableOpacity
                  key={m}
                  activeOpacity={0.85}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setMensaje(m);
                  }}
                  className="rounded-[18px] border-[1.5px] bg-white p-[14px]"
                  style={{ borderColor: active ? colors.coral : colors.border }}>
                  <Text
                    className="text-[15px] font-bold"
                    style={{ color: active ? colors.coralDark : colors.ink }}>
                    {m}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>

      <View className="px-6" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={enviar}
          className="h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-coral"
          style={{ shadowColor: colors.coral, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.32, shadowRadius: 20, elevation: 4 }}>
          <Ionicons name="shield-checkmark" size={18} color="#fff" />
          <Text className="text-[16.5px] font-extrabold text-white">Rescatar a Mateo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
