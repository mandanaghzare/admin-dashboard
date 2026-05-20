export type Column = { id: string; title: string; taskIds: string[];}
export type BoardData = {
    tasks: Record<string, Task>
    columns: Record<string, Column>
    columnOrder: string[]
}
export type Priority = "low" | "medium" | "high"
export type PriorityFilter = Priority | "all"
export type Task = { 
    id: string; 
    title: string;
    priority: Priority;
}
