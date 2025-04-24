import express from "express";
import cors from "cors";
import helmet from "helmet";

import router from "./router.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

/**
 * middleware
 */

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * check
 */

app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

/**
 * routes
 */
app.use("/api", router);

/**
 * error handler
 */

app.use(errorHandler);

export default app;
