-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL
);

-- Exercises Table
CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    muscle_group VARCHAR NOT NULL,
    type VARCHAR, -- 'compound' or 'isolation'
    category VARCHAR, -- 'free_weight', 'machine', 'bodyweight', 'cable'
    fatigue_score FLOAT DEFAULT 1.0
);

-- Logs Table
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exercise_name VARCHAR NOT NULL,
    weight FLOAT,
    reps INTEGER,
    rpe FLOAT,
    is_warmup BOOLEAN DEFAULT FALSE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_date ON logs(date);
