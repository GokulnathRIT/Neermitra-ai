import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage, languagesList } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass sticky top-0 z-30 w-full flex items-center justify-between px-4 py-3 md:px-6 shadow-sm border-b border-slate-200">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-leaf flex items-center justify-center text-white font-bold text-lg shadow-md">
            N
          </div>
          <span className="font-bold text-xl hidden sm:block tracking-tight">
            NeerMitra <span className="text-gradient">AI</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
          className="bg-brand-light/30 text-brand-dark rounded-full text-sm font-bold border border-brand/20 px-3 py-1.5 focus:outline-none hover:bg-brand-light/50 transition-colors"
        >
          {languagesList.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
        
        <button className="p-2 relative rounded-full text-slate-500 hover:bg-slate-100 transition-colors hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 group relative">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700 leading-none">{user?.name || "Farmer"}</p>
            <p className="text-xs text-brand-dark font-medium mt-1">{user?.points || 0} pts</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-300 transition-colors">
            <User size={20} />
          </div>
          
          <div className="absolute top-full right-0 mt-2 w-48 glass rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium text-sm rounded-xl flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
