import React from 'react'
import './ResponsiveShell.css'

interface Props {
  headerTitle?: string
}

const ResponsiveShell: React.FC<Props> = ({ headerTitle = 'ABC Delivery' }) => {
  return (
    <div className="rs-root">
      <div className="rs-center">
        <div className="rs-container">
          <header className="rs-header">
            <div className="rs-title">{headerTitle}</div>
            <button className="rs-profile" aria-label="Profile">👤</button>
          </header>

          <main className="rs-main" role="main">
            <div className="rs-content">
              <h2>Good evening, User</h2>
              <p>Scrollable example content — add more cards to test scrolling behavior.</p>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="rs-card">Example card {i + 1}</div>
              ))}
            </div>
          </main>

          <footer className="rs-footer" aria-hidden={false}>
            <button className="rs-tab active">
              <div className="rs-tab-icon">🏠</div>
              <div className="rs-tab-label">Home</div>
            </button>
            <button className="rs-tab">
              <div className="rs-tab-icon">📋</div>
              <div className="rs-tab-label">Orders</div>
            </button>
            <button className="rs-tab">
              <div className="rs-tab-icon">🗺️</div>
              <div className="rs-tab-label">GPS</div>
            </button>
            <button className="rs-tab">
              <div className="rs-tab-icon">👤</div>
              <div className="rs-tab-label">Profile</div>
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveShell
