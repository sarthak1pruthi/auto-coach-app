function GoalSelection({ onSelect }) {
    return (
        <div className="grid-2 animate-in">
            <button className="tile-btn" onClick={() => onSelect('strength')}>
                <h4>⚡ Strength</h4>
                <p>Focus on compound movements, lower rep ranges, and maximal force production.</p>
            </button>

            <button className="tile-btn" onClick={() => onSelect('hypertrophy')}>
                <h4>🦍 Hypertrophy</h4>
                <p>Maximize muscle growth with higher volume, isolation work, and metabolic stress.</p>
            </button>
        </div>
    );
}

export default GoalSelection;
