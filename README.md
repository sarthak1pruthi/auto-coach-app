# 🏋️‍♂️ Auto Coach AI

> **Your AI-Powered Intelligent Workout Planner.**
> *Stop guessing. Start progressing.*

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://auto-coach-app.vercel.app/)
[![Backend Status](https://img.shields.io/badge/API-Online-blue?style=for-the-badge&logo=render)](https://auto-coach-app1.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)]()

**Auto Coach** is a modern, full-stack Progressive Web App (PWA) designed to take the thinking out of your lifting. It uses an **intelligent volume governor algorithm** to generate optimal workout sessions based on your goals (Strength vs. Hypertrophy), preferred split, and recovery status.

## ✨ Features

### 🧠 Intelligent Coaching
-   **AI Logic**: Generates daily workouts based on muscle readiness and weekly volume targets.
-   **Volume Governor**: Automatically tracks set counts to prevent overtraining or undertraining.
-   **Progression Suggestions**: Intelligent weight increase recommendations based on 1RM estimates.

### 📊 Data & Analytics
-   **Dashboard**: Visualize your weekly muscle group volume.
-   **History**: View past performance graphs for every exercise.
-   **Gamification**: Streaks & Levels system to keep you consistent.

### 🛠️ Premium Tools
-   **Plate Calculator**: Never do math at the barbell again.
-   **Rest Timer**: Configurable rest intervals.
-   **Mobile PWA**: Installable on iOS/Android (Add to Home Screen).
-   **Glassmorphic UI**: A stunning, high-performance dark mode interface.

### 🔐 Secure & Cloud-Sync
-   **Authentication**: JWT-based login (Secure hashing with PBKDF2).
-   **Database**: Supabase (PostgreSQL) for persistent data storage.

## 🚀 Tech Stack

-   **Frontend**: React (Vite), Chart.js, Tailwind-like Custom CSS.
-   **Backend**: Python FastAPI, SQLAlchemy, Pydantic.
-   **Database**: Supabase (PostgreSQL).
-   **Deployment**: Vercel (Frontend) + Render (Backend).

## 🏃‍♂️ Getting Started (Local Dev)

### Prerequisites
-   Node.js (v16+)
-   Python (v3.9+)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sarthak1pruthi/auto-coach-app.git
    cd auto-coach-app
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # Mac/Linux:
    source venv/bin/activate
    
    pip install -r requirements.txt
    uvicorn app.main:app --reload
    ```

3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
MIT License.
