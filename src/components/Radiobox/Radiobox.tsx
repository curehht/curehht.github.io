import classes from './Radiobox.module.css'

export const Radiobox = ({
  name,
  value,
  checked,
  onChange,
  label,
  disabled,
}: {
  name: string
  value: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  disabled?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={classes.component}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className={classes.label}>{label}</label>
    </div>
  )
}
