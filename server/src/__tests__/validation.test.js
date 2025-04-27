import request from "supertest";
import app from "../app.js";

describe("Tasks API - Bad Requests", () => {
    it("should fail to create a task with missing title", async () => {
        const res = await request(app).post("/api/create-task").send({
            description: "Missing title",
            status: "pending",
            due_at: new Date().toISOString(),
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].message).toMatch(/Title is required/);
    });

    it("should fail to create a task with invalid status", async () => {
        const res = await request(app).post("/api/create-task").send({
            title: "Invalid Status",
            description: "testing",
            status: "not_a_real_status",
            due_at: new Date().toISOString(),
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].message).toMatch(/Invalid status/);
    });

    it("should fail to create a task with invalid due date", async () => {
        const res = await request(app).post("/api/create-task").send({
            title: "Bad Date",
            description: "testing",
            status: "pending",
            due_at: "not-a-date",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].message).toMatch(/Invalid date format/);
    });

    it("should fail to get a task with invalid taskId (non-integer)", async () => {
        const res = await request(app).get("/api/tasks/abc");

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].message).toMatch(/Invalid task ID/);
    });

    it("should fail to update a task with missing title", async () => {
        const res = await request(app).patch("/api/tasks/1").send({
            description: "no title",
            status: "pending",
            due_at: new Date().toISOString(),
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].message).toMatch(/Title is required/);
    });

    it("should fail to delete a task with invalid taskId", async () => {
        const res = await request(app).delete("/api/tasks/notanumber");

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].message).toMatch(/Invalid task ID/);
    });
});
