import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AIAdvisor from './pages/AIAdvisor';
import Dashboard from './pages/Dashboard';
import CropPlanner from './pages/CropPlanner';
import Community from './pages/Community';
import Schemes from './pages/Schemes';
import Impact from './pages/Impact';
import Pricing from './pages/Pricing';
import DiseaseDetector from './pages/DiseaseDetector';
import Journal from './pages/Journal';
import Lessons from './pages/Lessons';
import B2BPortal from './pages/B2BPortal';
import HouseFarming from './pages/HouseFarming';

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/"          element={<Home />}       />
            <Route path="/advisor"   element={<AIAdvisor />}  />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/planner" element={<CropPlanner />} />
            <Route path="/doctor" element={<DiseaseDetector />} />
            <Route path="/community" element={<Community />} />
            <Route path="/schemes"   element={<Schemes />}    />
            <Route path="/impact"    element={<Impact />}     />
            <Route path="/pricing"   element={<Pricing />}    />
            <Route path="/journal"   element={<Journal />}    />
            <Route path="/lessons"   element={<Lessons />}    />
            <Route path="/b2b"       element={<B2BPortal />}  />
            <Route path="/house-farming" element={<HouseFarming />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500 mt-8">
          <p>© 2026 NeerMitra AI · Built for India's 120 million farmers</p>
          <p className="mt-1">Predict Water. Protect Communities. Empower Farmers.</p>
        </footer>
      </div>
    </Router>
  );
}
