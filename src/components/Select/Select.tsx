import classes from './Select.module.css'

type SelectProps = {
  id: string
  label: string
  name: string
  options: string[]
  required: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
  id,
  label,
  name,
  options,
  required,
  value = 'no-value',
  onChange,
}: SelectProps) => {
  return (
    <div className={classes.component}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={classes.select}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
