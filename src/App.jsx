import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import AiAdvisor from './pages/AiAdvisor';
import ClimateDashboard from './pages/ClimateDashboard';
import CropPlanner from './pages/CropPlanner';
import WaterReport from './pages/WaterReport';
import VillageMap from './pages/VillageMap';
import Leaderboard from './pages/Leaderboard';
import MarketPrices from './pages/MarketPrices';
import GovtSchemes from './pages/GovtSchemes';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="advisor" element={<AiAdvisor />} />
          <Route path="climate" element={<ClimateDashboard />} />
          <Route path="crop-planner" element={<CropPlanner />} />
          <Route path="report" element={<WaterReport />} />
          <Route path="map" element={<VillageMap />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="market" element={<MarketPrices />} />
          <Route path="schemes" element={<GovtSchemes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
