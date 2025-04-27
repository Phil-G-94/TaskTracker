import request from "supertest";
import app from "../app.js";
import { pool } from "../../index.js";

describe("Tasks API - full CRUD flow", () => {
    let createdTaskId;

    afterAll(async () => {
        await pool.end();
    });

    it("should create a new task", async () => {
        const taskData = {
            title: "Test title",
            description: "Test description",
            status: "pending",
            due_at: new Date().toISOString(),
        };

        const res = await request(app).post("/api/create-task").send(taskData);

        expect(res.statusCode).toBe(200);

        expect(res.body.data.task).toHaveProperty("id");

        createdTaskId = res.body.data.task.id;
    });

    it("should retrieve the created task", async () => {
        const res = await request(app).get(`/api/tasks/${createdTaskId}`);

        expect(res.statusCode).toBe(200);

        expect(res.body.data.task.id).toBe(createdTaskId);
    });

    it("should update the task", async () => {
        const updatedData = {
            title: "Updated Task Title",
            description: "Updated description",
            status: "in_progress",
            due_at: new Date().toISOString(),
        };

        const res = await request(app).patch(`/api/tasks/${createdTaskId}`).send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.task.title).toBe(updatedData.title);
        expect(res.body.data.task.status).toBe(updatedData.status);
    });

    it("should delete the task", async () => {
        const res = await request(app).delete(`/api/tasks/${createdTaskId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.task.id).toBe(createdTaskId);
    });

    it("should return 404 when trying to retrieve deleted task", async () => {
        const res = await request(app).get(`/api/tasks/${createdTaskId}`);

        expect(res.statusCode).toBe(404);
    });
});
