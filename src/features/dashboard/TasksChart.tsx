import { Bar, BarChart, XAxis, YAxis } from "recharts"
import type { Column } from "../board/types"

type TaskChartProps = {
    columns: Record<string, Column>
}


export const TaskChart = ({ columns } : TaskChartProps) => {

    const data = Object.values(columns).map((column) => ({
        name: column.title,
        tasks: column.taskIds.length
    }))

    return(
        <BarChart data={data} width={400} height={300}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Bar dataKey="tasks" fill="#8884d8" />
        </BarChart>
    )
}