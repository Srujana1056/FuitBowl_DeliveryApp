# ABC Delivery Agent App

A complete delivery agent mobile application built with React, TypeScript, and Vite.

## Features

### Phase 1: Core Structure
- Splash Screen (5 sec with floating fruits animation)
- Login & Signup screens with validation
- Dashboard with Online/Offline toggle
- Bottom navigation (Home | Orders | GPS | Profile)

### Phase 2: Available Orders Module
- Available orders list (5 mock orders)
- Order cards with full details
- Accept/Reject buttons
- Single active order rule
- Rejected orders tracking

### Phase 3: Delivery Workflow
- Order status flow (Accepted → Picked → Out for Delivery → Delivered)
- GPS Navigation screen
- Distance & ETA calculation
- Real-time status updates

### Phase 4: COD & Completion
- Cash collection display
- "Confirm Cash Collected" button
- "Complete Delivery" button
- Earnings update on completion

### Phase 5: Profile & Settings
- Today's Earnings display
- Total Earnings (cumulative)
- Profile info & delivery area
- Help & Support
- Logout functionality

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
abc-delivery-agent-app/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── Dashboard.tsx
│   │   ├── OrdersScreen.tsx
│   │   ├── GPSScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── BottomNav.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Technologies

- React 18
- TypeScript
- Vite
- CSS3 with animations

## Theme

- Primary Color: #76C670 (Green)
- Secondary Color: #FCF8F3 (Peach)
- Dark Text: #1F2121

## Author

ABC Delivery Team

## License

MIT
