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
    return(
        <div className="column">
            <h3 className="columnTitle">{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div className="cardList" ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            column.taskIds.map((taskId, index) => {
                                const task = tasks[taskId]
                                if(!task) return null

                                return <TaskCard 
                                            index={index}
                                            key={task.id}
                                            taskId={task.id}
                                            title={task.title}
                                            onDelete={() => onDeleteTask(taskId)} 
                                            onMove={() => onMoveTask(taskId)}
                                            onEdit={() => {console.log("edit reached Column", task)
                                                onEditTask(task)
                                            }}
                                            task={task}
                                        />
                            })
                        }
                        {provided.placeholder}
                    </div>      
                )}                          
            </Droppable>
        </div>
    )
}