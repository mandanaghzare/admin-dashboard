import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer  } from "recharts"


type Point = {
    time: string,
    value: number
}


export const LiveActivityChart = () => {
    const [points, setPoints] = useState<Point[]>([])
    
    useEffect(() => {
        const interval = setInterval(() => {
            const newPoint = {
                time: new Date().toLocaleTimeString(),
                value: Math.floor(Math.random() * 100)
            }
            setPoints((prev) => [...prev.slice(-9), newPoint])
        }, 2000)
        return () => clearInterval(interval)
    })
    return (
        <div className="live-chart">
            Live Activity
            <ResponsiveContainer width="100%" height={300}>
                <LineChart  width={500} height={300} data={points}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>                
            </ResponsiveContainer>
        </div>
    )

}