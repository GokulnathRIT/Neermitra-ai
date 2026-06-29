import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Phone, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage, languagesList } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', village: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-light/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-leaf-light/30 rounded-full blur-3xl"></div>
      </div>

      {/* Language Selector at the Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
          className="bg-white/80 backdrop-blur-sm text-slate-700 rounded-full text-sm font-bold border border-slate-200 px-3 py-1.5 focus:outline-none hover:bg-white transition-colors shadow-sm"
        >
          {languagesList.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-brand to-leaf rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-brand/30">
              <Leaf size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">NeerMitra <span className="text-brand">AI</span></h1>
            <p className="text-slate-500 font-medium mt-1">{t('login_title')}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium mb-4 border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input required={!isLogin} type="text" placeholder={t('full_name')} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder={t('village_name')} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} />
                </div>
              </motion.div>
            )}

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input required type="tel" placeholder={t('phone')} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input required type="password" placeholder={t('password')} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-brand to-leaf text-white font-bold rounded-xl shadow-lg shadow-brand/30 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98]">
              {isLogin ? t('login_btn') : t('create_acc')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-brand font-semibold hover:text-brand-dark transition-colors text-sm">
              {isLogin ? t('no_acc') : t('has_acc')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
