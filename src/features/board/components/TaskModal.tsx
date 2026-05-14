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
        if(!task) return 

        onSave({
            ...task,
            title,
        })

        onClose()
    }



    return(
        <div className="taskTitle">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
    
}

export default TaskModal;