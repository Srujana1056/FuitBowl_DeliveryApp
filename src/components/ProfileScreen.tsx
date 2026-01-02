import { User } from '../types'
import './ProfileScreen.css'

interface ProfileScreenProps {
  user: User;
  earningsToday: number;
  earningsTotal: number;
  onLogout: () => void;
}

const ProfileScreen = ({ user, earningsToday, earningsTotal, onLogout }: ProfileScreenProps) => {
  return (
    <div className="profile-screen">
      <h2 className="screen-title">Profile</h2>

      <div className="profile-info">
        <div className="profile-avatar">👤</div>
        <div className="profile-name">{user.name || 'Delivery Agent'}</div>
        <div className="profile-phone">{user.phone || user.email || 'N/A'}</div>
      </div>

      <div className="section" style={{ marginTop: '24px' }}>
        <h3 className="section-title">Your Earnings</h3>
        <div className="earnings-card">
          <div className="earnings-item">
            <div className="earnings-label">Today's Earnings</div>
            <div className="earnings-amount">₹{earningsToday}</div>
          </div>
          <div className="earnings-item">
            <div className="earnings-label">Total Earnings</div>
            <div className="earnings-amount">₹{earningsTotal}</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Delivery Area</h3>
        <div className="card">
          <div style={{ fontSize: '14px', color: '#666' }}>North Delhi Zone</div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Help & Support</h3>
        <div className="card">
          <div style={{ fontSize: '14px', fontWeight: 600 }}>📞 Contact Support: 1800-DELIVERY</div>
        </div>
      </div>

      <button className="btn btn-secondary btn-full" onClick={onLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  )
}

export default ProfileScreen
