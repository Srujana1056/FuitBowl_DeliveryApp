import { AppState } from '../types'
import './Dashboard.css'

interface DashboardProps {
  appState: AppState;
  onToggleOnline: () => void;
}

const Dashboard = ({ appState, onToggleOnline }: DashboardProps) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="toggle-container">
          <span className="toggle-label">{appState.isOnline ? 'Online' : 'Offline'}</span>
          <div
            className={`toggle-switch ${appState.isOnline ? 'active' : ''}`}
            onClick={onToggleOnline}
          >
            <div className="toggle-slider"></div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className={`status-badge ${appState.isOnline ? 'status-online' : 'status-offline'}`}>
          {appState.isOnline ? '🟢 Online' : '🔴 Offline'}
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Today's Summary</h3>
        <div className="card">
          <div className="card-title">Orders Delivered</div>
          <div className="card-value">{appState.todayOrdersDelivered}</div>
          <div className="card-subtitle">Completed today</div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Active Orders</h3>
        {appState.activeOrders && appState.activeOrders.length > 0 ? (
          <div>
            {appState.activeOrders
              .slice()
              .sort((a, b) => (a.distance || 0) - (b.distance || 0))
              .map(o => (
                <div className="active-order-card" key={o.id}>
                  <div className="active-order-header">
                    <div className="active-order-customer">{o.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>Order: {o.id}</div>
                  </div>
                  <div className="active-order-address">{o.address}</div>
                  <div style={{ fontSize: '12px', color: '#777' }}>{o.type} • {o.type === 'One-Time' ? 'COD' : 'Prepaid'}</div>
                </div>
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">No Active Orders</div>
            <div className="empty-state-text">Accept an order to start delivery</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
