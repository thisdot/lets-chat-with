export interface Theme {
  primary: HSLColor;
  secondary: HSLColor;
  tertiary: HSLColor;
}

export interface ThemeConfig {
  name: string;
  props: DynamicColors & StaticColors;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface DynamicColors {
  '--primary-900': string;
  '--primary-800': string;
  '--primary-700': string;
  '--primary-600': string;
  '--primary-500': string;
  '--primary-400': string;
  '--primary-300': string;
  '--primary-200': string;
  '--primary-100': string;
  '--primary-500-o-30': string;

  '--secondary-800': string;
  '--secondary-700': string;
  '--secondary-600': string;
  '--secondary-500': string;
  '--secondary-400': string;
  '--secondary-300': string;
  '--secondary-200': string;
  '--secondary-100': string;

  '--tertiary-800': string;
  '--tertiary-700': string;
  '--tertiary-600': string;
  '--tertiary-500': string;
  '--tertiary-400': string;
  '--tertiary-300': string;
  '--tertiary-200': string;
  '--tertiary-100': string;
}

export interface StaticColors {
  '--grey-900': string;
  '--grey-800': string;
  '--grey-700': string;
  '--grey-600': string;
  '--grey-500': string;
  '--grey-400': string;
  '--grey-300': string;
  '--grey-200': string;
  '--grey-100': string;
  '--white': string;
  '--red': string;
}
