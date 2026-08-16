import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
];

export default function LanguageSelectorModal() {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('en');

  useEffect(() => {
    // Check if the user has already explicitly selected a language
    const hasSelected = localStorage.getItem('neermitra_lang_selected');
    if (!hasSelected) {
      setShow(true);
      // Pre-select current language from i18n if it exists
      setSelected(i18n.language || 'en');
    }
  }, [i18n.language]);

  const handleSelect = (code) => {
    setSelected(code);
  };

  const handleContinue = () => {
    i18n.changeLanguage(selected);
    localStorage.setItem('neermitra_lang', selected);
    localStorage.setItem('neermitra_lang_selected', 'true');
    
    // Google Translate cookie logic
    if (selected === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${selected}; path=/;`;
      document.cookie = `googtrans=/en/${selected}; path=/; domain=${window.location.hostname};`;
    }
    
    setShow(false);
    // Reload to apply Google Translate perfectly if needed, but simple re-render is usually enough for i18n
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#080d1a]/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900/90 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] p-8 rounded-3xl relative animate-slide-up">
        
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-400 mb-6 shadow-lg shadow-blue-500/20">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
            Welcome to NeerMitra
          </h1>
          <h2 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-blue-300 mb-4">
            नीरमित्र में आपका स्वागत है
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Please select your preferred language to continue.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 relative z-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border ${
                selected === lang.code
                  ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-105'
                  : 'bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-white/10'
              }`}
            >
              <span className={`text-xl font-bold mb-1 ${selected === lang.code ? 'text-blue-300' : 'text-white'}`}>
                {lang.native}
              </span>
              <span className={`text-xs ${selected === lang.code ? 'text-blue-200/80' : 'text-gray-500'}`}>
                {lang.label}
              </span>
              {selected === lang.code && (
                <CheckCircle2 size={16} className="text-green-400 absolute top-2 right-2 animate-bounce-short" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative z-10"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
