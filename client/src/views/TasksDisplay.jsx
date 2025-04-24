import TaskCard from "../components/TaskCard";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

export default function TasksDisplay({ taskData, taskQuantity, refetchTasks }) {
    return (
        <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col">
                <h2 className="text-xl text-center">Your Tasks</h2>
                <span className="text-2xl text-center">{taskQuantity}</span>
            </div>
            {!taskData ? (
                <div className="flex justify-center items-center w-full h-full flex-grow mt-44">
                    <UseAnimations animation={loading2} size={100} fillColor="#1D70B8" />
                </div>
            ) : (
                <section className="grid grid-cols-1 place-items-center items-stretch md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {taskData &&
                        taskData.map(task => {
                            return <TaskCard key={task.id} task={task} refetchTasks={refetchTasks} />;
                        })}
                </section>
            )}
        </section>
    );
}
