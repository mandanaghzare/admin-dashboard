import { Draggable } from "@hello-pangea/dnd"
import type { Task } from "./types"
import { MdEdit } from "react-icons/md"

type TaskCardProps = {
    title: string
    onDelete: () => void
    onMove: () => void
    index: number
    taskId: string
    task: Task
    onEdit: () => void
}

export const TaskCard = ({title, onDelete, onMove, index, taskId, onEdit}: TaskCardProps) => {
    return <Draggable draggableId={taskId} index={index}>
                {(provided) => (
                    <div className="card" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <button onClick={() => onEdit()} className="editBtn">
                            <MdEdit  />
                        </button>
                        <div className="title">{title}</div>
                        <div className="action">
                            <button className="deleteBtn" onClick={onDelete}>Delete</button>
                            <button className="moveBtn" onClick={onMove}>Move To Next Level</button>
                        </div>
                    </div>
                )}
            </Draggable>
}