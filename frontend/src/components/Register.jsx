import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/api';

function Register({ onSwitch }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const validatePassword = (pwd) => {
        // Broadened regex to allow more special chars: @$!%*?&#_.-
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_.-])[A-Za-z\d@$!%*?&#_.-]{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword(password)) {
            setError("Password must be 8+ characters, include Uppercase, Lowercase, Number, and Special Character.");
            alert("Weak Password: Ensure you have 1 Upper, 1 Lower, 1 Number, and 1 Special Character.");
            return;
        }

        setLoading(true);
        try {
            console.log("Attempting registration:", email);
            const res = await registerUser(email, password);
            console.log("Registration success:", res.data);
            login(res.data.access_token);
        } catch (err) {
            console.error("Registration error:", err);
            const msg = err.response?.data?.detail || 'Registration failed';
            setError(msg);
            alert("Error: " + msg); // Force visibility
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card fade-in" style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
            <h1>AUTO COACH</h1>
            <div className="subtitle mb-4">Create your account</div>

            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="email" placeholder="Email"
                    className="input-glass mb-4"
                    value={email} onChange={e => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password" placeholder="Password"
                    className="input-glass mb-4"
                    value={password} onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />

                {error && <div className="status-badge status-red mb-4" style={{ textAlign: 'left', fontSize: '12px' }}>{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <span className="spinner"></span> : "CREATE ACCOUNT"}
                </button>
            </form>

            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Already have an account? <span style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }} onClick={onSwitch}>Login</span>
            </div>
        </div>
    );
}

export default Register;
