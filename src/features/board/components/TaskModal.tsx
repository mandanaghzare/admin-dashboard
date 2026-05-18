import { useState } from "react";
import type { Task } from "../types";


type TaskModalProps = {
    task: Task | null
    onClose: () => void
    onSave: (updatedTask: Task) => void
}



const TaskModal = ({task, onClose, onSave} : TaskModalProps) => {

    const [title, setTitle] = useState(task?.title || "")


    const handleSave = () => {
    console.log("hi")
        if(!task) return 

        onSave({
            ...task,
            title,
        })

        onClose()
    }

    if (!task) return null


    return (
        <div className="modalOverlay">
            <div className="modalContent">
            <h2>Edit Task</h2>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="modalActions">
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
            </div>
        </div>
        )
    
}

export default TaskModal;