import { useState, useEffect } from 'react';
import { fetchUserStats } from '../services/api';

function Header({ userGoal, onReset, onDashboard }) {
    const [stats, setStats] = useState({ streak: 0, level: 1 });

    useEffect(() => {
        fetchUserStats().then(res => setStats(res.data)).catch(console.error);
    }, [userGoal]);

    return (
        <div className="flex-between mb-4" style={{ paddingTop: '10px' }}>
            <div>
                <h1>AUTO COACH</h1>
                <div className="subtitle">AI Strength & Hypertrophy</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#fbbf24' }}>🔥 {stats.streak} Streak</span>
                    <span style={{ color: '#a78bfa' }}>⭐ Lvl {stats.level}</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={onDashboard} className="btn-icon-small" title="Stats Dashboard">
                    📊
                </button>
                {userGoal && (
                    <button onClick={onReset} className="tag-outline" style={{ background: 'transparent' }}>
                        {userGoal} ↺
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header;
