import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, User, Lock, Mail, MapPin, Loader } from 'lucide-react';
import { registerUser, loginUser } from '../services/api';

export default function AuthModal({ onClose, onSuccess }) {
  const { t } = useTranslation();
  const [mode,    setMode]    = useState('login');
  const [form,    setForm]    = useState({ name: '', email: '', password: '', referralCode: '', role: 'farmer', village: '', district: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (mode === 'forgot_password') {
      if (!form.email) return setError('Email is required.');
      setLoading(true); setError('');
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send reset link');
        setError('');
        alert('Reset link sent to your email (simulated).');
        setMode('login');
      } catch (err) {
        setError(err.message);
      } finally { setLoading(false); }
      return;
    }

    if (!form.email || !form.password) return setError('Email and password are required.');
    if (mode === 'register' && !form.name) return setError('Name is required.');
    setLoading(true); setError('');
    try {
      const fn   = mode === 'login' ? loginUser : registerUser;
      // Strip referralCode if login so it doesn't cause issues
      const payload = mode === 'login' ? { email: form.email, password: form.password } : form;
      const data = await fn(payload);
      localStorage.setItem('neermitra_token', data.token);
      localStorage.setItem('neermitra_user', JSON.stringify(data.user));
      onSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-md p-8 space-y-6 relative animate-slide-up border border-white/15 overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <X size={20} />
        </button>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">
            {mode === 'login' ? t('welcome_back') : mode === 'register' ? t('create_account') : 'Reset Password'}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === 'login' ? 'Sign in to access NeerMitra AI' : mode === 'register' ? 'Join 12,450+ farmers on NeerMitra' : 'Enter your email to receive a reset link'}
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
          {mode !== 'forgot_password' && (
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <input name="password" type="password" placeholder={t('password')} onChange={handle}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm" />
            </div>
          )}
          {mode === 'register' && (
            <>
              <div className="relative">
                <div className="absolute left-3 top-3.5 text-gray-400 font-bold text-xs">REF</div>
                <input name="referralCode" placeholder="Referral Code (Optional)" onChange={handle}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-blue-900/20 border border-blue-500/30 text-blue-300 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 text-sm uppercase" />
              </div>
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
        
        {mode === 'login' && (
          <div className="flex justify-end -mt-2">
            <button onClick={() => { setMode('forgot_password'); setError(''); }} className="text-xs text-blue-400 hover:text-blue-300">
              Forgot Password?
            </button>
          </div>
        )}

        <button onClick={submit} disabled={loading}
          className="w-full py-3 btn-glow rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60 text-white">
          {loading ? <><Loader size={18} className="animate-spin" /> Processing...</> : mode === 'login' ? t('sign_in') : mode === 'register' ? t('create_account') : 'Send Reset Link'}
        </button>
        <p className="text-center text-sm text-gray-400">
          {mode === 'login' ? "Don't have an account?" : mode === 'register' ? 'Already have an account?' : 'Remembered your password?'} {' '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-blue-400 hover:text-blue-300 font-semibold">
            {mode === 'login' ? t('register') : t('sign_in')}
          </button>
        </p>
      </div>
    </div>
  );
}
