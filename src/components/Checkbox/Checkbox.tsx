'use client'

import React from 'react'
import classes from './Checkbox.module.css'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, error, helperText, required = false, id, className, ...props },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${checkboxId}-error`
    const helperId = `${checkboxId}-helper`

    return (
      <div className={classes.component}>
        <div className={classes.checkboxContainer}>
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`${classes.checkbox} ${error ? classes.error : ''} ${className || ''}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            required={required}
            {...props}
          />
          <label htmlFor={checkboxId} className={classes.label}>
            {label}
            {required && <span className={classes.required}>*</span>}
          </label>
        </div>
        {error && (
          <span id={errorId} className={classes.errorMessage} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className={classes.helperText}>
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
