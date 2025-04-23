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

    const handleEditTask = async task => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Failed to edit task. Please try again.");
            }

            await response.json();

            refetchTasks();
        } catch (error) {
            console.log(error);
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

    return <TaskForm onSubmit={handleEditTask} initialData={taskData} closeEditModal={closeEditModal} />;
}
