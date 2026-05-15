# NestKnot - Service Request Board

A full-stack web application designed for homeowners to post service requests (e.g., plumbing, electrical, carpentry) and for local tradespeople to browse, view details, and manage these open requests.

This project was built as a solution for the **Full-Stack Developer Intern Technical Assessment**.

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas) with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) for secure endpoints

## ✨ Features

- **Browse Jobs**: View all active service requests with a sleek, responsive UI.
- **Advanced Filtering & Search**: Filter jobs by category, status, location, and perform keyword searches across titles and descriptions. Sort jobs by newest or oldest.
- **Post a Job**: Logged-in users can easily post new service requests.
- **Manage Jobs**: View detailed job information, update the status (Open, In Progress, Closed), or delete a job.
- **Authentication**: Secure registration and login flows. Only authenticated users can create or delete job requests.
- **Smooth Animations**: High-end page transitions and UI micro-animations using Framer Motion.

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- A MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd NestKnot-WebApp
\`\`\`

### 2. Environment Variables

#### Backend (\`backend/.env\`)
Create a \`.env\` file in the \`backend\` directory and add the following variables:
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
\`\`\`

#### Frontend (\`frontend/.env.local\`)
Create a \`.env.local\` file in the \`frontend\` directory (though the app defaults to localhost:5000 if not provided):
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

---

## 🏃‍♂️ Run Instructions

### Starting the Backend
1. Open a terminal and navigate to the backend folder:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. (Optional) Seed the database with sample jobs:
   \`\`\`bash
   node seed.js
   \`\`\`
4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   *The backend will run on http://localhost:5000*

### Starting the Frontend
1. Open a new terminal and navigate to the frontend folder:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Next.js development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   *The frontend will run on http://localhost:3000*

### Running Tests
Unit tests are implemented for the backend API using Jest and Supertest.
1. Navigate to the backend folder:
   \`\`\`bash
   cd backend
   \`\`\`
2. Run the test suite:
   \`\`\`bash
   npm test
   \`\`\`

---

## 🧪 API Endpoints

- \`GET /api/jobs\` - Fetch all jobs (Supports queries: \`?category\`, \`?status\`, \`?search\`, \`?location\`, \`?sortBy\`)
- \`GET /api/jobs/:id\` - Fetch a single job by ID
- \`POST /api/jobs\` - Create a new job (Requires JWT Auth)
- \`PATCH /api/jobs/:id\` - Update job status
- \`DELETE /api/jobs/:id\` - Delete a job (Requires JWT Auth)
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login and receive JWT

## 📝 Bonus Requirements Fulfilled
- ✅ Keyword search across title and description
- ✅ JWT-based authentication for posting and deleting jobs
- ✅ Simple seed script (\`seed.js\`) to insert sample jobs
- ✅ Unit tests on API endpoints using Jest
- ✅ Dedicated Global Error Handler and 404 Route in Express
- ✅ Premium UI design with animations and responsive layouts
