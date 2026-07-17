import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, firstName } from '@/shared/components/Avatar';
import { colors } from '@/shared/theme/colors';

import { TYPE_COLOR } from './mock';
import { GoalType } from './types';

const AMIGOS = ['Sofía Reinoso', 'Mateo Quiroga', 'Valentina Paz', 'Tomás Linares', 'Camila Ferré', 'Benja Salas'];

const TYPES: { type: GoalType; icon: React.ComponentProps<typeof Ionicons>['name']; label: string; desc: string }[] = [
  { type: 'individual', icon: 'ellipse', label: 'Individual', desc: 'Tu meta, tus testigos mirando' },
  { type: 'compartida', icon: 'people', label: 'Compartida', desc: 'De a dos, con apuesta de por medio' },
  { type: 'desafio', icon: 'bar-chart', label: 'Desafío', desc: 'Varios en juego, uno gana' },
];

export function CrearScreen() {
  const insets = useSafeAreaInsets();
  const [type, setType] = useState<GoalType>('individual');
  const [title, setTitle] = useState('');
  const [testigos, setTestigos] = useState<string[]>([]);

  const toggleTestigo = (name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTestigos((t) => (t.includes(name) ? t.filter((n) => n !== name) : [...t, name]));
  };

  const crear = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const ready = title.trim().length > 0 && testigos.length > 0;

  return (
    <View className="flex-1 bg-cream">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: 120 }}>
        <View className="flex-row items-center justify-between px-[22px]">
          <Text className="text-[26px] font-extrabold tracking-tight text-ink">Nueva meta</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={8}
            className="h-10 w-10 items-center justify-center rounded-full border border-border bg-white">
            <Ionicons name="close" size={20} color={colors.ink} />
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInDown.duration(400)}>
          <Text className="px-[22px] pb-2 pt-5 text-[13px] font-extrabold tracking-wide text-faint">
            ¿QUÉ TIPO DE META?
          </Text>
          <View className="gap-2.5 px-[18px]">
            {TYPES.map((t) => {
              const chip = TYPE_COLOR[t.type];
              const active = type === t.type;
              return (
                <TouchableOpacity
                  key={t.type}
                  activeOpacity={0.85}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setType(t.type);
                  }}
                  className="flex-row items-center gap-3 rounded-[22px] border-[1.5px] bg-white p-[14px]"
                  style={{ borderColor: active ? chip.color : colors.border }}>
                  <View
                    className="h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: chip.bg }}>
                    <Ionicons name={t.icon} size={20} color={chip.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[15px] font-extrabold text-ink">{t.label}</Text>
                    <Text className="mt-0.5 text-[12.5px] font-semibold text-muted">{t.desc}</Text>
                  </View>
                  {active && <Ionicons name="checkmark-circle" size={22} color={chip.color} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).duration(400)}>
          <Text className="px-[22px] pb-2 pt-5 text-[13px] font-extrabold tracking-wide text-faint">
            ¿CUÁL ES LA META?
          </Text>
          <View className="mx-[18px] rounded-[22px] border border-border bg-white px-[16px]">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ej: Estudiar Cálculo 2 h al día"
              placeholderTextColor={colors.faint}
              className="h-[52px] text-[15px] font-bold text-ink"
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)}>
          <Text className="px-[22px] pb-2 pt-5 text-[13px] font-extrabold tracking-wide text-faint">
            ¿QUIÉN TE MIRA?
          </Text>
          <View className="flex-row flex-wrap gap-2 px-[18px]">
            {AMIGOS.map((name) => {
              const active = testigos.includes(name);
              return (
                <TouchableOpacity
                  key={name}
                  activeOpacity={0.85}
                  onPress={() => toggleTestigo(name)}
                  className="flex-row items-center gap-2 rounded-full border-[1.5px] py-1.5 pl-1.5 pr-3.5"
                  style={{
                    backgroundColor: active ? colors.violetBg : '#fff',
                    borderColor: active ? colors.violet : colors.border,
                  }}>
                  <Avatar name={name} size={28} />
                  <Text
                    className="text-[13.5px] font-bold"
                    style={{ color: active ? colors.violet : colors.ink }}>
                    {firstName(name)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {testigos.length > 0 && (
            <View className="mt-3 flex-row items-center gap-1.5 px-[22px]">
              <Ionicons name="eye" size={13} color={colors.faint} />
              <Text className="text-xs font-bold text-muted">
                {testigos.length} {testigos.length === 1 ? 'testigo va a ver' : 'testigos van a ver'} si cumples
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-6" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={crear}
          disabled={!ready}
          className="h-14 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: ready ? colors.violet : colors.creamDark,
            shadowColor: colors.violet,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: ready ? 0.32 : 0,
            shadowRadius: 20,
            elevation: ready ? 4 : 0,
          }}>
          <Text className="text-[16.5px] font-extrabold" style={{ color: ready ? '#fff' : colors.faint }}>
            Crear meta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
