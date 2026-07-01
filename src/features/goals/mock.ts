import { colors } from '@/shared/theme/colors';

import { BoardEntry, Goal, GoalType } from './types';

export const GOALS: Goal[] = [
  {
    id: 'calc',
    type: 'individual',
    title: 'Estudiar Cálculo II',
    sub: '2 h por día · hoy a las 18:00',
    streak: 12,
    progress: 0.78,
    risk: false,
    testigos: ['Sofía Reinoso', 'Mateo Quiroga', 'Camila Ferré'],
  },
  {
    id: 'run',
    type: 'compartida',
    title: 'Correr 5 km',
    sub: 'Con Mateo · lun, mié y vie',
    streak: 6,
    progress: 0.6,
    risk: false,
    partner: { name: 'Mateo Quiroga', progress: 0.42 },
    apuesta: 'El que falla paga el café de la semana ☕',
  },
  {
    id: 'final',
    type: 'desafio',
    title: 'Maratón de finales',
    sub: '5 personas · cierra el domingo',
    streak: 0,
    progress: 0.55,
    risk: false,
  },
  {
    id: 'essay',
    type: 'individual',
    title: 'Entregar ensayo de Historia',
    sub: 'Vence hoy 20:00 · queda 1 h 48',
    streak: 8,
    progress: 0.35,
    risk: true,
    testigos: ['Valentina Paz', 'Tomás Linares'],
  },
];

export const BOARD: BoardEntry[] = [
  { name: 'Valentina Paz', hrs: 14, rank: 1 },
  { name: 'Tú', hrs: 12, rank: 2, me: true },
  { name: 'Benja Salas', hrs: 9, rank: 3 },
  { name: 'Tomás Linares', hrs: 7, rank: 4 },
  { name: 'Camila Ferré', hrs: 5, rank: 5 },
];

export function goalById(id: string) {
  return GOALS.find((g) => g.id === id);
}

export function streakColor(streak: number) {
  if (streak >= 12) return colors.violet;
  if (streak >= 5) return colors.violetMid;
  return colors.violetLight;
}

export const TYPE_LABEL: Record<GoalType, string> = {
  individual: 'INDIVIDUAL',
  compartida: 'COMPARTIDA',
  desafio: 'DESAFÍO',
};

export const TYPE_COLOR: Record<GoalType, { bg: string; color: string }> = {
  individual: { bg: colors.violetBg, color: colors.violet },
  compartida: { bg: '#E7F0FB', color: colors.blue },
  desafio: { bg: colors.goldBg, color: colors.gold },
};
