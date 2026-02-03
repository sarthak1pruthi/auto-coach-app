# Deployment Guide

To make the app work on a "real server", follow these steps.

## 1. GitHub Setup
I have initialized a local git repository. To push it to GitHub:
1.  Create a new repository on GitHub (e.g., `auto-coach-app`).
2.  Run these commands in your terminal:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/auto-coach-app.git
    git branch -M main
    git push -u origin main
    ```

## 2. Deploying Backend (Render.com - Free Tier)
1.  Sign up for [Render.com](https://render.com).
2.  New "Web Service" -> Connect your GitHub repo.
3.  Settings:
    *   **Root Directory**: `backend`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
    *   **Environment Variables**:
        *   `PYTHON_VERSION`: `3.9.0`
4.  Copy the URL Render gives you (e.g., `https://auto-coach-backend.onrender.com`).

## 3. Deploying Frontend (Vercel - Free Tier)
1.  Sign up for [Vercel](https://vercel.com).
2.  New Project -> Import from GitHub.
3.  Settings:
    *   **Root Directory**: `frontend`
    *   **Environment Variables**:
        *   `VITE_API_URL`: `https://auto-coach-backend.onrender.com` (The URL from step 2)
4.  Deploy!

## 4. Database
Currently, the app uses `SQLite`, which is a file. On generic cloud hosts (like Render free tier), the file will be **wiped** every time you redeploy or the server restarts.
*   **For a Production App**: You should verify using a hosted PostgreSQL database (Render provides one) and update the `DATABASE_URL` env var.
*   **For a Demo**: SQLite is fine, but data won't persist long-term.
