function WorkoutSetup({
    muscleGroup,
    workoutStyle,
    onStyleChange,
    exerciseList,
    selectedExercise,
    onExerciseChange,
    onGenerate,
    onClose
}) {
    return (
        <div className="card">
            <div className="flex-between mb-4">
                <h3 style={{ margin: 0, color: 'white' }}>Configure Session</h3>
                <button className="btn-icon-small" onClick={onClose}>×</button>
            </div>

            {/* Style Toggle */}
            <label className="label-mini">Equipment Preference</label>
            <div className="toggle-group">
                <button
                    className={`toggle-item ${workoutStyle === 'compound_focus' ? 'active' : ''}`}
                    onClick={() => onStyleChange('compound_focus')}
                >
                    Free Weights
                </button>
                <button
                    className={`toggle-item ${workoutStyle === 'machine_focus' ? 'active' : ''}`}
                    onClick={() => onStyleChange('machine_focus')}
                >
                    Machines / Cables
                </button>
            </div>

            {/* Exercise Dropdown */}
            <div className="mb-4">
                <label className="label-mini">Target Movement</label>
                <select
                    className="input-glass"
                    value={selectedExercise}
                    onChange={(e) => onExerciseChange(e.target.value)}
                >
                    {exerciseList.map(ex => (
                        <option key={ex.name} value={ex.name}>{ex.name}</option>
                    ))}
                </select>
            </div>

            <button className="btn-primary" onClick={onGenerate}>
                GENERATE PLAN
            </button>
        </div>
    );
}

export default WorkoutSetup;
