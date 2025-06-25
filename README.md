# Task Manager MERN Application

A full-stack MERN (MongoDB, Express, React, Node.js) Task Manager and Posts application. This project allows users to manage tasks (with status) and posts, providing a modern, responsive UI and a robust backend API.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Common Issues & Fixes](#common-issues--fixes)

---

## Features
- Add, view, and delete tasks
- Tasks have status: Active or Completed
- Add, view, and delete posts
- Responsive React frontend (Vite, TailwindCSS)
- RESTful backend API (Express, MongoDB/Mongoose)
- ESLint and code quality tools

---

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, React Router, ESLint
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Dev Tools:** concurrently, nodemon

---

## Project Structure
```
task-manager/
  ├── src/                  # Frontend source code
  │   ├── components/       # UI components (TaskManager, Navbar, etc.)
  │   ├── pages/            # Main pages (Home, Posts)
  │   ├── hooks/            # Custom React hooks
  │   ├── layouts/          # Layout components
  │   └── context/          # Context providers
  ├── task-manager-backend/ # Backend API
  │   ├── models/           # Mongoose models (Task, Post)
  │   ├── server.js         # Express server and API routes
  │   └── seeder.js         # (Optional) DB seeder script
  ├── package.json          # Frontend scripts & dependencies
  ├── vite.config.js        # Vite config
  └── README.md             # Project documentation
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB running locally on default port (27017)

### 1. Clone the Repository
```sh
git clone <repo-url>
cd task-manager
```

### 2. Install Dependencies
```sh
npm install
cd task-manager-backend
npm install
cd ..
```

### 3. Seed the Database (Optional)
If you want to populate initial data:
```sh
cd task-manager-backend
node seeder.js
cd ..
```

### 4. Start the Application

#### Development (concurrently runs backend and frontend):
```sh
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

#### Start Backend Only:
```sh
cd task-manager-backend
npm run dev
```

#### Start Frontend Only:
```sh
npm run dev
```

### 5. Build for Production
```sh
npm run build
```
- Serve the production build with your preferred static server.

### 6. Linting
```sh
npm run lint
```

---

## Available Scripts

### In the root directory:
- `npm run dev` — Run both backend and frontend in development mode (concurrently)
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

### In `task-manager-backend/`:
- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend with node

---

## API Endpoints

### Tasks
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Add a new task (`{ title, status }`)
- `DELETE /api/tasks/:id` — Delete a task

### Posts
- `GET /api/posts` — List all posts
- `POST /api/posts` — Add a new post (`{ title, body }`)
- `DELETE /api/posts/:id` — Delete a post

---

## Environment Variables
- By default, backend connects to `mongodb://localhost:27017/task-manager`.
- For production, set `NODE_ENV=production` and configure MongoDB URI as needed.

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE) (add a LICENSE file if you want to specify)

---

## Common Issues & Fixes

### Vite Proxy Error: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

**Error:**
```
Error: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

**Cause:**
- The frontend expected a JSON response from the backend, but received an HTML page instead. This happened because Vite v4+ no longer supports the `proxy` field in `package.json`. As a result, API requests were not forwarded to the backend, and Vite served its own HTML (usually index.html or a 404 page).

**How We Fixed It:**
1. **Removed** the `proxy` field from `package.json`:
   ```json
   // package.json
   // "proxy": "http://localhost:5000" (removed)
   ```
2. **Added proxy configuration to `vite.config.js`:**
   ```js
   // vite.config.js
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': 'http://localhost:5000',
       },
     },
   });
   ```
3. **Restarted both frontend and backend servers** after making these changes:
   ```sh
   # In one terminal
   cd task-manager-backend
   npm run dev

   # In another terminal (root directory)
   npm run dev
   ```

**Result:**
- The frontend `/api/tasks` requests are now correctly proxied to the backend, and the error is resolved.

### ThemeContext.jsx: Uncaught ReferenceError: React is not defined

**Error:**
```
ThemeContext.jsx:10 Uncaught ReferenceError: React is not defined
    at ThemeProvider (ThemeContext.jsx:10:3)
    ...
```

**Cause:**
- In `ThemeContext.jsx`, the code uses `React.useEffect`, but does not import the `React` object. Even with the new JSX transform, if you use the `React.` namespace, you must import React.

**How We Fixed It:**
1. Added the following import at the top of `src/context/ThemeContext.jsx`:
   ```js
   import React, { createContext } from 'react';
   ```
   This ensures both `React` and `createContext` are available in the file.
2. Saved the file and restarted the dev server.

**Result:**
- The error is resolved, and the ThemeProvider component now works as expected.
