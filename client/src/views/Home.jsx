import { useState, useEffect } from "react";
import TasksDisplay from "./TasksDisplay";
import CreateTask from "./CreateTask";
import ErrorMessages from "../components/Error";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    const [taskData, setTaskData] = useState(null);
    const [taskQuantity, setTaskQuantity] = useState(null);
    const [errors, setErrors] = useState(null);

    const getTasks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks`, {
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                setErrors(result?.errors);

                return;
            }

            const result = await response.json();

            const { tasks, quantity } = result.data;

            setTaskData(tasks);
            setTaskQuantity(quantity);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setErrors([{ field: null, message }]);
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

            <div className="flex flex-col gap-4">
                <section>
                    <CreateTask refetchTasks={getTasks} />
                </section>
                <section>
                    <TasksDisplay taskData={taskData} taskQuantity={taskQuantity} refetchTasks={getTasks} />
                </section>
            </div>
            <ErrorMessages errors={errors} />
        </>
    );
}
