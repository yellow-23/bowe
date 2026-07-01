export type GoalType = 'individual' | 'compartida' | 'desafio';

export type Goal = {
  id: string;
  type: GoalType;
  title: string;
  sub: string;
  streak: number;
  progress: number;
  risk: boolean;
  testigos?: string[];
  partner?: { name: string; progress: number };
  apuesta?: string;
};

export type BoardEntry = { name: string; hrs: number; rank: number; me?: boolean };
