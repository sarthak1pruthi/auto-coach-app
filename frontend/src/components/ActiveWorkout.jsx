import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import RestTimer from './RestTimer';
import PlateCalculator from './PlateCalculator';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ActiveWorkout({ plan, history, onClose, onLog }) {
    const [showPlates, setShowPlates] = useState(false);

    const handleComplete = () => {
        const w = document.getElementById('actual-weight').value;
        const r = document.getElementById('actual-reps').value;
        const d = document.getElementById('log-date').value;
        onLog(w, r, d);
    };

    return (
        <div className="card">
            <div className="flex-between mb-4">
                <span className={`status-badge ${plan.strategy === 'Deload' ? 'status-red' : 'status-green'}`}>
                    {plan.strategy}
                </span>
                <button className="btn-icon-small" onClick={onClose}>×</button>
            </div>

            <h2 style={{ lineHeight: '1.2' }}>{plan.exercise}</h2>

            {/* COACH SUGGESTION */}
            {plan.suggestion && (
                <div style={{
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ fontSize: '18px' }}>💡</span>
                    <span style={{ color: 'white', fontWeight: '500' }}>{plan.suggestion}</span>
                </div>
            )}

            {/* CHART */}
            <div className="chart-container">
                {history.length > 0 ? (
                    <>
                        <div style={{ height: '120px' }}>
                            <Line options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { display: false },
                                    y: {
                                        grid: { color: 'rgba(255,255,255,0.05)' },
                                        ticks: { color: '#94a3b8', font: { size: 10 } }
                                    }
                                },
                                elements: { point: { radius: 2, hitRadius: 20 }, line: { borderWidth: 2 } }
                            }}
                                data={{
                                    labels: history.map(h => h.date),
                                    datasets: [{
                                        data: history.map(h => h.weight),
                                        borderColor: '#3b82f6',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        tension: 0.4,
                                        fill: true
                                    }]
                                }}
                            />
                        </div>
                        <div className="flex-between" style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
                            <span>Est 1RM: <b style={{ color: '#10b981' }}>{plan.estimated_1rm || "-"} lbs</b></span>
                            <span>Target: <b style={{ color: '#3b82f6' }}>{plan.target_weight} lbs</b></span>
                        </div>
                    </>
                ) : (
                    <div className="text-center" style={{ padding: '20px', color: '#94a3b8', fontSize: '12px' }}>
                        No history available. Log this workout to start tracking progress!
                    </div>
                )}
            </div>

            {/* INPUTS */}
            <div className="grid-2 mb-4">
                <div>
                    <div className="flex-between">
                        <label className="label-mini">Weight (lbs)</label>
                        <button
                            onClick={() => setShowPlates(!showPlates)}
                            style={{ fontSize: '10px', color: '#3b82f6', background: 'transparent', padding: 0 }}
                        >
                            {showPlates ? 'Hide Calc' : 'Calc Plates'}
                        </button>
                    </div>
                    <input id="actual-weight" type="number" className="input-glass" defaultValue={plan.target_weight} />
                </div>
                <div>
                    <label className="label-mini">Reps</label>
                    <input id="actual-reps" type="number" className="input-glass" placeholder={plan.target_reps.split(' ')[0]} />
                </div>
            </div>

            {showPlates && (
                <div className="mb-4 fade-in">
                    <PlateCalculator targetWeight={plan.target_weight} />
                </div>
            )}

            <div className="mb-4">
                <label className="label-mini">Date</label>
                <input id="log-date" type="date" className="input-glass" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            {plan.note && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="label-mini" style={{ color: '#3b82f6' }}>Plan Strategy</div>
                    <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#e2e8f0' }}>{plan.note}</div>
                </div>
            )}

            {/* WARMUPS */}
            {plan.warmups.length > 0 && (
                <div className="mb-4">
                    <label className="label-mini">Smart Warmup Sets</label>
                    {plan.warmups.map((s, i) => (
                        <div key={i} className="warmup-item">
                            <span style={{ color: '#94a3b8' }}>{s.label}</span>
                            <b style={{ color: 'white' }}>{s.weight} lbs x {s.reps}</b>
                        </div>
                    ))}
                </div>
            )}

            <div className="mb-4">
                <RestTimer />
            </div>

            <button className="btn-primary" onClick={handleComplete}>COMPLETE SESSION</button>
        </div>
    );
}

export default ActiveWorkout;
