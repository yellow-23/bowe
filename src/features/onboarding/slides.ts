import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/shared/theme/colors';

export type Slide = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  iconBg: string;
  eyebrow: string;
  title: string;
  body: string;
};

export const SLIDES: Slide[] = [
  {
    icon: 'flag',
    iconColor: colors.violet,
    iconBg: colors.violetBg,
    eyebrow: 'BOWE',
    title: 'Metas con\ntestigos reales',
    body: 'Nada de streaks que solo bajan un número. Tus amigos ven si cumples — y eso pesa más que cualquier app.',
  },
  {
    icon: 'eye',
    iconColor: colors.blue,
    iconBg: '#E7F0FB',
    eyebrow: 'TESTIGOS',
    title: 'Elige quién\nte mira',
    body: 'Cada meta tiene testigos: amigos que la ven. Individual, compartida con alguien, o un desafío entre varios.',
  },
  {
    icon: 'shield-checkmark',
    iconColor: colors.coralDark,
    iconBg: colors.coralBg,
    eyebrow: 'RESCATE',
    title: 'Nadie falla\nsolo',
    body: 'Si estás por fallar, tus testigos lo notan y pueden rescatarte antes de que se registre como fallo.',
  },
  {
    icon: 'rocket',
    iconColor: colors.goldDark,
    iconBg: colors.goldBg,
    eyebrow: 'EMPECEMOS',
    title: 'Tu primera\nmeta te espera',
    body: 'Elige un objetivo, súmale testigos, y deja que la presión social haga el resto.',
  },
];
