import { useState, useEffect } from 'react';

function PlateCalculator({ targetWeight }) {
    const [plates, setPlates] = useState([]);
    const [weight, setWeight] = useState(targetWeight || 45);

    useEffect(() => {
        calculatePlates(weight);
    }, [weight]);

    const calculatePlates = (w) => {
        if (w < 45) { setPlates([]); return; }
        let remaining = (w - 45) / 2;
        const available = [45, 35, 25, 10, 5, 2.5];
        const needed = [];

        for (let p of available) {
            while (remaining >= p) {
                needed.push(p);
                remaining -= p;
            }
        }
        setPlates(needed);
    };

    const getHeight = (p) => {
        if (p === 45) return '80px';
        if (p === 35) return '70px';
        if (p === 25) return '60px';
        if (p === 10) return '40px';
        return '30px';
    };

    const getColor = (p) => {
        if (p === 45) return '#3b82f6'; // Blue
        if (p === 35) return '#eab308'; // Yellow
        if (p === 25) return '#22c55e'; // Green
        if (p === 10) return '#ffffff'; // White
        return '#94a3b8'; // Small
    };

    return (
        <div className="card" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex-between mb-4">
                <div className="label-mini">Plate Calculator</div>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="input-glass"
                    style={{ width: '80px', padding: '8px', height: 'auto' }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', gap: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                {/* Barbell End */}
                <div style={{ width: '10px', height: '20px', background: '#94a3b8' }}></div>
                <div style={{ width: '60px', height: '20px', background: '#cbd5e1' }}></div>

                {/* Plates */}
                {plates.length === 0 ? <span style={{ fontSize: '11px', color: '#64748b' }}>Empty Bar</span> : null}
                {plates.map((p, i) => (
                    <div key={i} style={{
                        width: '12px',
                        height: getHeight(p),
                        background: getColor(p),
                        borderRadius: '2px',
                        border: '1px solid rgba(0,0,0,0.2)'
                    }} title={`${p} lbs`}></div>
                ))}

                {/* Collar */}
                <div style={{ width: '10px', height: '25px', background: '#ef4444', marginLeft: '2px' }}></div>
            </div>

            <div className="text-center" style={{ marginTop: '12px', fontSize: '11px', color: '#94a3b8' }}>
                {plates.length > 0 ? `${plates.join(' + ')} (per side)` : 'Just the bar (45 lbs)'}
            </div>
        </div>
    );
}

export default PlateCalculator;
