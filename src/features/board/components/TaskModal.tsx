import { useEffect, useState } from "react";
import type { Priority, Task } from "../types";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Modal from "../../../shared/ui/Modal/Modal";
import Select from "../../../shared/ui/Select/Select";


type TaskModalProps = {
    task: Task | null
    onClose: () => void
    onSave: (updatedTask: Task) => void
}


const priorityOptions = [
{ label: "Low", value:"low" },
{ label: "Medium", value:"medium" },
{ label: "High", value:"high" },
]


const TaskModal = ({task, onClose, onSave} : TaskModalProps) => {

    const [title, setTitle] = useState(task?.title || "")
    const [priority, setPriority] = useState(task?.priority || "medium")

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
            priority
        })
        setTitle("")
        onClose()
    }

    useEffect(() => {
        if (!task) return

        setTitle(task.title)
        setPriority(task.priority)
        }, [task])

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

            <Select onChange={(value) => setPriority(value as Priority)} options={priorityOptions} value={priority} />

            <div className="modalActions">
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            </div>
            </div>
        </Modal>
        )
    
}

export default TaskModal;