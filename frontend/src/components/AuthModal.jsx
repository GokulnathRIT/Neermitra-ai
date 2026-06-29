import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, User, Lock, Mail, MapPin, Loader } from 'lucide-react';
import { registerUser, loginUser } from '../services/api';

export default function AuthModal({ onClose, onSuccess }) {
  const { t } = useTranslation();
  const [mode,    setMode]    = useState('login');
  const [form,    setForm]    = useState({ name: '', email: '', password: '', role: 'farmer', village: '', district: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.email || !form.password) return setError('Email and password are required.');
    if (mode === 'register' && !form.name) return setError('Name is required.');
    setLoading(true); setError('');
    try {
      const fn   = mode === 'login' ? loginUser : registerUser;
      const data = await fn(form);
      localStorage.setItem('neermitra_token', data.token);
      localStorage.setItem('neermitra_user', JSON.stringify(data.user));
      onSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-md p-8 space-y-6 relative animate-slide-up border border-white/15">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <X size={20} />
        </button>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">
            {mode === 'login' ? t('welcome_back') : t('create_account')}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === 'login' ? 'Sign in to access NeerMitra AI' : 'Join 12,450+ farmers on NeerMitra'}
          </p>
        </div>
        <div className="space-y-3">
          {mode === 'register' && (
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <input name="name" placeholder={t('full_name')} onChange={handle}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm" />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input name="email" type="email" placeholder={t('email')} onChange={handle}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input name="password" type="password" placeholder={t('password')} onChange={handle}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm" />
          </div>
          {mode === 'register' && (
            <>
              <select name="role" onChange={handle}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-blue-500 text-sm">
                <option value="farmer">🌾 Farmer</option>
                <option value="ngo">🤝 NGO Worker</option>
                <option value="government">🏛️ Government Official</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="village" placeholder={t('village_label')} onChange={handle}
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <input name="district" placeholder={t('district_label')} onChange={handle}
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm" />
              </div>
            </>
          )}
        </div>
        {error && <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>}
        <button onClick={submit} disabled={loading}
          className="w-full py-3 btn-glow rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60 text-white">
          {loading ? <><Loader size={18} className="animate-spin" /> Processing...</> : mode === 'login' ? t('sign_in') : t('create_account')}
        </button>
        <p className="text-center text-sm text-gray-400">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-blue-400 hover:text-blue-300 font-semibold">
            {mode === 'login' ? t('register') : t('sign_in')}
          </button>
        </p>
      </div>
    </div>
  );
}
