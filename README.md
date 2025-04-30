# <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/rocket.svg" /> TaskTracker

> A task tracking app to help caseworkers manage their tasks.
> Complete CRUD functionality within a user-friendly UI.

---

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/plug.svg" /> Deployment
[Demo](https://tasktrackerclient.onrender.com/)

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/folder.svg" /> Project Structure

```txt
TaskTracker/
├── client/       # Frontend (React + Vite)
├── server/       # Backend (Node + ExpressJS)
└── README.md
```

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/layers.svg" /> Tech Stack

client => React + Vite, TailwindCSS, useAnimation, Lucide  
server => Node + ExpressJS  
database => PostgreSQL on Render.com

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/cog.svg" /> Environment Variables

client
`VITE_API_URL=http://localhost:yourPort`

server
`DB_URL="http://localhost:yourDBPort" || "yourExternalDBURL"`

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/laptop.svg" /> Local

To run the project locally:

1. Clone the repository by navigating to a desired directory in your terminal and running

`git clone https://github.com/Phil-G-94/TaskTracker.git`

2. Install the required packages for both `client/` and `server/`. From the root directory, run:

`cd client/ ; npm install`

`cd /server ; npm install`

3. Open up a terminal for each directory and run:

`npm run dev` to start the project in development mode, or

`npm run start` to run the app in production.

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/729a6f0cdc40687f65158d0c3abcba019fcdf74c/eth-port.svg" /> API Endpoints

### Endpoints Overview

#### GET /api/statuses

Retrieves a list of all available task statuses.

##### Response

`200 OK`: Returns the list of statuses.

##### Example response

```
{
  "data": {
    "statuses": [
      { "value": "pending", "label": "Pending" },
      { "value": "in_progress", "label": "In Progress" },
      { "value": "completed", "label": "Completed" }
    ]
  }
}
```

#### POST /api/create-task

Creates a new task with the given information.

Request Body:

- title (required): The title of the task.

- description (optional): A detailed description of the task.

- status (optional, default: "pending"): The current status of the task.

- due_at (optional): The due date for the task (ISO 8601 format).

Validation:

- title: Must be a non-empty string.

- description: If provided, must be a string.

- status: Must be one of the following values: "pending", "in_progress", "completed".

- due_at: Must be a valid ISO 8601 date format.

##### Response

`200 OK`: Task created successfully.

##### Example response

```
{
  "message": "Created task",
  "data": {
    "task": {
      "id": 1,
      "title": "New Task",
      "description": "Task details...",
      "status": "pending",
      "due_at": "2025-05-01T00:00:00Z"
    }
  }
}
```
#### GET /api/tasks

Retrieves a list of all tasks, ordered by their due date.

##### Response

`200 OK`: Returns the list of tasks.

##### Example response

```
{
  "message": "Retrieved tasks",
  "data": {
    "tasks": [
      { "id": 1, "title": "Task 1", "status": "pending", "due_at": "2025-05-01T00:00:00Z" },
      { "id": 2, "title": "Task 2", "status": "completed", "due_at": "2025-05-02T00:00:00Z" }
    ],
    "quantity": 2
  }
}
```

#### GET /api/tasks/:taskId

Retrieves a specific task by its ID.

URL Parameters:

- taskId (required): The ID of the task to retrieve.

Validation:

- taskId: Must be a valid integer.

##### Response

`200 OK`: Task retrieved successfully.

`404 Not Found`: If the task does not exist.

##### Example response

```
{
  "message": "Task retrieved",
  "data": {
    "task": {
      "id": 1,
      "title": "Task 1",
      "description": "Details of the task",
      "status": "in_progress",
      "due_at": "2025-05-01T00:00:00Z"
    }
  }
}
```

#### PATCH /api/tasks/:taskId

Updates an existing task by its ID.  

Request Body:

- title (required): The title of the task.

- description (optional): A detailed description of the task.

- status (optional, default: "pending"): The current status of the task.

- due_at (optional): The due date for the task (ISO 8601 format).

Validation:

- title: Must be a non-empty string.

- description: If provided, must be a string.

- status: Must be one of the following values: "pending", "in_progress", "completed".

- due_at: Must be a valid ISO 8601 date format.

##### Response

`200 OK`: Task updated successfully.

##### Example response

```
{
  "message": "Edited task: Task 1",
  "data": {
    "task": {
      "id": 1,
      "title": "Updated Task",
      "description": "Updated task description",
      "status": "completed",
      "due_at": "2025-05-10T00:00:00Z"
    }
  }
}
```

#### DELETE /api/tasks/:taskId

Deletes a specific task by its ID.

URL Parameters:

- taskId (required): The ID of the task to delete.

Validation:

- taskId: Must be a valid integer.

##### Response

`200 OK`: Task deleted successfully.

`404 Not Found`: If the task does not exist.

##### Example response

```
{
  "message": "Deleted task",
  "data": {
    "task": {
      "id": 1,
      "title": "Task 1",
      "description": "Details of the task",
      "status": "completed",
      "due_at": "2025-05-01T00:00:00Z"
    }
  }
}
```

#### Error handling  

`400 Bad Request`: Invalid input or missing required fields.

`404 Not Found`: Task not found.

`500 Internal Server Error`: An error occurred on the server.

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/book-pen.svg" /> Notes

### ToDo:

- Improve client-side test coverage 
- Add client-side routing:
  - Allow user to view single task within a dynamic route.
  - Add note-taking functionality, allowing user to add notes to each respective task - to be displayed within the dynamically rendered view. 
