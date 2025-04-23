import express from "express";
import { pool } from "../index.js";

const router = express.Router();

/**
 * get statuses
 */

router.get("/statuses", async (req, res) => {
    try {
        const result = await pool.query(`SELECT unnest(enum_range(NULL::task_status)) AS status`);

        const statuses = result.rows.map(row => ({
            value: row.status,
            label: row.status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        }));

        res.status(200).json({ data: { statuses } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch statuses" });
    }
});

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

    res.status(200).json({
        message: "Created task",
        data: {
            task: result,
        },
    });
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
 * get task (by id)
 */

router.get("/tasks/:taskId", async (req, res, next) => {
    const { taskId } = req.params;

    const result = await pool.query(
        `
        SELECT * FROM tasks
        WHERE id = $1
        RETURNING *;
    `,
        [taskId]
    );

    const task = result.rows[0];

    res.status(200).json({ message: "Task retrieved", data: { task } });
});

/**
 * edit task
 */

router.patch("/tasks/:taskId", async (req, res, next) => {
    const { taskId } = req.params;

    const { title, description, status, due_at } = req.body;

    const result = await pool.query(
        `
        UPDATE tasks
        SET title = $1,
            description = $2,
            status = $3,
            due_at = $4
        WHERE id=${taskId}
        RETURNING *;
    `,
        [title, description, status, due_at]
    );

    const editedTask = result.rows[0];

    res.status(200).json({ message: `Edited task: ${title}`, editedTask });
});

/**
 * delete task
 */

router.delete("/tasks/:taskId", async (req, res, next) => {
    const { taskId } = req.params;

    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *;
    `,
        [taskId]
    );

    const deletedTask = result.rows[0];

    res.status(200).json({ message: `Deleted task`, deletedTask });
});

export default router;
