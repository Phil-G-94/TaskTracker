import dotenv from "dotenv";
import pkg from "pg";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const { Pool } = pkg;

/**
 * db config
 */
export const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
});

/**
 * start server
 */

if (process.env.NODE_ENV !== "test") {
    (async function startServer() {
        try {
            app.listen(PORT || 8080, () => {
                console.log("Server is running on port", process.env.PORT || 8080);
            });
        } catch (error) {
            console.log(error);
            process.exitCode = 1;
        }
    })();
}

/**
 * shutdown handling
 */

const handleShutdown = async signal => {
    console.log(`${signal} received. Closing database connection...`);
    pool.end();
    console.log("Database connection closed. Exiting process.");
    process.exit(0);
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
