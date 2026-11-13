import { useState, useId, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { postJson } from '@/api/client';
import './AuthPage.css';

type LoginResponse = {
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

export function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formId = useId();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await postJson<LoginResponse>('/api/auth/login', {
        email: identifier,
        password,
      });

      if (res.token) {
        localStorage.setItem('harborline_auth_token', res.token);
        localStorage.setItem('harborline_user', JSON.stringify(res.user));

        if (res.user.role === 'admin') {
          localStorage.setItem('harborline_admin_token', res.token);
        }

        window.dispatchEvent(new Event('storage'));

        const redirectTo = searchParams.get('redirect') || (res.user.role === 'admin' ? '/admin' : '/');
        navigate(redirectTo);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Login"
        description="Sign in to your Global Logistics Solutions account"
        path="/login"
      />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-card__header">
              <h1 className="auth-card__title">Login</h1>
              <p className="auth-card__subtitle">
                Enter your email or username and password to access your account.
              </p>
            </div>

            {error && (
              <div className="auth-alert auth-alert--error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor={`${formId}-identifier`}>Email or Username</label>
                <div className="auth-input-wrapper">
                  <input
                    id={`${formId}-identifier`}
                    type="text"
                    required
                    autoComplete="username"
                    value={identifier}
                    placeholder="Enter email or username"
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor={`${formId}-password`}>Password</label>
                <div className="auth-input-wrapper">
                  <input
                    id={`${formId}-password`}
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    placeholder="Enter password"
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

              <button
                type="submit"
                className="btn btn--primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
                disabled={loading}
              >
                {loading ? 'Logging in…' : 'Log In'}
              </button>
            </form>

            <div className="auth-card__footer">
              Don&apos;t have an account? <Link to="/register">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
