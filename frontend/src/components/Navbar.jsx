import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Menu, X, Zap, Globe, ArrowUpRight, Building2, UserCircle, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी',       flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు',      flag: '🌿' },
  { code: 'ta', label: 'தமிழ்',       flag: '🌺' },
  { code: 'mr', label: 'मराठी',       flag: '🏔️' },
  { code: 'kn', label: 'ಕನ್ನಡ',       flag: '🌾' },
  { code: 'gu', label: 'ગુજરાતી',     flag: '🦁' },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const { pathname }            = useLocation();
  
  const { t, i18n }             = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 15000);
    
    // Check user login state
    const u = localStorage.getItem('neermitra_user');
    if (u) setUser(JSON.parse(u));
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('neermitra_token');
    localStorage.removeItem('neermitra_user');
    setUser(null);
    window.location.reload();
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('neermitra_lang', code);
    
    // Set Google Translate cookie
    if (code === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/;`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname};`;
    }
    
    setLangOpen(false);
    window.location.reload();
  };

  const navLinks = [
    { to: '/',          label: t('home') || 'Home' },
    { to: '/journal',   label: 'Journal' },
    { to: '/lessons',   label: 'Lessons' },
    { to: '/pricing',   label: t('pricing') || 'Pricing' },
    { to: '/b2b',       label: t('corporate') || 'Corporate B2B' },
  ];

  return (
    <>
    {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={(u) => { setUser(u); setShowAuth(false); }} />}
    <nav className="sticky top-0 z-50 mx-4 mt-4">
      <div className="glass-strong px-6 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow-lg animate-pulse-glow">
            <Droplets size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold font-['Space_Grotesk'] shimmer-text hidden sm:block">
            NeerMitra AI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 flex-wrap">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${pathname === link.to
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/8'}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: Language + Upgrade */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* 🌍 Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 glass-card hover:bg-white/10 rounded-xl text-sm font-medium transition-all">
              <Globe size={16} className="text-green-400" />
              <span className="hidden sm:block">{currentLang.flag} {currentLang.label}</span>
              <span className="sm:hidden">{currentLang.flag}</span>
            </button>

            {/* Hint Tooltip */}
            {showTooltip && (
              <div className="absolute top-16 -left-20 md:left-0 w-64 p-4 bg-blue-600 text-white text-base font-extrabold rounded-2xl shadow-2xl animate-bounce z-50">
                <div className="absolute -top-3 right-16 md:left-12 w-6 h-6 bg-blue-600 rotate-45"></div>
                <span className="text-2xl mr-2">🌍</span> Switch languages easily here!
              </div>
            )}

            {/* Dropdown */}
            {langOpen && (
              <div className="absolute right-0 top-12 bg-[#0f172a] rounded-2xl overflow-hidden z-50 w-44 animate-slide-up border border-blue-500/30 shadow-2xl">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-white/10
                      ${i18n.language === lang.code ? 'bg-blue-500/20 text-blue-300' : 'text-gray-300'}`}>
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {i18n.language === lang.code && <span className="ml-auto text-green-400 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B2B / Corporate Button */}
          <Link to="/b2b"
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/20 hover:bg-slate-700 text-sm rounded-xl font-bold transition-colors text-blue-300">
            <Building2 size={15} /> {t('corporate') || 'Corporate'}
          </Link>

          {/* Upgrade Button */}
          <Link to="/pricing"
            className="hidden lg:flex items-center gap-2 px-4 py-2 btn-glow text-sm rounded-xl font-bold">
            <Zap size={15} /> {t('upgrade')}
          </Link>

          {/* User Profile / Login */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end mr-2 border-r border-white/10 pr-4">
                <span className="text-xs text-gray-400">Refer & Earn (Free Premium!)</span>
                <span className="text-sm font-bold text-blue-300">Code: {user.referralCode || 'N/A'}</span>
                <span className="text-xs text-green-400">{user.referredCount || 0}/3 Friends Invited</span>
              </div>
              <button onClick={handleLogout} className="hidden lg:flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 text-sm rounded-xl font-bold transition-colors">
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/20 hover:bg-slate-700 text-sm rounded-xl font-bold transition-colors text-white">
              <UserCircle size={15} /> Login
            </button>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-white/10">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="glass-strong mt-2 p-4 flex flex-col gap-2 lg:hidden animate-slide-up border border-white/15">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${pathname === link.to ? 'bg-blue-500/20 text-blue-300' : 'text-gray-300 hover:bg-white/10'}`}>
              {link.label}
            </Link>
          ))}
          {/* Mobile Language Switcher */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-gray-500 px-4 pb-2 uppercase tracking-widest">Language / भाषा</p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map(lang => (
                <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors
                    ${i18n.language === lang.code ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'hover:bg-white/10 text-gray-300'}`}>
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Login / Logout */}
          <div className="pt-2 border-t border-white/10 mt-2 space-y-3">
            {user ? (
              <>
                <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-xl flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-1">Refer & Earn (Free Premium!)</span>
                  <span className="text-lg font-bold text-blue-300">Code: {user.referralCode || 'N/A'}</span>
                  <span className="text-xs text-green-400 mt-1">{user.referredCount || 0}/3 Friends Invited</span>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-xl text-sm font-bold justify-center">
                  <LogOut size={18} /> Logout ({user.name})
                </button>
              </>
            ) : (
              <button onClick={() => { setOpen(false); setShowAuth(true); }} className="w-full flex items-center gap-2 px-4 py-3 bg-blue-500/20 text-blue-300 rounded-xl text-sm font-bold justify-center">
                <UserCircle size={18} /> Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
