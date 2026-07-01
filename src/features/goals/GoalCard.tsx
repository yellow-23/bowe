import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { Avatar, firstName } from '@/shared/components/Avatar';
import { ProgressBar } from '@/shared/components/ProgressBar';
import { colors } from '@/shared/theme/colors';

import { streakColor, TYPE_COLOR, TYPE_LABEL } from './mock';
import { Goal } from './types';

const TYPE_ICON: Record<Goal['type'], React.ComponentProps<typeof Ionicons>['name']> = {
  individual: 'ellipse',
  compartida: 'people',
  desafio: 'bar-chart',
};

export function GoalCard({ goal }: { goal: Goal }) {
  const color = goal.risk ? colors.coral : streakColor(goal.streak);
  const chip = TYPE_COLOR[goal.type];

  let metaPill: string;
  let pillBg: string;
  let pillColor: string;
  if (goal.risk) {
    metaPill = 'Vence hoy';
    pillBg = colors.coralBg;
    pillColor = colors.coralDark;
  } else if (goal.type === 'desafio') {
    metaPill = '2.º de 5';
    pillBg = colors.goldBg;
    pillColor = colors.goldDark;
  } else {
    metaPill = `Racha ${goal.streak}`;
    pillBg = colors.violetBg;
    pillColor = colors.violet;
  }

  let faces: string[];
  let facesLabel: string;
  if (goal.type === 'individual') {
    faces = goal.testigos ?? [];
    facesLabel = `${faces.length} testigos`;
  } else if (goal.type === 'compartida' && goal.partner) {
    faces = ['Lucas Mendoza', goal.partner.name];
    facesLabel = `Tú y ${firstName(goal.partner.name)}`;
  } else {
    faces = ['Valentina Paz', 'Tú', 'Benja Salas'];
    facesLabel = '5 en juego';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push(`/goal/${goal.id}` as never); // route pending
      }}
      className="rounded-3xl border bg-white p-[18px]"
      style={{
        borderColor: goal.risk ? colors.coralBorder : colors.border,
        shadowColor: 'rgba(80,60,30,0.2)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 2,
      }}>
      <View className="flex-row items-center gap-3">
        <View
          className="h-[46px] w-[46px] items-center justify-center rounded-2xl"
          style={{ backgroundColor: chip.bg }}>
          <Ionicons name={TYPE_ICON[goal.type]} size={20} color={chip.color} />
        </View>
        <View className="flex-1">
          <Text className="text-[11px] font-extrabold tracking-wide" style={{ color: chip.color }}>
            {TYPE_LABEL[goal.type]}
          </Text>
          <Text className="mt-0.5 text-lg font-extrabold text-ink">{goal.title}</Text>
        </View>
        <View className="rounded-full px-[11px] py-1.5" style={{ backgroundColor: pillBg }}>
          <Text className="text-xs font-extrabold" style={{ color: pillColor }}>
            {metaPill}
          </Text>
        </View>
      </View>

      <Text className="mt-[11px] text-[13px] font-semibold text-muted">{goal.sub}</Text>
      <View className="mt-2.5">
        <ProgressBar pct={goal.progress} color={color} />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          {faces.map((name, i) => (
            <View key={name} style={{ marginLeft: i === 0 ? 0 : -7 }}>
              <Avatar name={name} size={26} borderColor="#fff" />
            </View>
          ))}
          <Text className="ml-[11px] text-xs font-bold text-muted">{facesLabel}</Text>
        </View>
        <Text className="text-sm font-extrabold" style={{ color }}>
          {Math.round(goal.progress * 100)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}
