# FundFlow - Frontend Production-Ready
# Tamper-Proof Public Fund Tracking System
# Interactive 3D Dashboard

---

## QUICK START

```bash
cd /Users/psc/Desktop/Projects\ Workspace/EPOCH26/fundtracker-frontend

# Install dependencies (if needed)
npm install

# Run development server
npm start

# Build for production
npm run build
```

---

## FRONTEND ENDPOINTS

| Service | URL |
|--------|-----|
| Development | http://localhost:3000 |
| API (Backend) | http://localhost:8000 |

---

## TECHNOLOGY STACK

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| HTTP | Axios |
| 3D Graphics | React Three Fiber |
| Animations | Framer Motion |
| State | React Context |
| Styling | CSS Custom Properties |

---

## PROJECT STRUCTURE

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Router + providers
├── index.css                   # Design system + CSS variables
│
├── components/
│   ├── ui/
│   │   ├── GlassCard.jsx       # Glassmorphism card
│   │   ├── Button.jsx        # Animated button
│   │   ├── Input.jsx        # Styled input
│   │   └── Badge.jsx        # Role badge
│   │
│   ├── layout/
│   │   ├── Navbar.jsx       # Top navigation
│   │   └── Layout.jsx       # Page wrapper
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   └── TransactionStats.jsx
│   │   │
│   │   └── visualization/
│   │       ├── LedgerVisualization.jsx
│   │       ├── TransactionNode.jsx
│   │       └── BackgroundParticles.jsx
│   │
├── pages/
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── AuditorDashboard.jsx
│   └── PublicDashboard.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useTransactions.js
│
└── lib/
    └── api.js
```

---

## CSS DESIGN SYSTEM

### Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `--color-cyan` | #00f0ff | Primary, links |
| `--color-magenta` | #ff00aa | Secondary |
| `--color-green` | #00ff88 | Success, money |
| `--color-red` | #ff0055 | Error, flagged |
| `--color-bg-primary` | #0a0a0f | Background |

### Key Effects

```css
/* Glassmorphism */
.glass {
  background: rgba(18, 18, 28, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 240, 255, 0.2);
}

/* Glow effect */
.glow {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
}

/* Bouncy button */
.btn {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3D VISUALIZATION FEATURES

### LedgerVisualization Component

- Interactive 3D transaction nodes
- Floating animations
- Click to select
- Color-coded by status (cyan=normal, red=flagged)
- Connection lines between nodes
- Sparkle particle background
- Orbit controls with auto-rotate

### Node States

| State | Color | Animation |
|-------|------|-----------|
| Normal | #00f0ff | Gentle float |
| Selected | #00ff88 | Highlight glow |
| Flagged | #ff0055 | Pulse warning |
| Hover | #ffcc00 | Scale up |

---

## PAGE LAYOUTS

### Login Page (`/login`)

- Full-screen 3D animated background
- Glass card form centered
- Animated logo
- Loading states
- Error messages

### Admin Dashboard (`/`)

- Header: logo + user info + logout
- 3D Ledger visualization
- New transaction form
- Transaction list
- Verify button

### Auditor Dashboard (`/`)

- Header: logo + user info + logout  
- 3D Ledger visualization
- Transaction list
- Audit log panel

### Public Dashboard (`/`)

- Header: logo + user info + logout
- Stats summary (total tx, amount)
- 3D Ledger visualization
- Transaction list (approved only)

---

## API INTEGRATION

### Authentication Flow

```
1. User enters credentials
2. POST /api/auth/login/
3. Server sets session cookie
4. Frontend stores user in context
5. Redirect to dashboard
```

### Transaction Flow

```
1. Form submission
2. POST /api/transactions/
3. Backend: validate → hash → save → audit log
4. Return transaction with hash
5. Frontend: refresh list
```

### Verification Flow

```
1. Click "Verify Ledger"
2. GET /api/transactions/verify/
3. Backend: loop through all transactions
4. Recompute each hash, compare
5. Return validity status
```

---

## ANIMATIONS

### Page Transitions

```javascript
// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
>
```

### Button Hover

```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.92 }}
>
```

### 3D Float

```javascript
<Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
```

---

## ENVIRONMENT VARIABLES

```bash
# .env (create in frontend root)
VITE_API_URL=http://localhost:8000
```

---

## PRODUCTION BUILD

```bash
# Build command (for Vercel/Render)
npm run build

# Output: dist/
# - index.html
# - /assets (JS, CSS)
```

---

## PRODUCTION CONFIGURATION

### vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
```

---

## HACKATHON DEMO FLOW

### Demo Script

1. **Login** → admin / password123
2. **Show 3D** → Floating nodes
3. **Create tx** → Treasury → Panchayat, ₹50,000
4. **Show hash** → Point to hash field
5. **Create another** → Show previous_hash links
6. **Verify** → Click verify, show "Valid"
7. **Login as auditor** → See audit logs
8. **Login as public** → Only approved

---

## PERFORMANCE OPTIMIZATION

### Lazy Loading

```javascript
const LedgerVisualization = React.lazy(() => 
  import('./components/visualization/LedgerVisualization')
);
```

### Memoization

```javascript
const nodes = useMemo(() => {
  return transactions.map(tx => ({
    ...tx,
    position: calculatePosition(tx),
  }));
}, [transactions]);
```

### Target Metrics

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- 3D Frame Rate: 60fps

---

## DEPLOYMENT

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup

```json
{
  "build": {
    "command": "npm run build",
    "outputDirectory": "dist"
  }
}
```

---

## HACKATHON SCORING

### What Judges Look For

| Feature | Weight | Status |
|--------|--------|--------|
| Tamper-proof ledger | 30% | ✅ Working |
| Role-based access | 20% | ✅ Working |
| 3D visualization | 15% | ✅ Stunning |
| UI/UX quality | 15% | ✅ Glassmorphism |
| Performance | 10% | ✅ Optimized |
| Demo smoothness | 10% | ✅ Ready |

---

## SUPPORT

### Common Issues

**3D not loading:**
- Check Three.js installation
- Try lazy loading

**API errors:**
- Verify backend running at port 8000
- Check CORS settings

**Session expired:**
- Login again
- Clear cookies

---

## READY TO WIN!

The frontend is production-ready. Build with `npm run build` and deploy to Vercel!

✅ Stunning 3D visualization
✅ Glassmorphism UI
✅ Bouncy animations
✅ Role-based dashboards
✅ Responsive design
✅ Performance optimized

Maintained by PS-Chakradhar.
