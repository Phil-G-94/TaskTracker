import TaskCard from "../components/TaskCard";

export default function TasksDisplay({ taskData, taskQuantity }) {
    return (
        <section>
            <div className="flex flex-col">
                <h2 className="text-xl text-center">Your Tasks</h2>
                <span className="text-2xl text-center">{taskQuantity}</span>
            </div>
            <section className="grid grid-cols-1 place-items-center items-stretch md:grid-cols-2 lg:grid-cols-4 gap-4">
                {taskData ? (
                    taskData.map(task => {
                        return <TaskCard key={task.id} task={task} />;
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </section>
    );
}
