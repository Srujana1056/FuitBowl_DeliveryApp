import { useEffect } from 'react'
import './SplashScreen.css'

const SplashScreen = () => {
  useEffect(() => {
    createFloatingFruits()
  }, [])

  const createFloatingFruits = () => {
    const fruits = ['🍎', '🍊', '🍌', '🥕', '🥦']
    const container = document.getElementById('floatingFruitsContainer')

    if (!container) return

    for (let i = 0; i < 15; i++) {
      const fruit = fruits[Math.floor(Math.random() * fruits.length)]
      const el = document.createElement('div')
      el.className = 'floating-fruit'
      el.textContent = fruit
      el.style.left = Math.random() * 100 + '%'
      el.style.top = 40 + Math.random() * 60 + '%'
      el.style.animationDelay = Math.random() * 6 + 's'
      el.style.fontSize = 20 + Math.floor(Math.random() * 36) + 'px'
      el.style.animationDuration = 6 + Math.random() * 6 + 's'
      el.style.transform = `rotate(${Math.floor(Math.random() * 50) - 25}deg)`
      container.appendChild(el)
    }
  }

  return (
    <div className="splash-screen">
      <div id="floatingFruitsContainer" aria-hidden="true"></div>

      <div className="splash-center">
        <img
          src="/Applogo.png"
          alt="ABC App Logo"
          className="splash-logo"
        />
        <div className="splash-text">ABC Delivery</div>
      </div>
    </div>
  )
}

export default SplashScreen
