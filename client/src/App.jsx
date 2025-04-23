import TasksDisplay from "./views/TasksDisplay";
import CreateTask from "./views/CreateTask";
import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function App() {
    const [taskData, setTaskData] = useState(null);
    const [taskQuantity, setTaskQuantity] = useState(null);

    const getTasks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks`, {
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks. Please try again. ");
            }

            const result = await response.json();

            const { tasks, quantity } = result.data;

            setTaskData(tasks);
            setTaskQuantity(quantity);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <header className="bg-gov-black p-10">
                <h1 className="text-4xl text-center text-gov-white">TaskTracker</h1>
            </header>
            <div className="h-4 w-full">
                <div className="h-2 bg-gov-blue"></div>
            </div>

            <CreateTask refetchTasks={getTasks} />
            <TasksDisplay taskData={taskData} taskQuantity={taskQuantity} refetchTasks={getTasks} />
        </>
    );
}
