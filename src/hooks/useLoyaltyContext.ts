import { createContext, useContext } from 'react'
import type { BagdockLoyalty } from '@bagdock/loyalty'
import type { ResolvedTheme } from '../themes/types'

export interface LoyaltyContextValue {
  client: BagdockLoyalty | null
  theme: ResolvedTheme
  operatorId?: string
  memberId?: string
  embedToken?: string
}

export const LoyaltyContext = createContext<LoyaltyContextValue | null>(null)

export function useLoyalty(): LoyaltyContextValue {
  const ctx = useContext(LoyaltyContext)
  if (!ctx) throw new Error('useLoyalty must be used within <BagdockLoyaltyProvider>')
  return ctx
}
