// Provider
export { BagdockLoyaltyProvider } from './components/BagdockLoyaltyProvider'
export type { BagdockLoyaltyProviderProps } from './components/BagdockLoyaltyProvider'

// Hooks
export { useLoyalty } from './hooks/useLoyaltyContext'

// Components
export { ReferralWidget } from './components/ReferralWidget'
export type { ReferralWidgetProps } from './components/ReferralWidget'

export { ReferralCard } from './components/ReferralCard'
export type { ReferralCardProps } from './components/ReferralCard'

export { RewardsDisplay } from './components/RewardsDisplay'
export type { RewardsDisplayProps, Reward } from './components/RewardsDisplay'

export { PointsDisplay } from './components/PointsDisplay'
export type { PointsDisplayProps } from './components/PointsDisplay'

export { LeaderboardWidget } from './components/LeaderboardWidget'
export type { LeaderboardWidgetProps, LeaderboardEntry } from './components/LeaderboardWidget'

// Theming
export type { BagdockAppearance, BagdockVariables, BagdockElements } from './themes/types'
export { themes } from './themes/presets'
export { resolveTheme, themeToCSS } from './themes/resolve'
