import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import ErrorMessages from "../components/Error";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function CreateTask({ refetchTasks }) {
    const [errors, setErrors] = useState(null);

    const handleCreateTask = async task => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/create-task`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result?.errors);

                return;
            }

            refetchTasks();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setErrors([{ field: null, message }]);
        }
    };

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <>
            <TaskForm onSubmit={handleCreateTask} submitLabel="Create Task" />

            <ErrorMessages errors={errors} />
        </>
    );
}
