import {type ReactNode } from "react"
import "./Modal.scss"


type ModalProps = {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}

const Modal = ({
    children,
    isOpen,
    onClose,
}: ModalProps) => {
    if(!isOpen) return null

    return(
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal