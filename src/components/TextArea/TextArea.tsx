'use client'

import React from 'react'
import classes from './TextArea.module.css'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
  rows?: number
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      id,
      className,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`

    return (
      <div className={classes.component}>
        <label htmlFor={textareaId} className={classes.label}>
          {label}
          {required && <span className={classes.required}>*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={`${classes.textarea} ${error ? classes.error : ''} ${className || ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          required={required}
          rows={rows}
          {...props}
        />
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

TextArea.displayName = 'TextArea'
