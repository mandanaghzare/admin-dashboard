import "./Select.scss"

type SelectProps = {
    value: string
    onChange: (value: string) => void
    options: {
        label: string
        value: string
    }[]
}

const Select = ({
    value,
    onChange,
    options,
}: SelectProps) => {
    return(
        <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="select"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}

        </select>
    )
}


export default Select;