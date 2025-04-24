import { useState, useEffect } from "react";
import { useTaskStatuses } from "../hooks/useTaskStatuses";

export default function TaskForm({ initialData, onSubmit, submitLabel, closeEditModal }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pending");

    const { statuses } = useTaskStatuses();

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setStatus(initialData.status || "");

            if (initialData.due_at) {
                const date = new Date(initialData.due_at);
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, "0");
                const dd = String(date.getDate()).padStart(2, "0");
                const formattedDate = `${yyyy}-${mm}-${dd}`;
                setDueDate(formattedDate);
            } else {
                setDueDate("");
            }
        }
    }, [initialData]);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const task = {
                title,
                description,
                status,
                due_at: dueDate,
            };

            onSubmit(task);

            if (!initialData) {
                setTitle("");
                setDescription("");
                setDueDate("");
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (closeEditModal) {
                closeEditModal();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-8">
            <div>
                <label htmlFor="task-name" className="flex flex-col w-full">
                    Name
                </label>
                <input
                    name="task-name"
                    id="task-name"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    className="border-2 p-2 w-full mt-2 focus:outline-none focus:ring-4 focus:ring-gov-yellow focus:outline-4 focus:outline-gov-yellow box-border"
                />
            </div>
            <div>
                <label htmlFor="task-description" className="flex flex-col w-full">
                    Description
                </label>
                <textarea
                    name="task-description"
                    id="task-description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border-2 p-2 w-full mt-2 focus:outline-none focus:ring-4 focus:ring-gov-yellow focus:outline-4 focus:outline-gov-yellow box-border"
                />
            </div>
            <div>
                <label htmlFor="task-due-date" className="flex flex-col w-full">
                    Due
                </label>
                <input
                    name="task-due-date"
                    id="task-due-date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    type="date"
                    required
                    className="border-2 p-2 w-full mt-2 focus:outline-none focus:ring-4 focus:ring-gov-yellow focus:outline-4 focus:outline-gov-yellow box-border"
                />
            </div>
            {initialData && (
                <div>
                    <label htmlFor="status" className="flex flex-col w-full">
                        Status
                        <select
                            name="status"
                            id="status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="border-2 p-2 w-full"
                        >
                            {statuses.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            <div className="flex place-content-center">
                <button
                    type="submit"
                    className="bg-gov-green-light hover:bg-gov-green focus:bg-gov-yellow focus:text-gov-black active:outline-2 active:outline-gov-yellow active:bg-gov-green active:text-gov-white px-4 py-1 text-sm font-medium border-b-2 border-b-black text-gov-white transition box-border"
                >
                    {submitLabel || (initialData ? "Save Edit" : "Create Task")}
                </button>
            </div>
        </form>
    );
}
