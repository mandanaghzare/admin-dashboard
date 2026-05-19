import { TaskCard } from "./TaskCard"
import type { Column as ColumnType, Task } from "./types"
import { Droppable } from "@hello-pangea/dnd"

type ColumnProps = {
    column: ColumnType
    tasks: Record<string,Task>
    onDeleteTask: (taskId: string) => void
    onMoveTask: (taskId: string) => void
    onEditTask: (task: Task) => void
}

export const Column = ({column, tasks, onDeleteTask, onMoveTask, onEditTask}: ColumnProps) => {
    const visibleTasks = column.taskIds
    .map((taskId) => tasks[taskId])
    .filter(Boolean)
    
    return(
        <div className="column">
            <h3 className="columnTitle">{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div className="cardList" ref={provided.innerRef} {...provided.droppableProps}>
                        {visibleTasks.length === 0 ? (
                            <div className="emptyState">
                                No tasks found
                            </div>
                            ) : (
                            visibleTasks.map((task, index) => (
                                <TaskCard
                                key={task.id}
                                index={index}
                                taskId={task.id}
                                title={task.title}
                                task={task}
                                onDelete={() => onDeleteTask(task.id)}
                                onMove={() => onMoveTask(task.id)}
                                onEdit={() => onEditTask(task)}
                                />
                            ))
                        )}
                        {provided.placeholder}
                    </div>      
                )}                          
            </Droppable>
        </div>
    )
}