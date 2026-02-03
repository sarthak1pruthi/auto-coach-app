import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchStats } from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard({ onBack }) {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats().then(res => setStats(res.data)).catch(console.error);
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Weekly Volume (Sets)', color: '#94a3b8' },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    const data = stats ? {
        labels: stats.labels,
        datasets: [
            {
                label: 'Sets',
                data: stats.data,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: '#3b82f6',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    } : null;

    return (
        <div className="card fade-in">
            <div className="flex-between mb-4">
                <h2>Weekly Progress</h2>
                <button className="btn-icon-small" onClick={onBack}>×</button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
                {stats ? <Bar options={options} data={data} /> : <div className="text-center">Loading stats...</div>}
            </div>

            <div className="grid-2">
                <div className="tile-btn" style={{ height: 'auto' }}>
                    <h4>Total Volume</h4>
                    <p>{stats ? stats.data.reduce((a, b) => a + b, 0) : 0} sets this week</p>
                </div>
                <div className="tile-btn" style={{ height: 'auto' }}>
                    <h4>Consistency</h4>
                    <p>On track to hit goals.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
