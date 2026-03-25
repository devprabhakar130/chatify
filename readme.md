# Chatify — Real-Time Chat Application

Chatify is a full-stack real-time one-to-one chat application built using the MERN stack and Socket.IO.

## Features

- Authentication (JWT in HTTP-only cookies)
- Real-time messaging (Socket.IO)
- Online user tracking
- Optimistic UI
- Media (text + image)
- Responsive UI

## Tech Stack

**Frontend**
- React (Vite)
- Zustand
- Tailwind CSS
- Socket.IO Client
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- Arcjet (rate limiting & security)

## Local Setup

### 1) Clone
```bash
git clone https://github.com/your-username/chatify.git
cd chatify
```

### 2) Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run:
```bash
npm run dev
```

### 3) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Deployment (Render backend + Vercel frontend)

### Socket.IO support
- Render: host the Socket.IO **server** as a Node web service (supports WebSockets).
- Vercel: host the React app; it connects to Render over HTTPS/WSS (Vercel does not need to host Socket.IO).

### Backend on Render

Option A: Blueprint (recommended)
- Use `render.yaml` at repo root.

Option B: Manual
1. Create a Render **Web Service** from this repo with **Root Directory** = `backend`.
2. Build/Start:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Add environment variables (minimum):
   - `NODE_ENV=production`
   - `MONGO_URI=...`
   - `JWT_SECRET=...`
   - `CLIENT_URLS=https://your-frontend.vercel.app` (comma-separated supported)
   - `COOKIE_SAMESITE=none`
   - `COOKIE_SECURE=true`
   - `TRUST_PROXY=1`
4. Deploy and copy your Render URL (example: `https://your-service.onrender.com`).

Health check endpoint: `GET /api/health`

### Frontend on Vercel
1. Import this repo into Vercel with **Root Directory** = `frontend`.
2. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables:
   - `VITE_API_URL=https://your-service.onrender.com/api`
   - `VITE_SOCKET_URL=https://your-service.onrender.com`
4. Deploy.

### Notes
- If you use a custom domain on Vercel, add it to `CLIENT_URLS` too (comma-separated).
- Cross-site cookies (Vercel -> Render) require `SameSite=None` + `Secure` (set above).

## Author

Shourya Singh  
GitHub: https://github.com/shouryabyte

