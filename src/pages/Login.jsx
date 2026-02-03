import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Strict Email Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email (e.g., user@example.com)';
    }

    // Strong Password Validation
    // At least 6 chars, 1 special char
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!specialCharRegex.test(password)) {
      newErrors.password = 'Password must contain at least one special character (!@#$...)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!validate()) {
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
  };

  return (
    <div className="login-page">
      <div className="login-card animate-fade-in">
        <div className="login-header">
          <div className="logo-icon-lg">BX</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your dashboard</p>
        </div>

        {authError && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={20} className={`input-icon ${errors.email ? 'text-danger' : ''}`} />
              <input
                type="email"
                className={`input input-pl ${errors.email ? 'input-error' : ''}`}
                placeholder="admin@bookxpert.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label className="label">Password</label>
            <div className="input-with-icon">
              <Lock size={20} className={`input-icon ${errors.password ? 'text-danger' : ''}`} />
              <input
                type="password"
                className={`input input-pl ${errors.password ? 'input-error' : ''}`}
                placeholder="Min 6 chars + special char"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials: admin@bookxpert.com / admin@123</p>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 1rem;
        }

        .login-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-glass);
          width: 100%;
          max-width: 400px;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-icon-lg {
          width: 48px;
          height: 48px;
          background: var(--primary-color);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        
        .input-icon.text-danger {
            color: var(--danger-color);
        }

        .input-pl {
          padding-left: 38px;
        }

        .error-message {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .field-error {
            color: var(--danger-color);
            font-size: 0.75rem;
            margin-top: 0.25rem;
        }
        
        .input-error {
            border-color: var(--danger-color);
        }
        
        .input-error:focus {
             box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .mt-4 { margin-top: 1rem; }
        
        .login-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-light);
        }
      `}</style>
    </div>
  );
};

export default Login;
