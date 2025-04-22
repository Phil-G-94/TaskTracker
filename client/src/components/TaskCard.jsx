export default function TaskCard({ task }) {
    const dueDate = new Date(task.due_at).toDateString();

    return (
        <article className="w-full sm:w-[300px] bg-white border-1 border-gray-200 p-4 rounded-2xl shadow-lg transition hover:shadow-2xl hover:border-gov-black">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500 font-medium">Status: {task.status}</p>
                <p className="text-sm text-gray-400">{dueDate}</p>

                <div className="flex flex-row justify-center gap-3 mt-4">
                    <button className="px-4 py-1 rounded-full text-sm font-medium border-2 text-black transition">
                        Edit
                    </button>
                    <button className="px-4 py-1 rounded-full text-sm font-medium border-2 text-black transition">
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}
