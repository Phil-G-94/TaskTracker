import TaskForm from "../components/TaskForm";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function CreateTaskView({ refetchTasks }) {
    const handleCreateTask = async task => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/create-task`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Failed to create task. Please try again.");
            }

            await response.json();

            refetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return <TaskForm onSubmit={handleCreateTask} submitLabel="Create Task" />;
}
