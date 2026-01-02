import { useState } from 'react'
import './AuthScreen.css'

interface SignupScreenProps {
  onSignup: (name: string, phone: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

const SignupScreen = ({ onSignup, onSwitchToLogin }: SignupScreenProps) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onSignup(name, phone, email, password)
  }

  return (
    <div className="auth-screen">
      <img src="/Applogo.png" alt="ABC App Logo" className="auth-top-logo" />
      <h1 className="auth-title">Create Account</h1>
      <p className="auth-subtitle">Register as delivery agent</p>

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className="form-input"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-full" onClick={handleSubmit}>
        Create Account
      </button>

      <div className="toggle-auth">
        Already have an account?{' '}
        <a onClick={onSwitchToLogin}>Sign In</a>
      </div>
    </div>
  )
}

export default SignupScreen
