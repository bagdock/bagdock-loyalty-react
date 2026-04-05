import React, { useState, useEffect } from 'react'
import { useLoyalty } from '../hooks/useLoyaltyContext'

export interface PointsDisplayProps {
  /** Override points externally */
  totalPoints?: number
  availablePoints?: number
  lifetimePoints?: number
  tier?: string
  /** Custom heading */
  heading?: string
  /** Show tier badge */
  showTier?: boolean
  /** Custom CSS className */
  className?: string
}

export function PointsDisplay({
  totalPoints: totalProp,
  availablePoints: availableProp,
  lifetimePoints: lifetimeProp,
  tier: tierProp,
  heading = 'Your loyalty points',
  showTier = true,
  className,
}: PointsDisplayProps) {
  const { client, memberId } = useLoyalty()
  const [total, setTotal] = useState(totalProp ?? 0)
  const [available, setAvailable] = useState(availableProp ?? 0)
  const [lifetime, setLifetime] = useState(lifetimeProp ?? 0)
  const [tier, setTier] = useState(tierProp ?? '')
  const [loading, setLoading] = useState(totalProp === undefined)

  useEffect(() => {
    if (totalProp !== undefined) return
    if (!client || !memberId) return
    setLoading(true)
    client.members.get(memberId)
      .then(member => {
        setTotal(member.total_points)
        setAvailable(member.available_points)
        setLifetime(member.lifetime_points)
        setTier(member.tier || '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [client, memberId, totalProp])

  return (
    <div className={`bdl-points-display ${className || ''}`} style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.heading}>{heading}</h4>
        {showTier && tier && <span style={styles.tierBadge}>{tier}</span>}
      </div>

      <div style={styles.pointsMain}>
        {loading ? (
          <div style={{ ...styles.skeleton, width: '120px', height: '48px' }} />
        ) : (
          <span style={styles.bigNumber}>{available.toLocaleString()}</span>
        )}
        <span style={styles.pointsLabel}>available points</span>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.stat}>
          <span style={styles.statValue}>{total.toLocaleString()}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.stat}>
          <span style={styles.statValue}>{lifetime.toLocaleString()}</span>
          <span style={styles.statLabel}>Lifetime</span>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'var(--bdl-font)',
    background: 'var(--bdl-color-surface)',
    border: '1px solid var(--bdl-color-border)',
    borderRadius: 'var(--bdl-radius-lg)',
    padding: 'calc(var(--bdl-spacing) * 6)',
    boxShadow: 'var(--bdl-shadow-sm)',
    textAlign: 'center' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'calc(var(--bdl-spacing) * 4)',
  },
  heading: {
    margin: 0,
    fontSize: 'var(--bdl-font-size-lg)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-text)',
  },
  tierBadge: {
    fontSize: 'var(--bdl-font-size-sm)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-primary-text)',
    background: 'var(--bdl-color-accent)',
    padding: 'calc(var(--bdl-spacing) * 1) calc(var(--bdl-spacing) * 3)',
    borderRadius: 'var(--bdl-radius)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  pointsMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'calc(var(--bdl-spacing) * 1)',
    marginBottom: 'calc(var(--bdl-spacing) * 5)',
  },
  bigNumber: {
    fontSize: '48px',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-primary)',
    lineHeight: 1,
  },
  pointsLabel: {
    fontSize: 'var(--bdl-font-size)',
    color: 'var(--bdl-color-text-muted)',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'calc(var(--bdl-spacing) * 4)',
    borderTop: '1px solid var(--bdl-color-border)',
    paddingTop: 'calc(var(--bdl-spacing) * 4)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'calc(var(--bdl-spacing) * 1)',
  },
  statValue: {
    fontSize: 'var(--bdl-font-size-lg)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-text)',
  },
  statLabel: { fontSize: 'var(--bdl-font-size-sm)', color: 'var(--bdl-color-text-muted)' },
  divider: {
    width: '1px',
    height: '32px',
    background: 'var(--bdl-color-border)',
  },
  skeleton: {
    borderRadius: 'var(--bdl-radius)',
    background: 'var(--bdl-color-surface-hover)',
  },
}
