import express from "express";
import { pool } from "../index.js";
import { validationHandler } from "./middleware/validationHandler.js";
import { body, param } from "express-validator";

const router = express.Router();

const validStatuses = ["pending", "in_progress", "completed"];

/**
 * GET /api/statuses
 */

router.get("/statuses", async (req, res) => {
    try {
        const result = await pool.query(`SELECT unnest(enum_range(NULL::task_status)) AS status`);

        const statuses = result.rows.map(row => ({
            value: row.status,
            label: row.status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        }));

        res.status(200).json({ data: { statuses } });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/create-task
 */

router.post(
    "/create-task",
    [
        body("title").trim().notEmpty().withMessage("Title is required").escape(),
        body("description").optional().isString().escape(),
        body("status").isIn(validStatuses).withMessage("Invalid status"),
        body("due_at").isISO8601().withMessage("Invalid date format"),
    ],
    validationHandler,
    async (req, res, next) => {
        const { title, description, status = "pending", due_at } = req.body;

        try {
            const result = await pool.query(
                `
            INSERT INTO tasks (title, description, status, due_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
                [title, description ?? null, status, due_at ?? null]
            );

            res.status(201).json({
                message: "Created task",
                data: {
                    task: result.rows[0],
                },
            });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * GET /api/tasks
 */

router.get("/tasks", async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/tasks/:taskId
 */

router.get(
    "/tasks/:taskId",
    [param("taskId").isInt().withMessage("Invalid task ID")],
    validationHandler,
    async (req, res, next) => {
        const { taskId } = req.params;

        try {
            const result = await pool.query(
                `
                SELECT
                    t.id AS task_id,
                    t.title,
                    t.status,
                    t.due_at,
                    t.created_at AS task_created_at,
                    t.updated_at,
                    n.id AS note_id,
                    n.content,
                    n.created_at AS note_created_at
                FROM tasks t
                LEFT JOIN notes n ON n.task_id = t.id
                WHERE t.id = $1
                ORDER BY n.created_at ASC;
                `,
                [taskId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Task not found" });
            }

            const taskRow = result.rows[0];

            const task = {
                id: taskRow.task_id,
                title: taskRow.title,
                status: taskRow.status,
                due_at: taskRow.due_at,
                created_at: taskRow.task_created_at,
                updated_at: taskRow.updated_at,
                notes: [],
            };

            result.rows.forEach(row => {
                if (row.note_id !== null) {
                    task.notes.push({
                        id: row.note_id,
                        content: row.content,
                        created_at: row.note_created_at,
                    });
                }
            });

            res.status(200).json({ message: "Task retrieved", data: { task } });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * POST /api/tasks/:taskId
 */

router.post(
    "/tasks/:taskId",
    // [
    //     param('id').isInt().withMessage("Task ID must be an integer"),
    //     body("content")
    //         .isString().withMessage("Note must be a string")
    //         .isLength({ min: 1 }).withMessage("Note cannot be empty")
    // ],
    validationHandler,
    async (req, res, next) => {
        const { taskId } = req.params;

        const { content } = req.body;

        try {
            const taskCheck = await pool.query(
                `
                    SELECT 1 FROM tasks WHERE id = $1
                `,
                [taskId]
            );

            if (taskCheck.rowCount === 0) {
                return res.status(404).json({ error: "Task not found" });
            }

            const insertContent = await pool.query(
                `
                    INSERT INTO notes (task_id, content) VALUES ($1, $2) RETURNING *
                `,
                [taskId, content]
            );

            const note = insertContent.rows[0];

            res.status(201).json({ message: "Note added", data: { note } });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * PATCH /api/tasks/:taskId
 */

router.patch(
    "/tasks/:taskId",
    [
        param("taskId").isInt().withMessage("Invalid task ID"),
        body("title").trim().notEmpty().withMessage("Title is required").escape(),
        body("description").optional().isString().escape(),
        body("status").isIn(validStatuses).withMessage("Invalid status"),
        body("due_at").isISO8601().withMessage("Invalid date format"),
    ],
    validationHandler,
    async (req, res, next) => {
        const { taskId } = req.params;

        const { title, description, status, due_at } = req.body;

        try {
            const result = await pool.query(
                `
            UPDATE tasks
            SET title = $1,
                description = $2,
                status = $3,
                due_at = $4
            WHERE id=$5
            RETURNING *;
        `,
                [title, description, status, due_at, taskId]
            );

            const editedTask = result.rows[0];

            res.status(200).json({
                message: `Edited task: ${title}`,
                data: {
                    task: editedTask,
                },
            });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * DELETE /api/tasks/:taskId
 */

router.delete(
    "/tasks/:taskId",
    [param("taskId").isInt().withMessage("Invalid task ID")],
    validationHandler,
    async (req, res, next) => {
        const { taskId } = req.params;

        try {
            const result = await pool.query(
                `
            DELETE FROM tasks
            WHERE id = $1
            RETURNING *;
        `,
                [taskId]
            );

            const task = result.rows[0];

            if (!task) {
                return res.status(404).json({ message: "Selected task doesn't exist. Choose another." });
            }

            res.status(204).json({
                message: `Deleted task`,
                data: {
                    task,
                },
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
