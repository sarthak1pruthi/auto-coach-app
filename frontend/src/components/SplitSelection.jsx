import { SPLITS } from '../data/splits';

function SplitSelection({ userGoal, onBack, onSelectDay }) {
    const currentSplits = SPLITS[userGoal] || [];

    return (
        <div className="animate-in">
            <div className="flex-between mb-4">
                <h2>Select Program</h2>
                <button className="btn-ghost" onClick={onBack}>← Back</button>
            </div>

            {currentSplits.map((split, i) => (
                <div key={i} className="split-card">
                    <div className="flex-between mb-4">
                        <span style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>{split.name}</span>
                        <span className="tag-outline" style={{ fontSize: '10px' }}>{split.desc}</span>
                    </div>

                    <div className="grid-2">
                        {split.schedule.map((day, j) => (
                            <div key={j} className="day-tag" onClick={() => onSelectDay(day.muscle)}>
                                <span className="day-name">{day.day}</span>
                                <span className="day-focus">{day.focus}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SplitSelection;
