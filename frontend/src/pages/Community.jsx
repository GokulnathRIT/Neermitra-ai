import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getReports, submitReport } from '../services/api';
import { MapPin, Camera, ThumbsUp } from 'lucide-react';

export default function Community() {
  const { t } = useTranslation();
  const [reports,   setReports]   = useState([]);
  const [form,      setForm]      = useState({ category: 'shortage', description: '', location: { village: '', district: '' } });
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');

  useEffect(() => {
    getReports().then(d => setReports(d.reports || [])).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!form.description) return setError('Please add a description.');
    setError('');
    try {
      await submitReport(form);
      setSubmitted(true);
      getReports().then(d => setReports(d.reports || []));
    } catch {
      setError('Login required to submit a report. Please register first.');
    }
  };

  const statusColor = (s) =>
    s === 'resolved'     ? 'bg-green-500/20 text-green-300 border-green-500/30' :
    s === 'acknowledged' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                           'bg-red-500/20 text-red-300 border-red-500/30';

  return (
    <div className="py-10 max-w-5xl mx-auto space-y-8 px-4">
      <h1 className="text-4xl font-bold text-center font-['Space_Grotesk']">{t('community_title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Submit Report */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-2xl font-bold">{t('report_issue')}</h2>
          {submitted ? (
            <div className="p-4 bg-green-400/15 border border-green-400/30 rounded-xl text-green-300 text-sm">
              ✅ Report submitted successfully! Thank you for helping your community.
            </div>
          ) : (
            <>
              <select value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-blue-400 text-sm">
                <option value="shortage">💧 Water Shortage</option>
                <option value="contamination">☣️ Contamination</option>
                <option value="infrastructure">🔧 Broken Infrastructure</option>
                <option value="flooding">🌊 Flooding</option>
                <option value="other">📋 Other</option>
              </select>
              <textarea rows={3} placeholder={t('issue_desc')}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder={t('village_label')}
                  className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
                  onChange={e => setForm({ ...form, location: { ...form.location, village: e.target.value } })} />
                <input placeholder={t('district_label')}
                  className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
                  onChange={e => setForm({ ...form, location: { ...form.location, district: e.target.value } })} />
              </div>
              <button className="w-full p-3 rounded-xl border-2 border-dashed border-white/20 hover:bg-white/8 flex items-center justify-center gap-2 text-sm text-gray-400 transition-colors">
                <Camera size={18} /> Upload Photo (coming soon)
              </button>
              {error && <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>}
              <button onClick={handleSubmit}
                className="w-full p-3 btn-glow font-bold rounded-xl text-white flex items-center justify-center gap-2">
                <MapPin size={18} /> {t('submit_report')}
              </button>
            </>
          )}
        </div>

        {/* Reports List */}
        <div className="glass-card p-6 space-y-4 overflow-y-auto" style={{ maxHeight: '520px' }}>
          <h2 className="text-2xl font-bold">{t('recent_reports')}</h2>
          {reports.length === 0
            ? <p className="text-gray-400 text-sm">No reports yet. Be the first to report!</p>
            : reports.map((r, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-4 space-y-2 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${statusColor(r.status)}`}>
                    {r.status}
                  </span>
                  <span className="text-xs text-gray-500">{r.location?.village}, {r.location?.district}</span>
                </div>
                <p className="font-semibold text-sm capitalize">{r.category?.replace('_', ' ')}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{r.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <ThumbsUp size={12} /> {r.upvotes} upvotes
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
