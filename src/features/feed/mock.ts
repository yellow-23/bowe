import { colors } from '@/shared/theme/colors';

export type FeedKind = 'done' | 'risk' | 'rescue' | 'fail';

export type FeedEvent = {
  id: number;
  who: string;
  action: string;
  goal: string;
  kind: FeedKind;
  when: string;
  streak?: number;
  risk?: boolean;
};

export const FEED: FeedEvent[] = [
  { id: 1, who: 'Sofía Reinoso', action: 'cumplió su meta', goal: 'TP de Cálculo entregado', kind: 'done', when: 'hace 20 min', streak: 12 },
  { id: 2, who: 'Mateo Quiroga', action: 'está por fallar una meta', goal: 'Estudiar Química 2 h', kind: 'risk', when: 'le quedan 38 minutos', risk: true },
  { id: 3, who: 'Valentina Paz', action: 'rescató a Tomás', goal: 'Resumen de Historia', kind: 'rescue', when: 'hace 1 h' },
  { id: 4, who: 'Camila Ferré', action: 'cumplió su meta', goal: 'Repaso de Anatomía', kind: 'done', when: 'hace 2 h', streak: 4 },
  { id: 5, who: 'Benja Salas', action: 'no llegó a su meta', goal: 'Gimnasio 6:00', kind: 'fail', when: 'hace 5 h' },
];

export const KIND_META: Record<FeedKind, { accent: string; tagBg: string; goalBg: string; label: string }> = {
  done: { accent: colors.violet, tagBg: colors.violetBg, goalBg: '#F6F3FD', label: 'CUMPLIDA' },
  risk: { accent: colors.coralDark, tagBg: colors.coralBg, goalBg: colors.coralBg, label: 'EN RIESGO' },
  rescue: { accent: colors.goldDark, tagBg: colors.goldBg, goalBg: '#FBF6E8', label: 'RESCATE' },
  fail: { accent: '#8A7F72', tagBg: colors.border, goalBg: '#F4F0E8', label: 'NO LLEGÓ' },
};

export const EMOJIS = ['👏', '🔥', '💪', '🙌', '😬'];
