import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MyEvents from './pages/MyEvents.jsx';
import EventDetail from './pages/EventDetail.jsx';
import ClubProfile from './pages/ClubProfile.jsx';
import ErrorBoundary from './components/errorbound.jsx';

function NotFound() {
  return <h2>Page not found</h2>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/club/:id" element={<ClubProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}