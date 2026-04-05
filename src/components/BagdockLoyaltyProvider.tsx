import React, { useMemo } from 'react'
import { BagdockLoyalty } from '@bagdock/loyalty'
import type { BagdockAppearance } from '../themes/types'
import { resolveTheme, themeToCSS } from '../themes/resolve'
import { LoyaltyContext, type LoyaltyContextValue } from '../hooks/useLoyaltyContext'

export interface BagdockLoyaltyProviderProps {
  /** API key or embed token (for direct operator use) */
  apiKey?: string
  /** Embed token for client-side SDK (preferred over apiKey for embeds) */
  embedToken?: string
  /**
   * Platform API key (pak_...) for platform partners embedding on behalf of operators.
   * When provided alongside operatorId, the SDK uses .forOperator() to scope requests.
   */
  platformApiKey?: string
  /** Loyalty API base URL */
  baseUrl?: string
  /** Operator ID for scoped operations (required with platformApiKey) */
  operatorId?: string
  /** Pre-identified member ID */
  memberId?: string
  /** Theming: Stripe/Clerk-style appearance prop */
  appearance?: BagdockAppearance
  /** Operator brand name shown in widgets */
  brandName?: string
  /** Operator logo URL */
  logoUrl?: string
  children: React.ReactNode
}

export function BagdockLoyaltyProvider({
  apiKey,
  embedToken,
  platformApiKey,
  baseUrl,
  operatorId,
  memberId,
  appearance,
  children,
}: BagdockLoyaltyProviderProps) {
  const theme = useMemo(() => resolveTheme(appearance), [appearance])
  const cssVars = useMemo(() => themeToCSS(theme), [theme])

  const client = useMemo(() => {
    // Platform mode: pak_ key + operatorId -> scoped client
    if (platformApiKey && operatorId) {
      const platformClient = new BagdockLoyalty({ apiKey: platformApiKey, baseUrl })
      return platformClient.forOperator(operatorId)
    }

    const key = apiKey || embedToken
    if (!key) return null
    return new BagdockLoyalty({ apiKey: key, baseUrl })
  }, [apiKey, embedToken, platformApiKey, baseUrl, operatorId])

  const value: LoyaltyContextValue = useMemo(
    () => ({ client, theme, operatorId, memberId, embedToken }),
    [client, theme, operatorId, memberId, embedToken],
  )

  return (
    <LoyaltyContext.Provider value={value}>
      <div
        className="bdl-root"
        style={{ ...cssVarObject(cssVars) } as React.CSSProperties}
        data-bdl-layout={theme.layout}
      >
        {children}
      </div>
    </LoyaltyContext.Provider>
  )
}

function cssVarObject(cssString: string): Record<string, string> {
  const obj: Record<string, string> = {}
  for (const line of cssString.split('\n')) {
    const trimmed = line.trim().replace(/;$/, '')
    if (!trimmed || !trimmed.startsWith('--')) continue
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue
    obj[trimmed.slice(0, colonIdx).trim()] = trimmed.slice(colonIdx + 1).trim()
  }
  return obj
}
