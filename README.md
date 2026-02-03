# 🏋️‍♂️ Auto Coach App

> **Your AI-Powered Intelligent Workout Planner.**
> Stop guessing. Start progressing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_18-cyan)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-green)

**Auto Coach** is a modern, full-stack web application designed to take the thinking out of your lifting. It uses an intelligent volume governor algorithm to generate optimal workout sessions based on your goals (Strength vs. Hypertrophy), preferred split (PPL, Arnold, Texas Method, etc.), and recovery status.

## ✨ Features

### 🧠 Intelligent Coaching
-   **AI Logic**: Generates daily workouts based on muscle readiness and weekly volume targets.
-   **Volume Governor**: Automatically tracks set counts to prevent overtraining or undertraining.
-   **Progression Suggestions**: Intelligent weight increase recommendations based on 1RM estimates.

### 📊 Data & Analytics
-   **Dashboard**: Visualize your weekly muscle group volume.
-   **History**: View past performance graphs for every exercise.
-   **Streaks & Levels**: Gamified consistency tracking to keep you motivated.

### 🛠️ Premium Tools
-   **Plate Calculator**: Never do math at the barbell again.
-   **Rest Timer**: Configurable rest intervals with sound notifications.
-   **Glassmorphic UI**: A stunning, high-performance dark mode interface.

### 🔐 Secure & Personalized
-   **User Authentication**: Secure JWT-based login and registration.
-   **Private Logs**: Your data is bound to your account.

## 🚀 Tech Stack

-   **Frontend**: React (Vite), Chart.js, Custom Glassmorphic CSS.
-   **Backend**: Python FastAPI, SQLAlchemy, Pydantic.
-   **Database**: SQLite (Local), Flexible CORS for deployment.

## 🏃‍♂️ Getting Started

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
    *The API will start at http://127.0.0.1:8000*

3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *The App will start at http://localhost:5173*

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
MIT License.
