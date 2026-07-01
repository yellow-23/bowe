import { Text, View } from 'react-native';

import { colors } from '@/shared/theme/colors';

const PEOPLE_COLORS: Record<string, string> = {
  'Sofía Reinoso': colors.violet,
  'Mateo Quiroga': colors.blue,
  'Valentina Paz': '#E8739B',
  'Tomás Linares': '#2BB3A3',
  'Camila Ferré': '#F0934B',
  'Benja Salas': '#8A7F72',
  'Lucas Mendoza': colors.violet,
  Tú: colors.violet,
};

export function personColor(name: string) {
  return PEOPLE_COLORS[name] ?? '#8A7F72';
}

export function initials(name: string) {
  if (name === 'Tú') return 'TÚ';
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function firstName(name: string) {
  return name.split(' ')[0];
}

export function Avatar({
  name,
  size = 44,
  borderColor,
}: {
  name: string;
  size?: number;
  borderColor?: string;
}) {
  return (
    <View
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: personColor(name),
        borderColor,
        borderWidth: borderColor ? 2.5 : 0,
      }}>
      <Text className="font-bold text-white" style={{ fontSize: size * 0.35 }}>
        {initials(name)}
      </Text>
    </View>
  );
}
