import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, CloudRain, Droplets, Map, Award, X, Sprout, Landmark, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { t } = useLanguage();
  
  const navItems = [
    { name: t('dashboard'), path: '/', icon: <Home size={20} /> },
    { name: t('advisor'), path: '/advisor', icon: <MessageSquare size={20} /> },
    { name: t('climate'), path: '/climate', icon: <CloudRain size={20} /> },
    { name: t('report_issue'), path: '/report', icon: <Droplets size={20} /> },
    { name: t('planner'), path: '/crop-planner', icon: <Sprout size={20} /> },
    { name: t('map'), path: '/map', icon: <Map size={20} /> },
    { name: t('market'), path: '/market', icon: <DollarSign size={20} /> },
    { name: t('schemes'), path: '/schemes', icon: <Landmark size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Award size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 glass transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-slate-200 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 md:hidden">
          <span className="font-bold text-xl tracking-tight">
            NeerMitra <span className="text-gradient">AI</span>
          </span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-light/50 text-brand-dark font-medium shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <div className="text-current opacity-80">{item.icon}</div>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="p-4 m-3 mt-auto bg-gradient-to-br from-brand-light to-leaf-light rounded-2xl border border-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">Water Points</span>
            <span className="text-xs font-bold text-brand-dark px-2 py-0.5 bg-white rounded-full shadow-sm">1,250</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-1.5 mb-1">
            <div className="bg-gradient-to-r from-brand to-leaf h-1.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-[10px] text-slate-600 font-medium">250 pts to next level</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
