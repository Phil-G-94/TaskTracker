import { useState } from "react";
import Modal from "./Modal";
import EditTask from "../views/EditTask";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function TaskCard({ task, refetchTasks }) {
    const [showEditModal, setShowEditModal] = useState(false);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    const formatStatus = status => {
        return status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    };

    const formattedStatus = formatStatus(task.status);

    const dueDate = new Date(task.due_at).toLocaleDateString();

    const handleDeleteTask = async taskId => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to delete task. Please try again.");
            }

            await response.json();

            refetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <article className="w-full sm:w-[300px] h-full flex flex-col justify-between bg-white border border-gray-200 p-4 rounded-2xl shadow-lg transition hover:shadow-2xl hover:border-gov-black">
            <div className="flex flex-col justify-between grow gap-2">
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 whitespace-pre-line line-clamp-2">{task.description}</p>
                <p className="text-sm text-gray-500 font-medium">Status: {formattedStatus}</p>
                <p className="text-sm text-gray-400">{dueDate}</p>

                <div className="flex flex-row justify-center gap-3 mt-4">
                    <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="px-4 py-1 rounded-full text-sm font-medium border-2 text-black transition"
                    >
                        Delete
                    </button>
                    <button
                        onClick={openEditModal}
                        className="px-4 py-1 rounded-full text-sm font-medium border-2 text-black transition"
                    >
                        Edit
                    </button>
                </div>
            </div>
            {showEditModal && (
                <Modal closeEditModal={closeEditModal}>
                    <EditTask
                        closeEditModal={closeEditModal}
                        taskId={task.id}
                        taskTitle={task.title}
                        taskDescription={task.description}
                        dueDate={task.due_at}
                        taskStatus={task.status}
                        refetchTasks={refetchTasks}
                    />
                </Modal>
            )}
        </article>
    );
}
