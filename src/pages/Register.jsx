import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, User, Droplet, Phone, AlertTriangle } from 'lucide-react';
import './Auth.css';

const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bloodGroup: '',
        allergies: '',
        emergencyContact1: '',
        emergencyContact2: '',
        emergencyContact3: '',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await register(formData);
        if (result.success) {
            alert('Registration successful! Please login.');
            navigate('/login');
        } else {
            setError(result.message);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="auth-page">
            <Helmet>
                <title>Register - MediAid</title>
                <meta name="description" content="Create a MediAid account to save your medical history and emergency contacts for quick access during emergencies." />
            </Helmet>
            <div className="auth-container register-container">
                <div className="auth-header">
                    <UserPlus size={40} className="auth-icon" />
                    <h1>Create Account</h1>
                    <p>Step {step} of 2</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {step === 1 ? (
                        <div className="form-step">
                            <div className="form-group">
                                <label><User size={16} /> Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div className="form-group">
                                <label><Droplet size={16} /> Blood Group</label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                                    <option value="">Select Group</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            <button type="button" onClick={nextStep} className="auth-btn">Next</button>
                        </div>
                    ) : (
                        <div className="form-step">
                            <div className="form-group">
                                <label><AlertTriangle size={16} /> Allergies / Conditions</label>
                                <textarea
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    placeholder="Optional"
                                />
                            </div>
                            <div className="form-group">
                                <label><Phone size={16} /> Emergency Contact 1 *</label>
                                <input
                                    type="tel"
                                    name="emergencyContact1"
                                    value={formData.emergencyContact1}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label><Phone size={16} /> Emergency Contact 2</label>
                                <input
                                    type="tel"
                                    name="emergencyContact2"
                                    value={formData.emergencyContact2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={prevStep} className="auth-btn secondary">Back</button>
                                <button type="submit" className="auth-btn">Register</button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
