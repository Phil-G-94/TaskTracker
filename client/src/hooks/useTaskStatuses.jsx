import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useTaskStatuses = () => {
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/statuses`);
                if (!response.ok) throw new Error("Failed to fetch statuses");

                const result = await response.json();

                const statusData = result.data?.statuses;

                setStatuses(statusData);
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchStatuses();
    }, []);

    return { statuses, loading, error };
};
