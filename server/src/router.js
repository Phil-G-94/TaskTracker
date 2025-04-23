import express from "express";
import { pool } from "../index.js";

const router = express.Router();

/**
 * create task
 */

router.post("/create-task", async (req, res, next) => {
    const { title, description, status = "pending", due_at } = req.body;

    const result = await pool.query(
        `
        INSERT INTO tasks (title, description, status, due_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
        [title, description ?? null, status, due_at ?? null]
    );

    res.status(200).json({ message: "Created task" });
});

/**
 * get tasks
 */

router.get("/tasks", async (req, res, next) => {
    const result = await pool.query(`
        SELECT * FROM tasks
        ORDER BY due_at
    `);

    const tasks = result.rows;

    const quantity = result.rowCount;

    res.status(200).json({
        message: "Retrieved tasks",
        data: {
            tasks,
            quantity,
        },
    });
});

/**
 * get task
 */

router.get("/tasks/:taskId", (req, res, next) => {});

/**
 * edit task
 */

router.patch("/tasks/:taskId", (req, res, next) => {});

/**
 * delete task
 */

router.delete("/tasks/:taskId", (req, res, next) => {});

export default router;
