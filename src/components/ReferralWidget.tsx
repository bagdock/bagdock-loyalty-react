import React, { useState, useEffect, useCallback } from 'react'
import { useLoyalty } from '../hooks/useLoyaltyContext'

export interface ReferralWidgetProps {
  /** Override the referral code displayed */
  referralCode?: string
  /** Short-link domain (defaults to bdok.to) */
  shortlinkDomain?: string
  /** Enable share buttons */
  showShare?: boolean
  /** Custom heading */
  heading?: string
  /** Custom description */
  description?: string
  /** Custom CSS className */
  className?: string
  /** Called when referral link is successfully shared */
  onShare?: (method: string) => void
  /** Called when link is copied to clipboard */
  onCopy?: () => void
}

export function ReferralWidget({
  referralCode: codeProp,
  shortlinkDomain = 'bdok.to',
  showShare = true,
  heading = 'Refer a friend',
  description = 'Share your unique link and earn rewards when friends sign up.',
  className,
  onShare,
  onCopy,
}: ReferralWidgetProps) {
  const { client, memberId } = useLoyalty()
  const [code, setCode] = useState(codeProp || '')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(!codeProp)

  useEffect(() => {
    if (codeProp || !client || !memberId) return
    setLoading(true)
    client.links.list({ memberId, limit: 1 })
      .then(res => {
        const link = res.data?.[0]
        if (link?.code) setCode(link.code)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [client, memberId, codeProp])

  const referralUrl = code ? `https://${shortlinkDomain}/${code}` : ''

  const handleCopy = useCallback(async () => {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch { /* noop */ }
  }, [referralUrl, onCopy])

  const handleShare = useCallback((method: string) => {
    if (!referralUrl) return
    const text = encodeURIComponent(`Check this out: ${referralUrl}`)
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      whatsapp: `https://wa.me/?text=${text}`,
      email: `mailto:?subject=${encodeURIComponent('Join me!')}&body=${text}`,
    }
    if (urls[method]) window.open(urls[method], '_blank', 'noopener')
    onShare?.(method)
  }, [referralUrl, onShare])

  return (
    <div className={`bdl-referral-widget ${className || ''}`} style={widgetStyles.container}>
      <div style={widgetStyles.header}>
        <h3 style={widgetStyles.heading}>{heading}</h3>
        <p style={widgetStyles.description}>{description}</p>
      </div>

      <div style={widgetStyles.codeContainer}>
        {loading ? (
          <div style={widgetStyles.skeleton} />
        ) : code ? (
          <>
            <code style={widgetStyles.code}>{referralUrl}</code>
            <button onClick={handleCopy} style={widgetStyles.copyButton} type="button">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </>
        ) : (
          <span style={widgetStyles.muted}>No referral link available</span>
        )}
      </div>

      {showShare && code && (
        <div style={widgetStyles.shareRow}>
          <button onClick={() => handleShare('twitter')} style={widgetStyles.shareButton} type="button">X / Twitter</button>
          <button onClick={() => handleShare('whatsapp')} style={widgetStyles.shareButton} type="button">WhatsApp</button>
          <button onClick={() => handleShare('email')} style={widgetStyles.shareButton} type="button">Email</button>
        </div>
      )}
    </div>
  )
}

const widgetStyles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'var(--bdl-font)',
    background: 'var(--bdl-color-surface)',
    border: '1px solid var(--bdl-color-border)',
    borderRadius: 'var(--bdl-radius-lg)',
    padding: 'calc(var(--bdl-spacing) * 6)',
    boxShadow: 'var(--bdl-shadow-md)',
  },
  header: { marginBottom: 'calc(var(--bdl-spacing) * 4)' },
  heading: {
    margin: 0,
    fontSize: 'var(--bdl-font-size-xl)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-text)',
  },
  description: {
    margin: 'calc(var(--bdl-spacing) * 2) 0 0',
    fontSize: 'var(--bdl-font-size)',
    color: 'var(--bdl-color-text-secondary)',
  },
  codeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--bdl-spacing) * 2)',
    background: 'var(--bdl-color-bg)',
    border: '1px solid var(--bdl-color-border)',
    borderRadius: 'var(--bdl-radius)',
    padding: 'calc(var(--bdl-spacing) * 3)',
  },
  code: {
    flex: 1,
    fontFamily: 'var(--bdl-font-mono)',
    fontSize: 'var(--bdl-font-size-sm)',
    color: 'var(--bdl-color-text)',
    background: 'transparent',
    wordBreak: 'break-all' as const,
  },
  copyButton: {
    flexShrink: 0,
    padding: 'calc(var(--bdl-spacing) * 2) calc(var(--bdl-spacing) * 4)',
    fontSize: 'var(--bdl-font-size-sm)',
    fontWeight: 'var(--bdl-font-weight-bold)' as any,
    color: 'var(--bdl-color-primary-text)',
    background: 'var(--bdl-color-primary)',
    border: 'none',
    borderRadius: 'var(--bdl-radius-sm)',
    cursor: 'pointer',
  },
  shareRow: {
    display: 'flex',
    gap: 'calc(var(--bdl-spacing) * 2)',
    marginTop: 'calc(var(--bdl-spacing) * 4)',
  },
  shareButton: {
    flex: 1,
    padding: 'calc(var(--bdl-spacing) * 2)',
    fontSize: 'var(--bdl-font-size-sm)',
    color: 'var(--bdl-color-text)',
    background: 'var(--bdl-color-surface-hover)',
    border: '1px solid var(--bdl-color-border)',
    borderRadius: 'var(--bdl-radius-sm)',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
  skeleton: {
    width: '100%',
    height: '20px',
    borderRadius: 'var(--bdl-radius-sm)',
    background: 'var(--bdl-color-surface-hover)',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  muted: { color: 'var(--bdl-color-text-muted)', fontSize: 'var(--bdl-font-size-sm)' },
}
