```
  ----++                                ----++                    ---+++     
  ---+++                                ---++                     ---++      
 ----+---     -----     ---------  --------++ ------     -----   ----++----- 
 ---------+ --------++----------++--------+++--------+ --------++---++---++++
 ---+++---++ ++++---++---+++---++---+++---++---+++---++---++---++------++++  
----++ ---++--------++---++----++---++ ---++---++ ---+---++     -------++    
----+----+---+++---++---++----++---++----++---++---+++--++ --------+---++   
---------++--------+++--------+++--------++ -------+++ -------++---++----++  
 +++++++++   +++++++++- +++---++   ++++++++    ++++++    ++++++  ++++  ++++  
                     --------+++                                             
                       +++++++                                               
```

# @bagdock/loyalty-react

React components for embedding Bagdock Loyalty — referral widgets, rewards, points, and leaderboards with built-in theming.

[![npm version](https://img.shields.io/npm/v/@bagdock/loyalty-react.svg)](https://www.npmjs.com/package/@bagdock/loyalty-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Install

```bash
npm install @bagdock/loyalty-react @bagdock/loyalty react react-dom
```

## Quick start

```tsx
import { BagdockLoyaltyProvider, ReferralWidget, PointsDisplay } from '@bagdock/loyalty-react'

function App() {
  return (
    <BagdockLoyaltyProvider embedToken="etk_live_..." memberId="mem_abc123">
      <PointsDisplay />
      <ReferralWidget />
    </BagdockLoyaltyProvider>
  )
}
```

## Components

### `<BagdockLoyaltyProvider>`

Wraps your app to configure the Loyalty client and theming.

| Prop | Type | Description |
|------|------|-------------|
| `apiKey` | `string` | API key for direct operator use |
| `embedToken` | `string` | Embed token (preferred for client-side) |
| `platformApiKey` | `string` | Platform API key (`pak_...`) for embedded use |
| `baseUrl` | `string` | API base URL override |
| `operatorId` | `string` | Operator ID (required with `platformApiKey`) |
| `memberId` | `string` | Pre-identified member ID |
| `appearance` | `BagdockAppearance` | Theming object |
| `brandName` | `string` | Operator brand name |
| `logoUrl` | `string` | Operator logo URL |

### `<ReferralWidget>`

Full referral sharing widget with link generation and sharing options.

### `<ReferralCard>`

Individual referral card with status and reward info.

### `<RewardsDisplay>`

Shows available rewards and redemption options.

### `<PointsDisplay>`

Displays the member's current point balance and history.

### `<LeaderboardWidget>`

Referral leaderboard showing top referrers.

## Hooks

| Hook | Returns | Description |
|------|---------|-------------|
| `useLoyalty()` | `LoyaltyContextValue` | Access the Loyalty context (client, theme) |

## Theming

Customize with a Stripe/Clerk-style `appearance` prop:

```tsx
import { BagdockLoyaltyProvider } from '@bagdock/loyalty-react'
import { themes } from '@bagdock/loyalty-react/themes'

<BagdockLoyaltyProvider
  embedToken="etk_live_..."
  appearance={{
    theme: 'dark',
    variables: {
      colorPrimary: '#6366f1',
      borderRadius: '12px',
    },
  }}
>
  {children}
</BagdockLoyaltyProvider>
```

### Preset themes

```tsx
import { themes } from '@bagdock/loyalty-react/themes'
// themes.default, themes.dark, themes.minimal, etc.
```

## Platform partners

For platforms embedding loyalty on behalf of operators:

```tsx
<BagdockLoyaltyProvider
  platformApiKey="pak_live_..."
  operatorId="opreg_wisestorage"
  memberId="mem_abc123"
>
  <PointsDisplay />
</BagdockLoyaltyProvider>
```

## License

MIT
