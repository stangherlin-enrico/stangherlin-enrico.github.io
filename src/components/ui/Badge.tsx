type Props = {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}

export function Badge({ children, onClick, active }: Props) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors'
  const style = active
    ? 'bg-accent-600 text-white'
    : onClick
    ? 'bg-gray-100 text-gray-700 hover:bg-accent-100 hover:text-accent-700 cursor-pointer'
    : 'bg-gray-100 text-gray-600'

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${style}`}>
        {children}
      </button>
    )
  }

  return <span className={`${base} ${style}`}>{children}</span>
}
