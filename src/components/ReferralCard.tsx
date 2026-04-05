import React, { useState, useEffect } from 'react'
import { useLoyalty } from '../hooks/useLoyaltyContext'

export interface ReferralCardProps {
  /** Override stats externally */
  stats?: { totalReferrals: number; successfulReferrals: number; totalClicks: number }
  /** Custom heading */
  heading?: string
  /** Custom CSS className */
  className?: string
}

export function ReferralCard({
  stats: statsProp,
  heading = 'Your referral stats',
  className,
}: ReferralCardProps) {
  const { client, memberId } = useLoyalty()
  const [stats, setStats] = useState(statsProp || { totalReferrals: 0, successfulReferrals: 0, totalClicks: 0 })
  const [loading, setLoading] = useState(!statsProp)

  useEffect(() => {
    if (statsProp || !client || !memberId) return
    setLoading(true)
    client.links.list({ memberId })
      .then(res => {
        const links = res.data || []
        setStats({
          totalReferrals: links.length,
          successfulReferrals: links.filter((l: any) => l.unique_clicks > 0).length,
          totalClicks: links.reduce((sum: number, l: any) => sum + (l.total_clicks || 0), 0),
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [client, memberId, statsProp])

  const items = [
    { label: 'Total links', value: stats.totalReferrals },
    { label: 'Successful', value: stats.successfulReferrals },
    { label: 'Total clicks', value: stats.totalClicks },
  ]

  return (
    <div className={`bdl-referral-card ${className || ''}`} style={styles.card}>
      <h4 style={styles.heading}>{heading}</h4>
      <div style={styles.grid}>
        {loading ? (
          Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.skeleton} />
              <div style={{ ...styles.skeleton, width: '60%', height: '12px' }} />
            </div>
          ))
        ) : (
          items.map(item => (
            <div key={item.label} style={styles.statItem}>
              <span style={styles.statValue}>{item.value}</span>
              <span style={styles.statLabel}>{item.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    fontFamily: 'var(--bdl-font)',
    background: 'var(--bdl-color-surface)',
    border: '1px solid var(--bdl-color-border)',
    borderRadius: 'var(--bdl-radius-lg)',
    padding: 'calc(var(--bdl-spacing) * 5)',
    boxShadow: 'var(--bdl-shadow-sm)',
  },
  heading: {
    margin: '0 0 calc(var(--bdl-spacing) * 4)',
    fontSize: 'var(--bdl-font-size-lg)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-text)',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'calc(var(--bdl-spacing) * 3)' },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'calc(var(--bdl-spacing) * 1)',
    padding: 'calc(var(--bdl-spacing) * 3)',
    background: 'var(--bdl-color-bg)',
    borderRadius: 'var(--bdl-radius)',
  },
  statValue: {
    fontSize: 'var(--bdl-font-size-xl)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-primary)',
  },
  statLabel: { fontSize: 'var(--bdl-font-size-sm)', color: 'var(--bdl-color-text-muted)' },
  skeleton: {
    width: '100%',
    height: '24px',
    borderRadius: 'var(--bdl-radius-sm)',
    background: 'var(--bdl-color-surface-hover)',
  },
}
