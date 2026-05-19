import { useState } from "react";
import type { Task } from "../types";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Modal from "../../../shared/ui/Modal/Modal";


type TaskModalProps = {
    task: Task | null
    onClose: () => void
    onSave: (updatedTask: Task) => void
}



const TaskModal = ({task, onClose, onSave} : TaskModalProps) => {

    const [title, setTitle] = useState(task?.title || "")

    const handleClose = () => {
        setTitle("")
        onClose()
    }

    const handleSave = () => {
        if(!task) return 
        if(!title) return

        onSave({
            ...task,
            title,
        })
        setTitle("")
        onClose()
    }

    if (!task) return null


    return (
        <Modal isOpen={!!task} onClose={onClose}>
            <div className="modalContent">
            <h2>Edit Task</h2>

            <Input
                value={title}
                onChange={setTitle}
                placeHolder="Edit Task..."
            />

            <div className="modalActions">
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            </div>
            </div>
        </Modal>
        )
    
}

export default TaskModal;