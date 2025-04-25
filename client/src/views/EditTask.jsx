import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function EditTask({
    closeEditModal,
    taskId,
    taskTitle,
    taskDescription,
    dueDate,
    taskStatus,
    refetchTasks,
}) {
    const [taskData, setTaskData] = useState(null);
    const [errors, setErrors] = useState(null);

    const handleEditTask = async task => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: "PATCH",
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
        const task = {
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            due_at: dueDate,
        };
        setTaskData(task);
    }, [taskTitle, taskDescription, dueDate, taskStatus]);

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
            <TaskForm onSubmit={handleEditTask} initialData={taskData} closeEditModal={closeEditModal} />
            <ErrorMessages errors={errors} />
        </>
    );
}
