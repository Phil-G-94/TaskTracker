import { useState } from "react";
import Note from "../components/Note";
import ErrorMessages from "../components/Error";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function AddNote({ taskId }) {
    const [errors, setErrors] = useState(null);
    const handleAddNote = async (content, taskId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result?.errors);

                return;
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setErrors([{ field: null, message }]);
        }
    };

    return (
        <>
            <Note taskId={taskId} handleAddNote={handleAddNote} />
            {errors && <ErrorMessages errors={errors} />}
        </>
    );
}
