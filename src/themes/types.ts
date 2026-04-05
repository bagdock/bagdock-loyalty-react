export interface BagdockAppearance {
  /** Theme preset */
  theme?: 'default' | 'night' | 'flat' | 'neobrutalism'
  /** Override individual CSS variables */
  variables?: BagdockVariables
  /** Layout density */
  layout?: 'compact' | 'comfortable' | 'full'
  /** Component-level style overrides */
  elements?: Partial<BagdockElements>
}

export interface BagdockVariables {
  colorPrimary?: string
  colorPrimaryText?: string
  colorBackground?: string
  colorSurface?: string
  colorSurfaceHover?: string
  colorText?: string
  colorTextSecondary?: string
  colorTextMuted?: string
  colorBorder?: string
  colorSuccess?: string
  colorWarning?: string
  colorDanger?: string
  colorAccent?: string

  borderRadius?: string
  borderRadiusSm?: string
  borderRadiusLg?: string

  fontFamily?: string
  fontFamilyMono?: string
  fontSize?: string
  fontSizeSm?: string
  fontSizeLg?: string
  fontSizeXl?: string
  fontWeight?: string
  fontWeightBold?: string

  spacingUnit?: string

  shadowSm?: string
  shadowMd?: string
  shadowLg?: string
}

export interface BagdockElements {
  card?: string
  cardHeader?: string
  cardContent?: string
  button?: string
  buttonPrimary?: string
  buttonSecondary?: string
  badge?: string
  input?: string
  label?: string
  heading?: string
  subheading?: string
  progressBar?: string
  progressFill?: string
  divider?: string
  avatar?: string
  tooltip?: string
  referralCode?: string
  shareButton?: string
  rewardItem?: string
  pointsDisplay?: string
}

export interface ResolvedTheme {
  variables: Required<BagdockVariables>
  elements: Partial<BagdockElements>
  layout: 'compact' | 'comfortable' | 'full'
}
