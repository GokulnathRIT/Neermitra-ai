import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Menu, X, Zap, Globe } from 'lucide-react';

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
  const { pathname }            = useLocation();
  const { t, i18n }             = useTranslation();

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
    { to: '/advisor',   label: t('advisor') || 'AI Advisor' },
    { to: '/dashboard', label: t('dashboard') || 'Dashboard' },
    { to: '/planner',   label: t('planner') || 'Crop Planner' },
    { to: '/doctor',    label: 'Crop Doctor' },
    { to: '/community', label: t('community') || 'Community' },
    { to: '/schemes',   label: t('schemes') || 'Schemes' },
    { to: '/impact',    label: t('impact') || 'Impact' },
    { to: '/journal',   label: 'Journal' },
    { to: '/lessons',   label: 'Lessons' },
    { to: '/pricing',   label: t('pricing') || 'Pricing' },
  ];

  return (
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

            {/* Dropdown */}
            {langOpen && (
              <div className="absolute right-0 top-12 glass-strong rounded-2xl overflow-hidden z-50 w-44 animate-slide-up border border-white/15 shadow-2xl">
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

          {/* Upgrade Button */}
          <Link to="/pricing"
            className="hidden lg:flex items-center gap-2 px-4 py-2 btn-glow text-sm rounded-xl font-bold">
            <Zap size={15} /> {t('upgrade')}
          </Link>

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
        </div>
      )}
    </nav>
  );
}
