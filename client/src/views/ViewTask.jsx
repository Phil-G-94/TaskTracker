import { useState, useEffect } from "react";
import { useParams } from "wouter";
import Task from "../components/Task";
import ErrorMessages from "../components/Error";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ViewTask() {
    const [task, setTask] = useState(null);
    const [notes, setNotes] = useState(null);
    const [errors, setErrors] = useState(null);
    const params = useParams();

    const { taskId } = params;

    useEffect(() => {
        const getTask = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                    headers: { "Content-Type": "application/json" },
                });

                const result = await response.json();

                if (!response.ok) {
                    setErrors(result?.errors);

                    return;
                }

                setTask(result.data.task);
                setNotes(result.data.notes);
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                setErrors([{ field: null, message }]);
            }
        };

        getTask();
    }, [taskId]);

    return (
        <>
            <Task task={task} notes={notes} />
            <ErrorMessages errors={errors} />
        </>
    );
}
