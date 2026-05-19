import type { ReactNode } from "react"
import "./Button.scss"

type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    variant?: "primary" | "danger" | "secondary"
    type?: "button" | "submit"
    disabled?: boolean
}

const Button = ({
    children,
    onClick,
    variant = "primary",
    type = "button",
    disabled= false,
}: ButtonProps) => {
    return(
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn--${variant}`}
        >
            {children}
        </button>
    )
}

export default Button