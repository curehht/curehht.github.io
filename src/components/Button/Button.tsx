'use client'

import React from 'react'
import classes from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={`${classes.button} ${classes[variant]} ${classes[size]} ${className || ''}`}
        disabled={isDisabled}
        {...props}
      >
        {loading && <span className={classes.spinner} />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
