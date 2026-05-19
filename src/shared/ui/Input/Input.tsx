import type { ChangeEvent } from "react"


type InputProps = {
    value: string
    onChange: (value: string) => void
    placeHolder?: string
    type?: "text" | "email" | "password"
    disabled?: boolean
}

const Input = ({
    value,
    onChange,
    placeHolder,
    type= "text",
    disabled= false,
}: InputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return(
        <input
            className="input"
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeHolder}
            disabled={disabled}
        />
    )
}

export default Input