import { Draggable } from "@hello-pangea/dnd"

type TaskCardProps = {
    title: string
    onDelete: () => void
    onMove: () => void
    index: number
    taskId: string
}

export const TaskCard = ({title, onDelete, onMove, index, taskId}: TaskCardProps) => {
    return <Draggable draggableId={taskId} index={index}>
                {(provided) => (
                    <div className="card" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <div className="title">{title}</div>
                        <div className="action">
                            <button className="deleteBtn" onClick={onDelete}>Delete</button>
                            <button className="moveBtn" onClick={onMove}>Move To Next Level</button>
                        </div>
                    </div>
                )}
            </Draggable>
}