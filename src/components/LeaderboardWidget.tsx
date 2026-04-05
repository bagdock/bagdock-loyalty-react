import React from 'react'

export interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  referrals?: number
  avatarUrl?: string
}

export interface LeaderboardWidgetProps {
  entries: LeaderboardEntry[]
  /** Current member's ID to highlight */
  currentMemberId?: string
  heading?: string
  className?: string
}

export function LeaderboardWidget({
  entries,
  heading = 'Leaderboard',
  className,
}: LeaderboardWidgetProps) {
  return (
    <div className={`bdl-leaderboard ${className || ''}`} style={styles.container}>
      <h4 style={styles.heading}>{heading}</h4>
      <div style={styles.list}>
        {entries.map(entry => (
          <div key={entry.rank} style={styles.entry}>
            <span style={styles.rank}>#{entry.rank}</span>
            <div style={styles.nameCol}>
              {entry.avatarUrl && <img src={entry.avatarUrl} alt="" style={styles.avatar} />}
              <span style={styles.name}>{entry.name}</span>
            </div>
            <div style={styles.stats}>
              <span style={styles.points}>{entry.points.toLocaleString()} pts</span>
              {entry.referrals !== undefined && (
                <span style={styles.referrals}>{entry.referrals} referrals</span>
              )}
            </div>
          </div>
        ))}
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
    padding: 'calc(var(--bdl-spacing) * 5)',
    boxShadow: 'var(--bdl-shadow-sm)',
  },
  heading: {
    margin: '0 0 calc(var(--bdl-spacing) * 4)',
    fontSize: 'var(--bdl-font-size-lg)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-text)',
  },
  list: { display: 'flex', flexDirection: 'column', gap: 'calc(var(--bdl-spacing) * 2)' },
  entry: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--bdl-spacing) * 3)',
    padding: 'calc(var(--bdl-spacing) * 3)',
    background: 'var(--bdl-color-bg)',
    borderRadius: 'var(--bdl-radius)',
  },
  rank: {
    width: '32px',
    textAlign: 'center' as const,
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-accent)',
    fontSize: 'var(--bdl-font-size)',
  },
  nameCol: { flex: 1, display: 'flex', alignItems: 'center', gap: 'calc(var(--bdl-spacing) * 2)' },
  avatar: { width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' as const },
  name: { fontSize: 'var(--bdl-font-size)', color: 'var(--bdl-color-text)' },
  stats: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' },
  points: {
    fontSize: 'var(--bdl-font-size-sm)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-primary)',
  },
  referrals: { fontSize: 'var(--bdl-font-size-sm)', color: 'var(--bdl-color-text-muted)' },
}
