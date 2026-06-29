import { Home, MessageSquare, PlusCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200 z-30 pb-safe">
      <div className="flex justify-around items-center h-16 px-4 relative">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 ${isActive ? 'text-brand' : 'text-slate-500'}`}>
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        
        <NavLink to="/report" className="relative -top-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand to-leaf shadow-lg flex items-center justify-center text-white border-4 border-slate-50">
            <PlusCircle size={28} />
          </div>
        </NavLink>
        
        <NavLink to="/advisor" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 ${isActive ? 'text-brand' : 'text-slate-500'}`}>
          <MessageSquare size={22} />
          <span className="text-[10px] font-medium">AI Advisor</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
