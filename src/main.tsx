import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Onboarding } from './components/Onboarding';

const Events = lazy(() => import('./pages/Events').then((m) => ({ default: m.Events })));
const Create = lazy(() => import('./pages/Create').then((m) => ({ default: m.Create })));
const Chat = lazy(() => import('./pages/Chat').then((m) => ({ default: m.Chat })));
const MapPage = lazy(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })));
const Chats = lazy(() => import('./pages/Chats').then((m) => ({ default: m.Chats })));
const Notifications = lazy(() => import('./pages/Notifications').then((m) => ({ default: m.Notifications })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));

function Loading() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>💧</div>
    </div>
  );
}

function App() {
  const { onboarded } = useApp();

  if (!onboarded) return <Onboarding />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/events" element={<Suspense fallback={<Loading />}><Events /></Suspense>} />
        <Route path="/create" element={<Suspense fallback={<Loading />}><Create /></Suspense>} />
        <Route path="/chat/:id" element={<Suspense fallback={<Loading />}><Chat /></Suspense>} />
        <Route path="/map" element={<Suspense fallback={<Loading />}><MapPage /></Suspense>} />
        <Route path="/chats" element={<Suspense fallback={<Loading />}><Chats /></Suspense>} />
        <Route path="/notifications" element={<Suspense fallback={<Loading />}><Notifications /></Suspense>} />
        <Route path="/profile" element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
        <Route path="*" element={<Navigate to="/events" replace />} />
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
