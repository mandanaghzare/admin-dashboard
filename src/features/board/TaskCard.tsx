import { Draggable } from "@hello-pangea/dnd"
import type { Task } from "./types"
import { MdEdit } from "react-icons/md"
import Button from "../../shared/ui/Button"

type TaskCardProps = {
    title: string
    onDelete: () => void
    onMove: () => void
    index: number
    taskId: string
    task: Task
    onEdit: () => void
}

export const TaskCard = ({title, onDelete, onMove, index, taskId, onEdit, task}: TaskCardProps) => {
    return <Draggable draggableId={taskId} index={index}>
                {(provided) => (
                    <div className="card" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <button onClick={() => {onEdit()}} className="editBtn">
                            <MdEdit  />
                        </button>
                        <div className="title">{title}</div>
                        <div className={`priority priority-${task.priority}`}>
                            {task.priority}
                        </div>
                        <div className="action">
                            <Button variant="danger" onClick={onDelete}>Delete</Button>
                            <Button variant="primary" onClick={onMove}>Move To Next Level</Button>
                        </div>
                    </div>
                )}
            </Draggable>
}