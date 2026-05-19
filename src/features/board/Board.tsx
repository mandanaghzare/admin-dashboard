import { useEffect, useState } from "react"
import { mockData } from "./mockData"
import type { BoardData, Task } from "./types"
import { Column } from "./Column"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { TaskChart } from "../dashboard/TasksChart"
import { LiveActivityChart } from "../dashboard/LiveActivityChart"
import { loadBoard, saveBoard } from "../../shared/lib/storage"
import TaskModal from "./components/TaskModal"
import Button from "../../shared/ui/Button"
import Input from "../../shared/ui/Input"

const Board = () => {
  
  const [ data, setData] = useState<BoardData>(()=> {
    const saveBoard = loadBoard()
    if (saveBoard) {
      return saveBoard
    }
    return structuredClone(mockData)
  })
  
  const {tasks, columns, columnOrder} = data;
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)


  

  const handleAddTask = () => {
    setData((prev) => {
      if(!taskTitle.trim()) return prev
      setTaskTitle("")
      const todoColumnId = Object.keys(prev.columns).find(
        (id) => prev.columns[id].title.toLowerCase() === "todo"
      )

      if (!todoColumnId) return prev

      const newId = `task-${Date.now()}`
      // const nextN = Object.keys(prev.tasks).length + 1
      const newTask = {
        id: newId,
        title: taskTitle,
      }

      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [newId]: newTask,
        },
        columns: {
          ...prev.columns,
          [todoColumnId]:
          {
            ...prev.columns[todoColumnId],
            taskIds: [...prev.columns[todoColumnId].taskIds, newId],
          },
        },
      }
    })
  }

  const handleDeleteTask = (taskId: string) => {
    setData((prev) => {
      
      if (!prev.tasks[taskId]) return prev
      const newTasks = { ...prev.tasks }
      delete newTasks[taskId]

    const newColumns = Object.fromEntries(
      Object.entries(prev.columns).map(([columnId, column]) => {
        return [
          columnId,
          {
            ...column,
            taskIds: column.taskIds.filter(id => id !== taskId)
          }
        ]
      })  
      )
      return{
        ...prev,
        tasks: newTasks,
        columns: newColumns
      }

    })
  }

  const handleMoveTask = (taskId: string) => {
    setData((prev) => {
      const sourceEntry = Object.entries(prev.columns).find(
        ([, column]) => column.taskIds.includes(taskId)
      )

      if (!sourceEntry) return prev

      const [sourceColumnId, sourceColumn] = sourceEntry
      const sourceIndex = prev.columnOrder.indexOf(sourceColumnId)

      if (sourceIndex === -1) return prev
      if (sourceIndex === prev.columnOrder.length - 1) return prev

      const destinationColumnId = prev.columnOrder[sourceIndex + 1]
      const destinationColumn = prev.columns[destinationColumnId]

      if (!destinationColumn) return prev

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: sourceColumn.taskIds.filter((id) => id !== taskId),
          },
          [destinationColumnId]: {
            ...destinationColumn,
            taskIds: [...destinationColumn.taskIds, taskId],
          },
        },
      }
    })
  }

  const handleDragEnd = (result: DropResult) => {
    const {source, destination, draggableId} = result
    if(!destination) return
    if(source.index === destination.index && source.droppableId === destination.droppableId) return
    setData((prev) => {
      const sourceColumnId = source.droppableId
      const destinationColumnId = destination.droppableId
      const sourceColumn = prev.columns[sourceColumnId]
      const destinationColumn = prev.columns[destinationColumnId]
      const sourceTaskIds = [...sourceColumn.taskIds]
      const destinationTaskIds = [...destinationColumn.taskIds]

      if (!destinationColumn) return prev
      if (!sourceColumn || !destinationColumn) return prev
      if (sourceColumnId === destinationColumnId) {
        const sameColumnTaskIds = [...sourceColumn.taskIds]
        const removed = sameColumnTaskIds.splice(source.index, 1)
        const movedTaskId = removed[0]
        sameColumnTaskIds.splice(destination.index, 0, movedTaskId)
        return{
          ...prev,
          columns: {
            ...prev.columns,
            [sourceColumnId]: {
              ...sourceColumn,
              taskIds: sameColumnTaskIds
            }
          }
        }
      }

      sourceTaskIds.splice(source.index, 1)
      destinationTaskIds.splice(destination.index, 0, draggableId)

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: sourceTaskIds,
          },
          [destinationColumnId]: {
            ...destinationColumn,
            taskIds: destinationTaskIds,
          },
        },
      }
    })
  }

  

  const handleUpdateTask = (updateTask: Task) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [updateTask.id]: updateTask
      }
    }))
  }

  useEffect(() => {
    saveBoard(data)
  }, [data])

  return (
    <div className='board'>
        <div className='widget'>
            <h1>Board</h1>
        </div>
        <div className="addButton">
          <Input 
            type="text"
            value={taskTitle}
            onChange={setTaskTitle}
            placeHolder="Enter Task..."
          />
          <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
        </div>
        <div className="todoList">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="cardsList">
              {columnOrder.map((columnId) => {
                const column = columns[columnId]
                if(!column) return null

                return(
                  <Column 
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                    onMoveTask={handleMoveTask}
                    onEditTask={(task) => setSelectedTask(task)}
                  />
                )
              })

              }
            </div>
          </DragDropContext>
          <TaskChart columns={columns} />
        </div>        
        <LiveActivityChart />
        <TaskModal task={selectedTask} onSave={handleUpdateTask} onClose={() => setSelectedTask(null)} />
    </div>
  )
}

export default Board