import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Leaderboard = () => {
  const { t } = useLanguage();
  const leaders = [
    { rank: 1, name: "Ramesh Kumar", points: 2450, badge: "Village Champion" },
    { rank: 2, name: "Suresh Patil", points: 2100, badge: "Water Saver" },
    { rank: 3, name: "Raju Farmer", points: 1250, badge: "Rising Star" },
    { rank: 4, name: "Amit Singh", points: 900, badge: "Contributor" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-yellow-600 rounded-full mb-4 shadow-sm">
          <Trophy size={32} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('leaderboard')}</h1>
        <p className="text-slate-500 mt-2">{t('leader_desc')}</p>
      </div>

      <div className="glass rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 grid grid-cols-12 gap-4 font-semibold text-slate-500 text-sm">
          <div className="col-span-2 text-center">{t('rank')}</div>
          <div className="col-span-7">{t('farmer')}</div>
          <div className="col-span-3 text-right">{t('points')}</div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {leaders.map((leader) => (
            <motion.div 
              key={leader.rank} 
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
              className={`px-6 py-4 grid grid-cols-12 gap-4 items-center ${leader.rank === 3 ? 'bg-brand-light/20' : ''}`}
            >
              <div className="col-span-2 flex justify-center">
                {leader.rank === 1 ? <Medal className="text-yellow-500" size={24} /> : 
                 leader.rank === 2 ? <Medal className="text-slate-400" size={24} /> : 
                 leader.rank === 3 ? <Medal className="text-amber-600" size={24} /> : 
                 <span className="font-bold text-slate-400">{leader.rank}</span>}
              </div>
              <div className="col-span-7">
                <p className="font-bold text-slate-800">{leader.name}</p>
                <p className="text-xs text-brand-dark font-medium">{leader.badge}</p>
              </div>
              <div className="col-span-3 text-right font-extrabold text-slate-700">
                {leader.points}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
