import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getImpactStats, getLeaderboard, getBadges } from '../services/api';
import { Trophy, Droplets, Users, Shield } from 'lucide-react';

export default function Impact() {
  const { t } = useTranslation();
  const [stats,       setStats]       = useState({ farmersEmpowered: 12450, litersSaved: 4200000, reportsResolved: 874, waterChampions: 850 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [badges,      setBadges]      = useState([]);

  useEffect(() => {
    getImpactStats().then(setStats).catch(() => {});
    getLeaderboard().then(d => setLeaderboard(d.leaderboard || [])).catch(() => {});
    getBadges().then(d => setBadges(d.badges || [])).catch(() => {});
  }, []);

  return (
    <div className="py-10 max-w-5xl mx-auto space-y-12 px-4">
      <h1 className="text-4xl font-bold text-center font-['Space_Grotesk']">{t('impact_title')}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { Icon: Users,   color: 'text-blue-400',   value: stats.farmersEmpowered?.toLocaleString(), label: t('farmers_helped')  },
          { Icon: Droplets,color: 'text-cyan-300',   value: `${(stats.litersSaved/1000000).toFixed(1)}M`, label: t('litres_saved') },
          { Icon: Shield,  color: 'text-green-400',  value: stats.reportsResolved, label: t('issues_resolved') },
          { Icon: Trophy,  color: 'text-yellow-400', value: stats.waterChampions,  label: 'Champions' },
        ].map(({ Icon, color, value, label }, i) => (
          <div key={i} className="glass-card p-6">
            <Icon size={36} className={`mx-auto ${color} mb-2`} />
            <div className="text-3xl font-extrabold">{value}</div>
            <div className="text-sm text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {badges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('badges_title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map(b => (
              <div key={b.id} className="glass-card p-4 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{b.icon}</div>
                <div className="font-bold text-sm">{b.name}</div>
                <div className="text-xs text-gray-400 mt-1">{b.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">🏆 Village Leaderboard</h2>
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-900/50 text-green-400 text-sm">
              <tr>
                <th className="p-4">{t('rank')}</th>
                <th className="p-4">{t('village')}</th>
                <th className="p-4">{t('district')}</th>
                <th className="p-4">{t('water_score')}</th>
                <th className="p-4">{t('issues_fixed')}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? leaderboard.map(r => (
                <tr key={r.rank} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-yellow-400">
                    {r.rank === 1 ? '🥇 ' : r.rank === 2 ? '🥈 ' : r.rank === 3 ? '🥉 ' : `#${r.rank}`}
                  </td>
                  <td className="p-4 font-medium">{r.village}</td>
                  <td className="p-4 text-gray-400">{r.district}</td>
                  <td className="p-4 font-bold text-green-400">{r.waterScore}/100</td>
                  <td className="p-4">{r.issuesResolved}</td>
                </tr>
              )) : (
                <tr className="border-t border-white/10">
                  <td colSpan="5" className="p-8 text-center text-gray-400 italic">Leaderboard updating...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2"><Trophy size={28}/> Retail Rewards Hub</h2>
        <p className="text-gray-300 mb-6">Redeem your village's Water Conservation points for discounts at local Agri-shops!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col items-center text-center border border-green-500/30 hover:border-green-400 transition-colors">
            <div className="bg-green-900/50 p-4 rounded-full mb-4">
              <span className="text-4xl">🌱</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Free Seed Packets</h3>
            <p className="text-sm text-gray-400 mb-4">Get 5kg of drought-resistant seeds from Kisaan Kendra.</p>
            <button className="mt-auto px-6 py-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500 hover:text-white transition-colors">500 Points</button>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center border border-blue-500/30 hover:border-blue-400 transition-colors">
            <div className="bg-blue-900/50 p-4 rounded-full mb-4">
              <span className="text-4xl">💧</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Drip Kit Discount</h3>
            <p className="text-sm text-gray-400 mb-4">20% off on a new drip irrigation setup from AgroTech India.</p>
            <button className="mt-auto px-6 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">1200 Points</button>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center border border-yellow-500/30 hover:border-yellow-400 transition-colors">
            <div className="bg-yellow-900/50 p-4 rounded-full mb-4">
              <span className="text-4xl">🚜</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Tractor Rental</h3>
            <p className="text-sm text-gray-400 mb-4">1 day free tractor rental sponsored by the local Panchayat.</p>
            <button className="mt-auto px-6 py-2 bg-yellow-500/20 text-yellow-400 rounded-full hover:bg-yellow-500 hover:text-white transition-colors">3000 Points</button>
          </div>
        </div>
      </div>
    </div>
  );
}
