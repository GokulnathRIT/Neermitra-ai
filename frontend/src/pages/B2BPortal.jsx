import { useTranslation } from 'react-i18next';
import { Building2, TrendingUp, BarChart3, Users, Lock, Download, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function B2BPortal() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mockSupply = [
    { region: 'Pune, Maharashtra', crop: 'Onions', quantity: '150 Tons', readyIn: '14 Days', farmers: 45 },
    { region: 'Jaipur, Rajasthan', crop: 'Wheat', quantity: '300 Tons', readyIn: '21 Days', farmers: 110 },
    { region: 'Guntur, Andhra', crop: 'Chilies', quantity: '50 Tons', readyIn: 'Ready Now', farmers: 22 },
    { region: 'Ludhiana, Punjab', crop: 'Rice', quantity: '500 Tons', readyIn: '30 Days', farmers: 200 },
  ];

  return (
    <div className="py-12 max-w-6xl mx-auto space-y-10 px-4">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-400 mb-2 shadow-lg shadow-green-500/20">
          <Building2 size={40} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
          {t('b2b_title') || 'Enterprise Agri-Data Portal'}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t('b2b_desc') || 'Access real-time crop yields, disease heatmaps, and direct farmer procurement data.'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-t-4 border-blue-500 flex items-center gap-4">
          <div className="p-4 bg-blue-500/20 rounded-xl text-blue-400"><Users size={28} /></div>
          <div>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Active Farmers</p>
            <p className="text-3xl font-bold">12,450+</p>
          </div>
        </div>
        <div className="glass-card p-6 border-t-4 border-green-500 flex items-center gap-4">
          <div className="p-4 bg-green-500/20 rounded-xl text-green-400"><TrendingUp size={28} /></div>
          <div>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Live Procurement</p>
            <p className="text-3xl font-bold">1,200 Tons</p>
          </div>
        </div>
        <div className="glass-card p-6 border-t-4 border-purple-500 flex items-center gap-4">
          <div className="p-4 bg-purple-500/20 rounded-xl text-purple-400"><BarChart3 size={28} /></div>
          <div>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Disease Alerts</p>
            <p className="text-3xl font-bold text-red-400">14 Outbreaks</p>
          </div>
        </div>
      </div>

      {/* Live Supply Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">🌾 Live Farmer Procurement Data</h2>
          <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live Update
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Region</th>
                <th className="p-4 font-semibold">Crop</th>
                <th className="p-4 font-semibold">Volume</th>
                <th className="p-4 font-semibold">Harvest Status</th>
                <th className="p-4 font-semibold">Verified Farmers</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockSupply.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-white font-medium">{row.region}</td>
                  <td className="p-4 text-blue-300 font-bold">{row.crop}</td>
                  <td className="p-4 font-mono text-gray-300">{row.quantity}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-lg border ${row.readyIn === 'Ready Now' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}`}>
                      {row.readyIn}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{row.farmers}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => navigate('/pricing')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-1 opacity-80 group-hover:opacity-100"
                    >
                      Buy Direct <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paywall Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-card p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-green-900/40 blur-xl"></div>
        <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-2 backdrop-blur-md border border-white/20 shadow-2xl">
          <Lock size={32} className="text-white" />
        </div>
        <h2 className="relative z-10 text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
          Unlock the Full Enterprise API
        </h2>
        <p className="relative z-10 text-gray-300 max-w-xl text-lg">
          Get direct contact details for all 12,000+ farmers, access the live Disease Heatmap, and download complete district CSV reports.
        </p>
        <p className="relative z-10 text-green-400 font-bold text-lg">
          For Enterprise Sales, Contact: +91 7904769396
        </p>
        <button 
          onClick={() => navigate('/pricing')}
          className="relative z-10 btn-glow px-8 py-4 rounded-xl font-bold text-white text-lg flex items-center gap-2 hover:scale-105 transition-transform"
        >
          {t('unlock_data') || 'Unlock Enterprise Data'} <Download size={20} />
        </button>
      </div>

    </div>
  );
}
