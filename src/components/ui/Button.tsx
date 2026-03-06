import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | LinkProps

const variants = {
  primary:
    'bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-500',
  secondary:
    'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({ variant = 'primary', size = 'md', ...props }: Props) {
  const classes = `inline-flex items-center gap-2 rounded-md font-medium transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    ${variants[variant]} ${sizes[size]}`

  if ('href' in props && props.href) {
    const { href, ...rest } = props as LinkProps
    return (
      <a href={href} className={classes} {...rest} />
    )
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />
}
