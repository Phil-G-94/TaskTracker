import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

import { formatStatus, formatDate } from "../utils/utils";

export default function Task({ task }) {
    if (!task) {
        return (
            <div className="flex justify-center items-center w-full h-full flex-grow mt-44">
                <UseAnimations animation={loading2} size={100} fillColor="#1D70B8" />
            </div>
        );
    }

    const formattedStatus = formatStatus(task.status);
    const dueDate = formatDate(task.due_at);
    const updatedAt = formatDate(task.updated_at);

    return (
        <>
            <section>
                <h3 className="text-2xl text-center font-semibold text-gray-800">{task.title}</h3>
                <article className="flex flex-col justify-center items-center">
                    <p className="text-gray-600 whitespace-pre-line line-clamp-2">{task.description}</p>
                    <p className="text-gray-600 whitespace-pre-line line-clamp-2">{task.notes}</p>
                    <p className="text-sm text-gray-500 font-medium">Status: {formattedStatus}</p>
                    <p className="text-sm text-gray-400">Due: {dueDate}</p>
                    <p className="text-sm text-gray-400">Updated: {updatedAt}</p>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Notes: </p>
                        {/* write JSX that iterates through notes */}
                    </div>
                </article>
            </section>
        </>
    );
}
