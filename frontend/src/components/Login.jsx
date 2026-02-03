import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';

function Login({ onSwitch }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await loginUser(email, password);
            login(res.data.access_token);
        } catch (err) {
            console.error(err);
            const msg = "Invalid credentials";
            setError(msg);
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSocial = () => alert("Social Login requires API Keys (Google/X). Please use Email/Password for this demo!");

    return (
        <div className="card fade-in" style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
            <h1>AUTO COACH</h1>
            <div className="subtitle mb-4">Login to your account</div>

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

                {error && <div className="status-badge status-red mb-4">{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <span className="spinner"></span> : "LOGIN"}
                </button>
            </form>

            <div className="flex-center" style={{ gap: '10px', marginBottom: '20px' }}>
                <button type="button" className="btn-icon-small" onClick={handleSocial} title="Google (Coming Soon)">G</button>
                <button type="button" className="btn-icon-small" onClick={handleSocial} title="Twitter (Coming Soon)">X</button>
            </div>

            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Don't have an account? <span style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }} onClick={onSwitch}>Sign Up</span>
            </div>
        </div>
    );
}

export default Login;
