import { Order } from '../types'
import './GPSScreen.css'

interface GPSScreenProps {
  activeOrder: Order | null;
  onUpdateStatus: (status: string) => void;
  onConfirmCash: () => void;
  onCompleteDelivery: () => void;
}

const GPSScreen = ({ activeOrder, onUpdateStatus, onConfirmCash, onCompleteDelivery }: GPSScreenProps) => {
  if (!activeOrder) {
    return (
      <div className="gps-screen">
        <h2 className="screen-title">GPS Navigation & Delivery</h2>
        <div className="empty-state">
          <div className="empty-state-icon">🗺️</div>
          <div className="empty-state-title">No Active Order</div>
          <div className="empty-state-text">Accept an order to start navigation</div>
        </div>
      </div>
    )
  }

  const statusSteps = ['accepted', 'picked', 'out_for_delivery', 'arrived']
  const currentStatusIndex = statusSteps.indexOf(activeOrder.deliveryStatus || 'accepted')
  const distance = Math.max(0, activeOrder.distance - (currentStatusIndex * 0.5))

  return (
    <div className="gps-screen">
      <h2 className="screen-title">GPS Navigation & Delivery</h2>

      <div className="gps-container">
        <h3 className="section-title">Delivery Route</h3>
        <div className="gps-map">
          <div className="gps-marker"></div>
        </div>
        <div className="gps-info">
          <div className="gps-info-item">
            <div className="gps-info-label">Distance</div>
            <div className="gps-info-value">{distance.toFixed(1)} km</div>
          </div>
          <div className="gps-info-item">
            <div className="gps-info-label">ETA</div>
            <div className="gps-info-value">{Math.ceil(distance * 3)} min</div>
          </div>
        </div>
      </div>

      <div className="gps-container">
        <h3 className="section-title">Order Status</h3>
        <div className="status-flow">
          <div className="status-item">
            <div className={`status-circle ${currentStatusIndex >= 0 ? 'active' : ''}`}>✓</div>
            <div className="status-label">Accepted</div>
          </div>
          <div className="status-item">
            <div className={`status-circle ${currentStatusIndex >= 1 ? 'active' : ''}`}>📦</div>
            <div className="status-label">Picked</div>
          </div>
          <div className="status-item">
            <div className={`status-circle ${currentStatusIndex >= 2 ? 'active' : ''}`}>🚴</div>
            <div className="status-label">Out</div>
          </div>
          <div className="status-item">
            <div className={`status-circle ${currentStatusIndex >= 3 ? 'active' : ''}`}>🎉</div>
            <div className="status-label">Arrived</div>
          </div>
        </div>
      </div>

      <div className="gps-container">
        <h3 className="section-title">Actions</h3>
        <div className="status-actions">
          <button
            className="btn-status primary"
            onClick={() => onUpdateStatus('picked')}
            disabled={currentStatusIndex >= 1}
          >
            Mark as Picked
          </button>
          <button
            className="btn-status primary"
            onClick={() => onUpdateStatus('out_for_delivery')}
            disabled={currentStatusIndex >= 2}
          >
            Out for Delivery
          </button>
          <button
            className="btn-status primary"
            onClick={() => onUpdateStatus('arrived')}
            disabled={currentStatusIndex >= 3}
          >
            Mark as Arrived
          </button>
        </div>
      </div>

      <div className="cash-container">
        <h3 className="section-title">Cash Collection</h3>
        <div className="cash-amount">₹{activeOrder.codAmount}</div>
        <div className={`cash-status ${activeOrder.cashConfirmed ? 'collected' : 'pending'}`}>
          <div className="cash-icon">{activeOrder.cashConfirmed ? '✓' : '⏳'}</div>
          <div>{activeOrder.cashConfirmed ? 'Cash Collected' : 'Pending Collection'}</div>
        </div>

        {currentStatusIndex >= 3 && !activeOrder.cashConfirmed && (
          <button className="btn-status primary" onClick={onConfirmCash}>
            Confirm Cash Collected
          </button>
        )}

        {activeOrder.cashConfirmed && (
          <button className="btn-status primary" onClick={onCompleteDelivery}>
            Complete Delivery
          </button>
        )}
      </div>
    </div>
  )
}

export default GPSScreen
