import { useState, useContext } from 'react';
import Header from './components/Header';
import GoalSelection from './components/GoalSelection';
import SplitSelection from './components/SplitSelection';
import WorkoutSetup from './components/WorkoutSetup';
import ActiveWorkout from './components/ActiveWorkout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './context/AuthContext';
import { fetchExercises, generatePlan, fetchHistory, logWorkout } from './services/api';

function App() {
  const { user, loading: authLoading, logout } = useContext(AuthContext);
  const [authView, setAuthView] = useState('login');

  // --- STATE ---
  const [view, setView] = useState('coach'); // 'coach' | 'dashboard'
  const [userGoal, setUserGoal] = useState(null);
  const [muscleGroup, setMuscleGroup] = useState(null);

  // Data State
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [workoutStyle, setWorkoutStyle] = useState("compound_focus");

  // Active Session State
  const [plan, setPlan] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleGoalSelect = (goal) => {
    setUserGoal(goal);
    // Auto-set preference based on goal
    setWorkoutStyle(goal === 'strength' ? 'compound_focus' : 'machine_focus');
  };

  const loadExercises = async (muscle, style) => {
    setLoading(true);
    try {
      const res = await fetchExercises(muscle, style);
      setExerciseList(res.data);
      if (res.data.length > 0) setSelectedExercise(res.data[0].name);
      else setSelectedExercise("");
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend. Is it running?");
    }
    setLoading(false);
  };

  const handleDaySelect = async (muscle) => {
    setMuscleGroup(muscle);
    await loadExercises(muscle, workoutStyle);
  };

  const handleStyleChange = async (newStyle) => {
    setWorkoutStyle(newStyle);
    if (muscleGroup) await loadExercises(muscleGroup, newStyle);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const resPlan = await generatePlan(muscleGroup, selectedExercise);
      setPlan(resPlan.data);

      const resHist = await fetchHistory(selectedExercise);
      setHistory(resHist.data);
    } catch (err) {
      alert("Error generating plan");
    }
    setLoading(false);
  };

  const handleLog = async (weight, reps, date) => {
    if (!weight || !reps) return alert("Please enter weight and reps!");

    try {
      await logWorkout({
        exercise_name: plan.exercise,
        weight: parseFloat(weight),
        reps: parseInt(reps),
        rpe: 8,
        date: date
      });
      alert("✅ Workout Logged Successfully!");
      setPlan(null); // Close modal/go back
    } catch (err) {
      alert("Failed to save log.");
    }
  };

  // --- AUTH RENDER ---
  if (authLoading) return <div className="app-container flex-center">Loading...</div>;

  if (!user) {
    return (
      <div className="app-container">
        {authView === 'login'
          ? <Login onSwitch={() => setAuthView('register')} />
          : <Register onSwitch={() => setAuthView('login')} />
        }
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="app-container">
      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px', color: '#64748b' }}>
        {user.email} | <button onClick={logout} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Logout</button>
      </div>

      <Header
        userGoal={userGoal}
        onReset={() => {
          setView('coach');
          setUserGoal(null);
          setMuscleGroup(null);
          setPlan(null);
        }}
        onDashboard={() => setView('dashboard')}
      />

      {loading && (
        <div className="card text-center" style={{ padding: '40px' }}>
          <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>Running Coach Algorithm...</div>
        </div>
      )}

      {/* DASHBOARD VIEW */}
      {view === 'dashboard' && (
        <Dashboard onBack={() => setView('coach')} />
      )}

      {/* COACH VIEW FLOW */}
      {view === 'coach' && (
        <>
          {/* VIEW 1: GOAL SELECTION */}
          {!userGoal && !loading && (
            <GoalSelection onSelect={handleGoalSelect} />
          )}

          {/* VIEW 2: SPLIT SELECTION */}
          {userGoal && !muscleGroup && !loading && (
            <SplitSelection
              userGoal={userGoal}
              onBack={() => setUserGoal(null)}
              onSelectDay={handleDaySelect}
            />
          )}

          {/* VIEW 3: SETUP */}
          {muscleGroup && !plan && !loading && (
            <WorkoutSetup
              muscleGroup={muscleGroup}
              workoutStyle={workoutStyle}
              onStyleChange={handleStyleChange}
              exerciseList={exerciseList}
              selectedExercise={selectedExercise}
              onExerciseChange={setSelectedExercise}
              onGenerate={handleGenerate}
              onClose={() => setMuscleGroup(null)}
            />
          )}

          {/* VIEW 4: ACTIVE WORKOUT */}
          {plan && (
            <ActiveWorkout
              plan={plan}
              history={history}
              onClose={() => setPlan(null)}
              onLog={handleLog}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;