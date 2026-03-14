🚀 Hireginie — ATS + Talent Ops Platform

Hireginie is a modern recruiting command center designed for recruiters, hiring managers, and talent teams.

The platform aims to become a Talent Operations System combining:

Applicant Tracking System (ATS)

Recruiter productivity tools

Candidate pipeline management

Client collaboration

AI-powered hiring insights

Instead of using multiple tools, Hireginie brings the entire hiring workflow into one platform.

💡 Vision

Hireginie is more than just an ATS.

We are building a Recruiter Intelligence Platform to help teams manage:

Candidate sourcing

Hiring pipelines

Recruiter productivity

Recruiter–client collaboration

Talent analytics

All from a single system.

🧠 Tech Stack
Backend

FastAPI (Python)

High performance API framework

Automatic API documentation

Ideal for future AI integrations

Frontend

Next.js (React + TypeScript)

Modern SaaS dashboard architecture

App Router structure

Scalable frontend architecture

Styling

TailwindCSS

UI Animations

Framer Motion

Database

PostgreSQL

🏗 Current System Features

The project currently contains a working ATS prototype.

Current Workflow
Register
↓
Login
↓
Dashboard
↓
Projects
↓
Jobs
↓
Pipeline Tracker
Implemented Features

✔ User registration
✔ User login & role authentication
✔ Role-based dashboards
✔ Project management
✔ Job listings
✔ Candidate pipeline tracker
✔ Recruiter workflow structure

📁 Project Structure
hireginie-platform
│
├── backend
│   └── app
│       ├── models
│       ├── routers
│       ├── schemas
│       └── utils
│
├── frontend
│   └── app
│       ├── dashboard
│       ├── projects
│       ├── login
│       ├── register
│       ├── vision
│       └── components
🛠 Developer Setup Guide

Follow these steps to run the project locally.

Step 1 — Install Required Tools

Make sure you have installed:

VS Code (or any IDE)

Git

Python 3.10+

Node.js 18+

PostgreSQL

Step 2 — Clone the Repository
git clone https://github.com/Poohja00/hireginie-platform.git

cd hireginie-platform

Your terminal should now show:

PS D:\hireginie-platform>

or

PS C:\hireginie-platform>
Step 3 — Backend Setup

Move into the backend folder:

cd backend

Create a virtual environment:

python -m venv venv

Activate it:

venv\Scripts\activate

Install backend dependencies:

pip install fastapi uvicorn sqlalchemy psycopg2-binary python-multipart

Your terminal should now display:

(venv)
Step 4 — Database Setup

Open PostgreSQL terminal.

Example:

"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres

Create database:

CREATE DATABASE hiregine_db;

Connect to database:

\c hiregine_db

Tables will automatically be created when the backend runs.

Step 5 — Run the Backend

Inside the backend folder run:

uvicorn app.main:app --reload

API documentation will be available at:

http://127.0.0.1:8000/docs
Step 6 — Frontend Setup

Open a new terminal tab.

Navigate to frontend folder:

cd frontend

Install all frontend dependencies:

npm install

This will install everything required including:

Next.js

React

TailwindCSS

Framer Motion

PostCSS

Autoprefixer

No additional configuration is required because Tailwind and Framer Motion are already configured in the project.

Step 7 — Run the Frontend

Start the frontend development server:

npm run dev

Frontend will run at:

http://localhost:3000
🎨 Styling & Animation

The frontend uses:

TailwindCSS

For rapid UI development.

Tailwind configuration exists in:

frontend/tailwind.config.js
frontend/app/globals.css
Framer Motion

Used for UI animations and page transitions.

Currently used in:

frontend/app/vision/page.tsx
🗺 Product Roadmap

Planned features for the platform:

🤖 AI Resume Scanner

Automated candidate skill extraction and ranking.

💬 Internal Recruiter Chat

Slack-style project-based messaging.

📋 Recruiter Task Manager

Daily task tracking for recruiters.

📊 Admin Analytics Dashboard

Global view of hiring performance and pipeline metrics.

🏢 Client Portal

Allow clients to review candidates directly.

👨‍💻 Development Workflow

We follow a Branch-per-feature strategy.

Step 1 — Sync With Main

Before starting work:

git checkout main

git pull origin main
Step 2 — Create a Feature Branch

Example:

git checkout -b feature/add-login-button
Step 3 — Save Your Changes

Check modified files:

git status

Add only the files you edited:

git add path/to/file

Commit your change:

git commit -m "describe your change"
Step 4 — Push Your Work
git push origin feature/add-login-button

Create a Pull Request on GitHub for review.

✅ Pre-Push Checklist

Before pushing your work:

 App runs locally (npm run dev)

 No console errors

 Backend API works (/docs)

 Only relevant files were edited

🚀 Long-Term Goal

Hireginie aims to evolve into a Talent Cloud Platform combining:

ATS

Recruiter marketplace

Freelancer marketplace

AI candidate discovery

Client collaboration

A complete end-to-end hiring operating system.