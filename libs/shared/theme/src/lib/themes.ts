import { Theme, StaticColors } from './interfaces';

export const Default: Theme = {
  primary: { h: 245, s: 40, l: 50 },
  secondary: { h: 212, s: 82, l: 62 },
  tertiary: { h: 120, s: 50, l: 60 },
};

export const BaseStaticColors: StaticColors = {
  '--grey-900': '#2A2248',
  '--grey-800': '#332E47',
  '--grey-700': '#4D4864',
  '--grey-600': '#7B729F',
  '--grey-500': '#9891B7',
  '--grey-400': '#C4D5EF',
  '--grey-300': '#D7E4F8',
  '--grey-200': '#EEF4FD',
  '--grey-100': '#F7FAFE',

  '--red': '#F00',
  '--white': '#FFF',
};
