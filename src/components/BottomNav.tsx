import './BottomNav.css'

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: 'dashboard' | 'orders' | 'gps' | 'profile') => void;
}

const BottomNav = ({ currentScreen, onNavigate }: BottomNavProps) => {
  return (
    <div className="bottom-nav">
      <div
        className={`nav-item ${currentScreen === 'dashboard' ? 'active' : ''}`}
        onClick={() => onNavigate('dashboard')}
      >
        <div className="nav-icon">🏠</div>
        <div className="nav-label">Home</div>
      </div>

      <div
        className={`nav-item ${currentScreen === 'orders' ? 'active' : ''}`}
        onClick={() => onNavigate('orders')}
      >
        <div className="nav-icon">📋</div>
        <div className="nav-label">Orders</div>
      </div>

      <div
        className={`nav-item ${currentScreen === 'gps' ? 'active' : ''}`}
        onClick={() => onNavigate('gps')}
      >
        <div className="nav-icon">🗺️</div>
        <div className="nav-label">GPS</div>
      </div>

      <div
        className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
        onClick={() => onNavigate('profile')}
      >
        <div className="nav-icon">👤</div>
        <div className="nav-label">Profile</div>
      </div>
    </div>
  )
}

export default BottomNav
