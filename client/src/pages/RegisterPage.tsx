import { useState, useId, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { postJson } from '@/api/client';
import './AuthPage.css';

type RegisterResponse = {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    companyName?: string;
  };
};

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const formId = useId();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const res = await postJson<RegisterResponse>('/api/auth/register', {
        name,
        email,
        phone,
        companyName,
        password,
      });

      if (res.token) {
        localStorage.setItem('harborline_auth_token', res.token);
        localStorage.setItem('harborline_user', JSON.stringify(res.user));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Register"
        description="Create your Global Logistics Solutions account"
        path="/register"
      />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-card__header">
              <h1 className="auth-card__title">Register</h1>
              <p className="auth-card__subtitle">
                Create an account to track shipments, request freight quotes, and manage inquiries.
              </p>
            </div>

            {error && (
              <div className="auth-alert auth-alert--error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor={`${formId}-name`}>Full Name *</label>
                <div className="auth-input-wrapper">
                  <input
                    id={`${formId}-name`}
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor={`${formId}-email`}>Email *</label>
                <div className="auth-input-wrapper">
                  <input
                    id={`${formId}-email`}
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div className="auth-form-group">
                  <label htmlFor={`${formId}-phone`}>Phone (WhatsApp)</label>
                  <div className="auth-input-wrapper">
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      placeholder="+971 50 123 4567"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-form-group">
                  <label htmlFor={`${formId}-company`}>Company Name</label>
                  <div className="auth-input-wrapper">
                    <input
                      id={`${formId}-company`}
                      type="text"
                      autoComplete="organization"
                      value={companyName}
                      placeholder="Company name"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor={`${formId}-password`}>Password * (min. 6 characters)</label>
                <div className="auth-input-wrapper">
                  <input
                    id={`${formId}-password`}
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={password}
                    placeholder="Create a password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor={`${formId}-confirm-password`}>Confirm Password *</label>
                <div className="auth-input-wrapper">
                  <input
                    id={`${formId}-confirm-password`}
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Register'}
              </button>
            </form>

            <div className="auth-card__footer">
              Already have an account? <Link to="/login">Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
