import { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import Dashboard from './components/Dashboard'
import OrdersScreen from './components/OrdersScreen'
import GPSScreen from './components/GPSScreen'
import ProfileScreen from './components/ProfileScreen'
import BottomNav from './components/BottomNav'
import { AppState, Order } from './types'
import { mockOrders } from './utils/mockData'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<'login' | 'signup' | 'dashboard' | 'orders' | 'gps' | 'profile'>('login')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const [appState, setAppState] = useState<AppState>({
    isLoggedIn: !!localStorage.getItem('deliveryAgentToken'),
    isOnline: false,
    currentUser: JSON.parse(localStorage.getItem('currentDeliveryAgent') || '{}'),
    activeOrders: JSON.parse(localStorage.getItem('activeOrders') || '[]'),
    todayOrdersDelivered: parseInt(localStorage.getItem('todayOrdersDelivered') || '0'),
    todayOneTimeDeliveries: parseInt(localStorage.getItem('todayOneTimeDeliveries') || '0'),
    todaySubscriptionDeliveries: parseInt(localStorage.getItem('todaySubscriptionDeliveries') || '0'),
    availableOrders: JSON.parse(localStorage.getItem('availableOrders') || JSON.stringify(mockOrders)),
    rejectedOrders: JSON.parse(localStorage.getItem('rejectedOrders') || '[]'),
    earningsToday: parseInt(localStorage.getItem('earningsToday') || '0'),
    earningsTotal: parseInt(localStorage.getItem('earningsTotal') || '0')
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      if (appState.isLoggedIn) {
        setCurrentScreen('dashboard')
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [appState.isLoggedIn])

  const handleLogin = (email: string, password: string) => {
    if (!email || !password) {
      alert('Please fill all fields')
      return
    }

    const token = 'token_' + Date.now()
    const agent = {
      id: Math.random().toString(36),
      phone: email,
      name: 'Delivery Agent',
      email: email.includes('@') ? email : 'agent@abc.com',
      area: ''
    }

    localStorage.setItem('deliveryAgentToken', token)
    localStorage.setItem('currentDeliveryAgent', JSON.stringify(agent))

    setAppState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentUser: agent
    }))

    setCurrentScreen('dashboard')
  }

  const handleSignup = (name: string, phone: string, email: string, password: string) => {
    if (!name || !phone || !email || !password) {
      alert('Please fill all fields')
      return
    }

    if (phone.length < 10) {
      alert('Phone must be 10+ digits')
      return
    }

    const token = 'token_' + Date.now()
    const agent = { id: Math.random().toString(36), phone, name, email, area: '' }

    localStorage.setItem('deliveryAgentToken', token)
    localStorage.setItem('currentDeliveryAgent', JSON.stringify(agent))

    setAppState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentUser: agent
    }))

    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    localStorage.clear()
    setAppState({
      isLoggedIn: false,
      isOnline: false,
      currentUser: {},
      activeOrders: [],
      todayOrdersDelivered: 0,
      todayOneTimeDeliveries: 0,
      todaySubscriptionDeliveries: 0,
      availableOrders: mockOrders,
      rejectedOrders: [],
      earningsToday: 0,
      earningsTotal: 0
    })
    setCurrentScreen('login')
  }

  const toggleOnlineStatus = () => {
    setAppState(prev => ({ ...prev, isOnline: !prev.isOnline }))
  }

  const acceptOrder = (orderId: string) => {
    if (appState.activeOrders.length >= 5) {
      alert('You already have 5 active orders. Complete at least one to accept more.')
      return
    }

    const order = appState.availableOrders.find(o => o.id === orderId)
    if (!order) return

    const accepted = { ...order, status: 'accepted' as const, deliveryStatus: 'accepted', cashConfirmed: false, acceptedAt: new Date().toISOString() }

    setAppState(prev => {
      const newActive = [...prev.activeOrders, accepted]
      const newAvailable = prev.availableOrders.filter(o => o.id !== orderId)
      localStorage.setItem('activeOrders', JSON.stringify(newActive))
      localStorage.setItem('availableOrders', JSON.stringify(newAvailable))
      return { ...prev, activeOrders: newActive, availableOrders: newAvailable }
    })
  }

  const rejectOrder = (orderId: string) => {
    setAppState(prev => {
      const newRejected = [...prev.rejectedOrders, orderId]
      const newAvailable = prev.availableOrders.filter(o => o.id !== orderId)
      localStorage.setItem('rejectedOrders', JSON.stringify(newRejected))
      localStorage.setItem('availableOrders', JSON.stringify(newAvailable))
      return { ...prev, rejectedOrders: newRejected, availableOrders: newAvailable }
    })
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setAppState(prev => {
      const newActive = prev.activeOrders.map(o => o.id === orderId ? { ...o, deliveryStatus: newStatus } : o)
      localStorage.setItem('activeOrders', JSON.stringify(newActive))
      return { ...prev, activeOrders: newActive }
    })
  }

  const confirmCashCollected = (orderId: string) => {
    setAppState(prev => {
      const newActive = prev.activeOrders.map(o => o.id === orderId ? { ...o, cashConfirmed: true } : o)
      localStorage.setItem('activeOrders', JSON.stringify(newActive))
      return { ...prev, activeOrders: newActive }
    })
  }

  const [showDeliveryCompleteOverlay, setShowDeliveryCompleteOverlay] = useState(false)

  const completeDelivery = (orderId: string) => {
    const order = appState.activeOrders.find(o => o.id === orderId)
    if (!order) return

    // Agent should not see earnings; admin handles payments. We only track counts here.
    const newOrdersDelivered = appState.todayOrdersDelivered + 1
    const isOneTime = order.type === 'One-Time'
    const newOneTime = (appState.todayOneTimeDeliveries || 0) + (isOneTime ? 1 : 0)
    const newSubscription = (appState.todaySubscriptionDeliveries || 0) + (isOneTime ? 0 : 1)

    setAppState(prev => {
      const remaining = prev.activeOrders.filter(o => o.id !== orderId)
      localStorage.setItem('activeOrders', JSON.stringify(remaining))
      localStorage.setItem('todayOrdersDelivered', newOrdersDelivered.toString())
      localStorage.setItem('todayOneTimeDeliveries', newOneTime.toString())
      localStorage.setItem('todaySubscriptionDeliveries', newSubscription.toString())
      return {
        ...prev,
        activeOrders: remaining,
        todayOrdersDelivered: newOrdersDelivered,
        todayOneTimeDeliveries: newOneTime,
        todaySubscriptionDeliveries: newSubscription
      }
    })

    // show app logo confirmation overlay briefly before returning to dashboard
    setShowDeliveryCompleteOverlay(true)
    setTimeout(() => {
      setShowDeliveryCompleteOverlay(false)
      setCurrentScreen('dashboard')
    }, 1800)
  }

  const navigateToGPSForOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
    setCurrentScreen('gps')
  }

  if (showSplash) {
    return <SplashScreen />
  }

  if (!appState.isLoggedIn) {
    if (currentScreen === 'signup') {
      return <SignupScreen onSignup={handleSignup} onSwitchToLogin={() => setCurrentScreen('login')} />
    }
    return <LoginScreen onLogin={handleLogin} onSwitchToSignup={() => setCurrentScreen('signup')} />
  }

  return (
    <div className="mobile-shell">
      <div className="app-container">
        <div className="header">
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            {currentScreen === 'dashboard' ? (
              <img src="/deliveryAgentlogo.jpg" alt="Agent Logo" className="header-logo" />
            ) : null}
            <div className="header-title">ABC Delivery</div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div className="header-icon" onClick={() => setCurrentScreen('profile')}>👤</div>
          </div>
        </div>

        <div className="content">
        {currentScreen === 'dashboard' && (
          <Dashboard 
            appState={appState} 
            onToggleOnline={toggleOnlineStatus}
          />
        )}

        {currentScreen === 'orders' && (
          <OrdersScreen 
            appState={appState}
            onAcceptOrder={acceptOrder}
            onRejectOrder={rejectOrder}
            onNavigateToGPS={navigateToGPSForOrder}
          />
        )}

        {currentScreen === 'gps' && (
          <GPSScreen 
            activeOrder={appState.activeOrders.find(o => o.id === selectedOrderId) || null}
            onUpdateStatus={(status) => selectedOrderId && updateOrderStatus(selectedOrderId, status)}
            onConfirmCash={() => selectedOrderId && confirmCashCollected(selectedOrderId)}
            onCompleteDelivery={() => selectedOrderId && completeDelivery(selectedOrderId)}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen 
            user={appState.currentUser}
            earningsToday={appState.earningsToday}
            earningsTotal={appState.earningsTotal}
            onLogout={handleLogout}
          />
        )}
      </div>

      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      {showDeliveryCompleteOverlay && (
        <div className="delivery-complete-overlay">
          <img src="/Applogo.png" alt="Delivered" />
        </div>
      )}
    </div>
  </div>
  )
}

export default App
