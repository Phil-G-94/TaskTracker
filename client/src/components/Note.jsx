import { useState } from "react";

export default function Note({ taskId, handleAddNote }) {
    const [errors, setErrors] = useState(null);

    const [content, setContent] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        try {
            handleAddNote(content, taskId);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setErrors([{ field: null, message }]);
        } finally {
            setContent("");
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-8">
                <label htmlFor="content" className="flex flex-col w-full text-center"></label>
                <textarea
                    name="content"
                    id="content"
                    placeholder="Add note here..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="border-2 p-2 w-full mt-2 focus:outline-none focus:ring-4 focus:ring-gov-yellow focus:outline-4 focus:outline-gov-yellow box-border"
                />
                <div className="flex place-content-center">
                    <button
                        type="submit"
                        className="bg-gov-green-light hover:bg-gov-green focus:bg-gov-yellow focus:text-gov-black active:outline-2 active:outline-gov-yellow active:bg-gov-green active:text-gov-white hover:cursor-pointer px-4 py-1 text-sm font-medium border-b-2 border-b-black text-gov-white transition box-border"
                    >
                        Add Note
                    </button>
                </div>
            </form>
            {errors && <ErrorMessages errors={errors} />}
        </section>
    );
}
