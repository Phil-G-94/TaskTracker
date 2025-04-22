import { useState, useEffect } from "react";

export default function TaskForm({ initialData, onSubmit, submitLabel }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
        }
    }, [initialData]);

    const handleSubmit = event => {
        event.preventDefault();

        const task = {
            title,
            description,
            due_at: dueDate,
        };

        onSubmit(task);

        if (!initialData) {
            setTitle("");
            setDescription("");
            setDueDate("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
            <div>
                <label htmlFor="task-name" className="flex flex-col w-full">
                    Name
                    <input
                        name="task-name"
                        id="task-name"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="border-2 rounded-md p-2 w-full"
                    />
                </label>
            </div>
            <div>
                <label htmlFor="task-description" className="flex flex-col w-full">
                    Description
                    <textarea
                        name="task-description"
                        id="task-description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className="border-2 rounded-md p-2 w-full whitespace-pre-line"
                    />
                </label>
            </div>
            <div>
                Due
                <label htmlFor="task-due-date" className="flex flex-col w-full">
                    <input
                        name="task-due-date"
                        id="task-due-date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        type="date"
                        required
                        className="border-2 rounded-md p-2 w-full"
                    />
                </label>
            </div>
            <div className="flex place-content-center">
                <button
                    type="Submit"
                    className="px-4 py-1 rounded-full text-sm font-medium border-2 text-black transition"
                >
                    {submitLabel || (initialData ? "Edit Task" : "Create Task")}
                </button>
            </div>
        </form>
    );
}
