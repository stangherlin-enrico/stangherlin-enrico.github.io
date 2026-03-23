type Props = {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}

export function Badge({ children, onClick, active }: Props) {
  const base = 'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium font-mono transition-colors'
  const style = active
    ? 'border-primary bg-primary/10 text-primary'
    : onClick
    ? 'border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary cursor-pointer'
    : 'border-border bg-secondary text-secondary-foreground'

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${style}`}>
        {children}
      </button>
    )
  }

  return <span className={`${base} ${style}`}>{children}</span>
}
