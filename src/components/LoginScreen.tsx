import { useState } from 'react'
import './AuthScreen.css'

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

const LoginScreen = ({ onLogin, onSwitchToSignup }: LoginScreenProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onLogin(email, password)
  }

  return (
    <div className="auth-screen">
      <img src="/Applogo.png" alt="ABC App Logo" className="auth-top-logo" />
      <h1 className="auth-title">Welcome Back</h1>
      <p className="auth-subtitle">Sign in to continue</p>

      <div className="form-group">
        <label className="form-label">Phone or Email</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your phone or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-full" onClick={handleSubmit}>
        Sign In
      </button>

      <div className="toggle-auth">
        Don't have an account?{' '}
        <a onClick={onSwitchToSignup}>Sign Up</a>
      </div>
    </div>
  )
}

export default LoginScreen
