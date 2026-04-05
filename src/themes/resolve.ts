import type { BagdockAppearance, ResolvedTheme, BagdockVariables } from './types'
import { themes } from './presets'

export function resolveTheme(appearance?: BagdockAppearance): ResolvedTheme {
  const preset = themes[appearance?.theme || 'default'] || themes.default
  const variables = { ...preset, ...stripUndefined(appearance?.variables ?? {}) } as Required<BagdockVariables>
  return {
    variables,
    elements: appearance?.elements ?? {},
    layout: appearance?.layout ?? 'comfortable',
  }
}

export function themeToCSS(theme: ResolvedTheme): string {
  const v = theme.variables
  return `
    --bdl-color-primary: ${v.colorPrimary};
    --bdl-color-primary-text: ${v.colorPrimaryText};
    --bdl-color-bg: ${v.colorBackground};
    --bdl-color-surface: ${v.colorSurface};
    --bdl-color-surface-hover: ${v.colorSurfaceHover};
    --bdl-color-text: ${v.colorText};
    --bdl-color-text-secondary: ${v.colorTextSecondary};
    --bdl-color-text-muted: ${v.colorTextMuted};
    --bdl-color-border: ${v.colorBorder};
    --bdl-color-success: ${v.colorSuccess};
    --bdl-color-warning: ${v.colorWarning};
    --bdl-color-danger: ${v.colorDanger};
    --bdl-color-accent: ${v.colorAccent};
    --bdl-radius: ${v.borderRadius};
    --bdl-radius-sm: ${v.borderRadiusSm};
    --bdl-radius-lg: ${v.borderRadiusLg};
    --bdl-font: ${v.fontFamily};
    --bdl-font-mono: ${v.fontFamilyMono};
    --bdl-font-size: ${v.fontSize};
    --bdl-font-size-sm: ${v.fontSizeSm};
    --bdl-font-size-lg: ${v.fontSizeLg};
    --bdl-font-size-xl: ${v.fontSizeXl};
    --bdl-font-weight: ${v.fontWeight};
    --bdl-font-weight-bold: ${v.fontWeightBold};
    --bdl-spacing: ${v.spacingUnit};
    --bdl-shadow-sm: ${v.shadowSm};
    --bdl-shadow-md: ${v.shadowMd};
    --bdl-shadow-lg: ${v.shadowLg};
    --bdl-layout: ${theme.layout};
  `.trim()
}

function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}
