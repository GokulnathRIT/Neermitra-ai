import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCropRecommendation } from '../services/api';

export default function CropPlanner() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ landSizeAcres: '', soilType: 'loamy', waterAvailability: 'medium', season: 'kharif' });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.landSizeAcres) return setError('Please enter land size.');
    setError(''); setLoading(true);
    try {
      const data = await getCropRecommendation({ ...form, landSizeAcres: parseFloat(form.landSizeAcres) });
      setResult(data.recommendation);
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Please log in to use the Crop Planner.' : (err.message || 'Please log in to use the Crop Planner.'));
    } finally { setLoading(false); }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto space-y-8 px-4">
      <h1 className="text-4xl font-bold text-center font-['Space_Grotesk']">{t('planner_title')}</h1>
      <div className="glass-card p-6 space-y-5">
        <div>
          <label className="block mb-1 font-semibold text-sm text-gray-300">{t('land_size')}</label>
          <input name="landSizeAcres" type="number" value={form.landSizeAcres} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400" placeholder="e.g. 5" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm text-gray-300">{t('soil_type')}</label>
          <select name="soilType" value={form.soilType} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-green-400">
            <option value="loamy">Loamy</option><option value="clay">Clay</option>
            <option value="sandy">Sandy</option><option value="black">Black Soil</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm text-gray-300">{t('water_avail')}</label>
          <select name="waterAvailability" value={form.waterAvailability} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-green-400">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm text-gray-300">{t('season')}</label>
          <select name="season" value={form.season} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-green-400">
            <option value="kharif">Kharif (June–Nov)</option>
            <option value="rabi">Rabi (Nov–April)</option>
          </select>
        </div>
        {error && <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>}
        <button onClick={handleSubmit} disabled={loading}
          className="w-full p-4 btn-glow font-bold rounded-xl disabled:opacity-50 text-white">
          {loading ? 'Analyzing...' : t('get_recommendation')}
        </button>
      </div>

      {result && (
        <div className="glass-card p-6 border-l-4 border-green-400 space-y-3 animate-slide-up">
          <h2 className="text-2xl font-bold">✅ {t('recommended')}: {result.primaryCrop}</h2>
          <p><strong>{t('alternatives')}:</strong> {result.alternativeCrops?.join(', ')}</p>
          <p><strong>{t('water_needed')}:</strong> {result.waterRequired}</p>
          <p><strong>{t('profit_per_acre')}:</strong> {result.estimatedProfitPerAcre}</p>
          <p className="text-2xl font-bold text-green-400"><strong>{t('total_profit')}:</strong> {result.estimatedTotalProfit}</p>
          <p className="text-gray-300 text-sm mt-2 italic">{result.reasoning}</p>
        </div>
      )}
    </div>
  );
}
