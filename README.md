# Todo App

This is a simple Todo application built with Node.js, Express, and MongoDB. It provides basic CRUD operations for managing tasks.

## Deployed Application

The application is deployed and can be accessed at:
[Live Demo](https://todo-list-lyart-chi.vercel.app/)

## Features

- Create new tasks
- Retrieve all tasks
- Update existing tasks
- Delete tasks

## Setup for Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URL=mongodb+srv://shreyastungar762:todo123@cluster0.icpskzk.mongodb.net/
   PORT=8000
   ```
   Note: Replace the MONGO_URL with your actual MongoDB connection string if different.

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

The server will start on `http://localhost:8000` for local development.

You can use the following endpoints:

### Home
- GET `/`
  - Returns a simple message indicating you're on the home page

### Create Task
- POST `/task`
  - Creates a new task
  - Request body format:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description"
    }
    ```

### Get All Tasks
- GET `/task`
  - Retrieves all tasks

### Update Task
- PUT `/task/:id`
  - Updates a task by ID
  - Request body format (include fields you want to update):
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description"
    }
    ```

### Delete Task
- DELETE `/task/:id`
  - Deletes a task by ID

## Testing the App

1. For local testing, ensure the server is running on `http://localhost:8000`
   For testing the deployed version, use `https://todo-list-lyart-chi.vercel.app`

2. Use a tool like Postman or curl to send requests to the API endpoints

3. Example requests:

   - Create a task:
     ```
     POST https://todo-list-lyart-chi.vercel.app/task
     Body: { "title": "Buy groceries", "description": "Milk, eggs, bread", "status": "pending" }
     ```

   - Get all tasks:
     ```
     GET https://todo-list-lyart-chi.vercel.app/task
     ```

   - Update a task:
     ```
     PUT https://todo-list-lyart-chi.vercel.app/task/[task_id]
     Body: { "status": "completed" }
     ```

   - Delete a task:
     ```
     DELETE https://todo-list-lyart-chi.vercel.app/task/[task_id]
     ```

Replace `[task_id]` with the actual ID of the task you want to update or delete.
