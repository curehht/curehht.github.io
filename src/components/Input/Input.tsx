'use client'

import React from 'react'
import classes from './Input.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
  prefix?: string
  placeholder?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      id,
      className,
      prefix,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || ''
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    return (
      <div className={classes.component}>
        <label htmlFor={inputId} className={classes.label}>
          {label}
          {required && <span className={classes.required}>*</span>}
        </label>
        <div className={classes.inputContainer}>
          {prefix && <span className={classes.prefix}>{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`${classes.input} ${error ? classes.error : ''} ${className || ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            required={required}
            placeholder={placeholder}
            {...props}
          />
        </div>

        {error && (
          <div id={errorId} className={classes.errorMessage} role="alert">
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={helperId} className={classes.helperText}>
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
