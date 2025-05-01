import { useState, useEffect } from "react";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";

import Modal from "./Modal";
import EditTask from "../views/EditTask";
import { formatStatus, formatDate } from "../utils/utils";
import ErrorMessages from "./Error";
import { Link } from "wouter";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function TaskCard({ task, refetchTasks }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [errors, setErrors] = useState(null);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    const formattedStatus = formatStatus(task.status);
    const dueDate = formatDate(task.due_at);
    const updatedAt = formatDate(task.updated_at);

    const handleDeleteTask = async taskId => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
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
        <Link href={`tasks/${task.id}`}>
            <article className="w-full sm:w-[300px] h-full flex flex-col justify-between bg-white border border-gray-200 p-4 rounded-2xl shadow-lg transition hover:shadow-2xl hover:border-gov-black">
                <div className="flex flex-col justify-between grow gap-2">
                    <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line line-clamp-2">{task.description}</p>
                    <p className="text-sm text-gray-500 font-medium">Status: {formattedStatus}</p>
                    <p className="text-sm text-gray-400">Due: {dueDate}</p>
                    <p className="text-sm text-gray-400">Updated: {updatedAt}</p>

                    <div className="flex flex-row justify-center gap-3 mt-4">
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="bg-gov-green-light hover:bg-gov-green hover:cursor-pointer px-4 py-1 text-sm font-medium border-b-2 border-b-black text-white transition"
                        >
                            <UseAnimations animation={trash2} strokeColor="#FFFFFF" title="Delete" />
                        </button>
                        <button
                            onClick={openEditModal}
                            className="bg-gov-green-light hover:bg-gov-green hover:cursor-pointer px-4 py-1 text-sm font-medium border-b-2 border-b-black text-white transition"
                        >
                            <UseAnimations animation={edit} strokeColor="#FFFFFF" title="Edit" />
                        </button>
                    </div>
                    <ErrorMessages errors={errors} />
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
        </Link>
    );
}
