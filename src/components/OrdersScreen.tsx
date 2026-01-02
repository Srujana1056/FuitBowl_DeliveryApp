import { AppState } from '../types'
import './OrdersScreen.css'

interface OrdersScreenProps {
  appState: AppState;
  onAcceptOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onNavigateToGPS: (orderId: string) => void;
}

const OrdersScreen = ({ appState, onAcceptOrder, onRejectOrder, onNavigateToGPS }: OrdersScreenProps) => {
  // Filter to only orders in agent's area (if set) and exclude rejected orders
  const availableOrders = appState.availableOrders.filter(
    order => !appState.rejectedOrders.includes(order.id) && order.status === 'pending' &&
      (!appState.currentUser?.area || appState.currentUser.area === '' || appState.currentUser.area === order.area)
  )

  return (
    <div className="orders-screen">
      <h2 className="screen-title">Available Orders</h2>

      {appState.activeOrders && appState.activeOrders.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="section-title">Active Orders ({appState.activeOrders.length})</h3>
          {appState.activeOrders
            .slice()
            .sort((a, b) => (a.distance || 0) - (b.distance || 0))
            .map(o => (
              <div key={o.id} className="active-order-display">
                <div className="active-order-header">
                  <div className="active-order-customer">📍 {o.customerName}</div>
                  <div className="active-order-phone">📱 {o.customerPhone}</div>
                </div>
                <div className="active-order-address">{o.address}</div>
                <div className="active-order-meta">{o.type} • {o.type === 'One-Time' ? 'COD' : 'Prepaid'}</div>
                <button className="btn-navigate" onClick={() => onNavigateToGPS(o.id)}>
                  🗺️ Start Navigation
                </button>
              </div>
            ))}
        </div>
      )}

      {availableOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🚚</div>
          <div className="empty-state-title">No Available Orders</div>
          <div className="empty-state-text">Check back soon</div>
        </div>
      ) : (
        availableOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <div className="order-type-badge">{order.type}</div>
            </div>

            <div className="order-details">
              <div className="order-detail-item">
                <div className="order-detail-label">Area</div>
                <div className="order-detail-value">{order.area}</div>
              </div>
              <div className="order-detail-item">
                <div className="order-detail-label">Payment</div>
                <div className="order-detail-value">{order.type === 'One-Time' ? 'COD' : 'Prepaid'}</div>
              </div>
            </div>

            <div className="order-details">
              <div className="order-detail-item">
                <div className="order-detail-label">Distance</div>
                <div className="order-distance">{order.distance} km</div>
              </div>
              <div className="order-detail-item">
                <div className="order-detail-label">Customer</div>
                <div className="order-detail-value">{order.customerName}</div>
              </div>
            </div>

            <div className="order-actions">
              <button
                className="btn-accept"
                onClick={() => onAcceptOrder(order.id)}
                disabled={appState.activeOrders && appState.activeOrders.length >= 5}
              >
                Accept
              </button>
              <button
                className="btn-reject"
                onClick={() => onRejectOrder(order.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersScreen
