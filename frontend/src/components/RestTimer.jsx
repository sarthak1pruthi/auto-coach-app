import { useState, useEffect } from 'react';
import { playTimerCompleteSound } from '../utils/sound';

function RestTimer({ defaultSeconds = 90 }) {
    const [seconds, setSeconds] = useState(defaultSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            setIsActive(false);
            playTimerCompleteSound();
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggle = () => setIsActive(!isActive);
    const reset = () => {
        setIsActive(false);
        setSeconds(defaultSeconds);
    };
    const addTime = (secs) => setSeconds(s => s + secs);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="card" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex-between mb-4">
                <div className="label-mini">Rest Timer</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', color: seconds < 10 && isActive ? '#ef4444' : 'white' }}>
                    {formatTime(seconds)}
                </div>
            </div>

            <div className="grid-2">
                {!isActive ? (
                    <button className="btn-primary" style={{ padding: '10px' }} onClick={toggle}>START</button>
                ) : (
                    <button className="btn-primary" style={{ padding: '10px', background: '#ef4444', borderColor: '#ef4444' }} onClick={toggle}>PAUSE</button>
                )}
                <button className="btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} onClick={reset}>RESET</button>
            </div>
            <div className="flex-between" style={{ marginTop: '12px', gap: '8px' }}>
                <button className="btn-ghost" onClick={() => addTime(30)}>+30s</button>
                <button className="btn-ghost" onClick={() => addTime(-30)}>-30s</button>
            </div>
        </div>
    );
}

export default RestTimer;
