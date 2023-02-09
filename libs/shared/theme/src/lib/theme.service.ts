import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Theme, ThemeConfig, HSLColor } from './interfaces';
import { Default, BaseStaticColors } from './themes';

const hslBase =
  (hsl: HSLColor) =>
  (hue: number, saturation: number, lightness: number, opacity = 1) =>
    `hsla(${hsl.h + hue}, ${hsl.s + saturation}%, ${hsl.l + lightness}%, ${opacity})`;

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _current: ThemeConfig;

  constructor(@Inject(DOCUMENT) private _document) {}

  init() {
    this.setTheme(Default);
  }

  currentTheme(): string {
    return this._current.name;
  }

  setTheme(theme: Theme) {
    this._current = this._createThemeConfig(theme);

    Object.keys(this._current.props).forEach((prop) => {
      this._document.documentElement.style.setProperty(prop, this._current.props[prop]);
    });
  }

  private _createThemeConfig(theme: Theme): ThemeConfig {
    const primaryModifier = hslBase(theme.primary);
    const secondaryModifier = hslBase(theme.secondary);
    const tertiaryModifier = hslBase(theme.tertiary);

    return {
      name: 'default',
      props: {
        ...BaseStaticColors,

        '--primary-900': primaryModifier(0, 14, -30),
        '--primary-800': primaryModifier(0, 11, -25),
        '--primary-700': primaryModifier(0, 8, -20),
        '--primary-600': primaryModifier(0, 5, -10),
        '--primary-500': primaryModifier(0, 0, 5),
        '--primary-400': primaryModifier(0, 5, 10),
        '--primary-300': primaryModifier(0, 10, 20),
        '--primary-200': primaryModifier(0, 15, 35),
        '--primary-100': primaryModifier(0, 20, 45),
        '--primary-500-o-30': primaryModifier(0, 0, 0, 0.3),

        '--secondary-800': secondaryModifier(0, 12, -22),
        '--secondary-700': secondaryModifier(0, 8, -16),
        '--secondary-600': secondaryModifier(0, 4, -8),
        '--secondary-500': secondaryModifier(0, 0, 0),
        '--secondary-400': secondaryModifier(0, 4, 8),
        '--secondary-300': secondaryModifier(0, 8, 16),
        '--secondary-200': secondaryModifier(0, 12, 24),
        '--secondary-100': secondaryModifier(0, 16, 32),

        '--tertiary-800': tertiaryModifier(0, 11, -25),
        '--tertiary-700': tertiaryModifier(0, 8, -20),
        '--tertiary-600': tertiaryModifier(0, 5, -10),
        '--tertiary-500': tertiaryModifier(0, 0, 0),
        '--tertiary-400': tertiaryModifier(0, 5, 10),
        '--tertiary-300': tertiaryModifier(0, 10, 20),
        '--tertiary-200': tertiaryModifier(0, 15, 25),
        '--tertiary-100': tertiaryModifier(0, 20, 35),
      },
    };
  }
}
