# Full Stack Task Manager

A simple, beautifully designed Task Manager application built with React and Node.js.

## Features Requirements Fulfilled
* **Frontend**: React application built with Vite containing a clean, premium modern UI without complex frameworks. Includes loading states and error messages.
* **Backend**: Node.js with Express providing REST API endpoints (`GET`, `POST`, `PATCH`, `DELETE`).
* **Data Model**: Follows instructions (`id`, `title`, `completed`, `createdAt`).
* **In-Memory/File Storage**: Persists data locally into a `data.json` file inside the `backend` folder via flat file operations (covers the Bonus persistence requirement).
* **Connection**: Frontend `fetch` efficiently communicates with the Node server.
* **Bonus - UI Filters**: Filter tasks dynamically by All, Active, or Completed.
* **Bonus - Edits**: Double-click a task title to edit it.
* **Bonus - Basic Tests**: Simple `jest` + `supertest` backend API tests.

## Folder Structure

```
c:\Full-Stack-Developer-Technical-Assignment
├── backend                  # Node.js + Express backend
│   ├── controllers/         # Helper scripts (inlined directly into routes to keep simple)
│   ├── routes/
│   │   └── tasks.js         # Express Router for the tasks endpoints
│   ├── tests/
│   │   └── tasks.test.js    # Basic Supertest API endpoints test
│   ├── server.js            # Express server initialization
│   ├── data.json            # Local JSON data store map
│   └── package.json         # Backend dependencies
└── frontend                 # React frontend (Vite)
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx # Add task form
    │   │   ├── TaskItem.jsx # Individual task render
    │   │   └── TaskList.jsx # Iterative list render
    │   ├── App.jsx          # Main connection between frontend & backend state
    │   ├── main.jsx         # React DOM tree injection
    │   └── index.css        # Premium vanilla CSS with glassmorphic elements
    └── package.json         # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- `npm`

### 1. Start the Backend API
The backend runs on `http://localhost:5000` by default.

```bash
cd backend
npm install
node server.js
```
The console should acknowledge: `Server is running on port 5000`

> **Note on tests**: You can execute `npm test` while inside the `/backend` folder to run the local API test suite!

### 2. Start the Frontend App
The frontend will start a local Vite server, typically at `http://localhost:5173`. Make sure the backend is already running so data fetches succeed.

```bash
cd frontend
npm install
npm run dev
```

Visit the terminal's provided URL in your browser to interact with the Task Manager application.