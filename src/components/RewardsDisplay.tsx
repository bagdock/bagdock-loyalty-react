import React, { useState, useEffect } from 'react'
import { useLoyalty } from '../hooks/useLoyaltyContext'

export interface Reward {
  id: string
  name: string
  description?: string
  pointsCost: number
  category?: string
  imageUrl?: string
}

export interface RewardsDisplayProps {
  /** External rewards list */
  rewards?: Reward[]
  /** Current available points for the member */
  availablePoints?: number
  /** Custom heading */
  heading?: string
  /** Called when user redeems a reward */
  onRedeem?: (reward: Reward) => void
  /** Custom CSS className */
  className?: string
}

export function RewardsDisplay({
  rewards: rewardsProp,
  availablePoints: pointsProp,
  heading = 'Available rewards',
  onRedeem,
  className,
}: RewardsDisplayProps) {
  const { client } = useLoyalty()
  const [rewards, setRewards] = useState<Reward[]>(rewardsProp || [])
  const [points, setPoints] = useState(pointsProp ?? 0)
  const [loading, setLoading] = useState(!rewardsProp)

  useEffect(() => {
    if (rewardsProp) return
    if (!client) return
    setLoading(true)
    Promise.resolve()
      .then(() => {
        setRewards([])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [client, rewardsProp])

  useEffect(() => {
    if (pointsProp !== undefined) setPoints(pointsProp)
  }, [pointsProp])

  return (
    <div className={`bdl-rewards-display ${className || ''}`} style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.heading}>{heading}</h4>
        <div style={styles.pointsBadge}>
          <span style={styles.pointsValue}>{points.toLocaleString()}</span>
          <span style={styles.pointsLabel}>points</span>
        </div>
      </div>

      {loading ? (
        <div style={styles.grid}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={{ ...styles.rewardCard, opacity: 0.5 }}>
              <div style={{ ...styles.skeleton, height: '60px' }} />
              <div style={{ ...styles.skeleton, height: '14px', width: '80%' }} />
            </div>
          ))}
        </div>
      ) : rewards.length === 0 ? (
        <p style={styles.empty}>No rewards available yet. Keep earning points!</p>
      ) : (
        <div style={styles.grid}>
          {rewards.map(reward => {
            const canRedeem = points >= reward.pointsCost
            return (
              <div key={reward.id} style={styles.rewardCard}>
                {reward.imageUrl && <img src={reward.imageUrl} alt={reward.name} style={styles.rewardImage} />}
                <h5 style={styles.rewardName}>{reward.name}</h5>
                {reward.description && <p style={styles.rewardDesc}>{reward.description}</p>}
                <div style={styles.rewardFooter}>
                  <span style={styles.rewardCost}>{reward.pointsCost.toLocaleString()} pts</span>
                  <button
                    onClick={() => canRedeem && onRedeem?.(reward)}
                    disabled={!canRedeem}
                    style={{
                      ...styles.redeemButton,
                      ...(canRedeem ? {} : styles.redeemButtonDisabled),
                    }}
                    type="button"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
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
  pointsBadge: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 'calc(var(--bdl-spacing) * 1)',
    background: 'var(--bdl-color-primary)',
    color: 'var(--bdl-color-primary-text)',
    borderRadius: 'var(--bdl-radius)',
    padding: 'calc(var(--bdl-spacing) * 1) calc(var(--bdl-spacing) * 3)',
  },
  pointsValue: { fontWeight: 'var(--bdl-font-weight-bold)' as any, fontSize: 'var(--bdl-font-size-lg)' },
  pointsLabel: { fontSize: 'var(--bdl-font-size-sm)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'calc(var(--bdl-spacing) * 4)' },
  rewardCard: {
    background: 'var(--bdl-color-bg)',
    border: '1px solid var(--bdl-color-border)',
    borderRadius: 'var(--bdl-radius)',
    padding: 'calc(var(--bdl-spacing) * 4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--bdl-spacing) * 2)',
  },
  rewardImage: { width: '100%', height: '80px', objectFit: 'cover', borderRadius: 'var(--bdl-radius-sm)' },
  rewardName: { margin: 0, fontSize: 'var(--bdl-font-size)', fontWeight: 'var(--bdl-font-weight-bold)' as any, color: 'var(--bdl-color-text)' },
  rewardDesc: { margin: 0, fontSize: 'var(--bdl-font-size-sm)', color: 'var(--bdl-color-text-secondary)' },
  rewardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  rewardCost: { fontSize: 'var(--bdl-font-size-sm)', fontWeight: 'var(--bdl-font-weight-bold)' as any, color: 'var(--bdl-color-accent)' },
  redeemButton: {
    padding: 'calc(var(--bdl-spacing) * 1.5) calc(var(--bdl-spacing) * 3)',
    fontSize: 'var(--bdl-font-size-sm)',
    color: 'var(--bdl-color-primary-text)',
    background: 'var(--bdl-color-primary)',
    border: 'none',
    borderRadius: 'var(--bdl-radius-sm)',
    cursor: 'pointer',
  },
  redeemButtonDisabled: { opacity: 0.4, cursor: 'not-allowed' },
  empty: { color: 'var(--bdl-color-text-muted)', fontSize: 'var(--bdl-font-size)', textAlign: 'center' as const },
  skeleton: {
    width: '100%',
    borderRadius: 'var(--bdl-radius-sm)',
    background: 'var(--bdl-color-surface-hover)',
  },
}
