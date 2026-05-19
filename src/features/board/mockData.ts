import type { BoardData } from "./types";


export const mockData : BoardData = {
    tasks: {
        "task-1": { id: "task-1", title: "Setup project structure", priority: "high" },
        "task-2": { id: "task-2", title: "Create Task component", priority: "low" },
        "task-3": { id: "task-3", title: "Implement drag and drop", priority: "high" },
        "task-4": { id: "task-4", title: "Add authentication logic", priority: "medium" },
        "task-5": { id: "task-5", title: "Connect to backend API", priority: "low" },
        "task-6": { id: "task-6", title: "Refactor state management", priority: "medium" },
    },

    columns: {
        "column-1": {
        id: "column-1",
        title: "Todo",
        taskIds: ["task-1", "task-2", "task-3"],
        },
        "column-2": {
        id: "column-2",
        title: "Doing",
        taskIds: ["task-4", "task-5"],
        },
        "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: ["task-6"],
        },
    },

    columnOrder: ['column-1', 'column-2', 'column-3']
}


