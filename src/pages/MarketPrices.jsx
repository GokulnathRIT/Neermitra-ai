import { TrendingUp, TrendingDown, RefreshCcw, DollarSign, Clock, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

const MarketPrices = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const crops = [
    { name: t('wheat'), price: '₹2,800 / q', trend: 'up', change: '+₹150' },
    { name: t('soyabean'), price: '₹4,200 / q', trend: 'down', change: '-₹50' },
    { name: t('cotton'), price: '₹7,100 / q', trend: 'up', change: '+₹300' },
    { name: t('millet'), price: '₹2,350 / q', trend: 'up', change: '+₹20' },
    { name: t('onion'), price: '₹1,500 / q', trend: 'down', change: '-₹400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <DollarSign className="text-brand" /> {t('live_mandi')}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{t('market_desc')}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full"><Clock size={14}/> {time}</span>
          <button className="flex items-center gap-2 text-sm text-brand-dark bg-brand-light/30 px-4 py-2 rounded-lg font-medium hover:bg-brand-light/50 transition-colors">
            <RefreshCcw size={16} /> {t('update_now')}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="glass p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand/30 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-slate-800 text-lg">{crop.name}</h3>
              <div className={`p-1.5 rounded-lg ${crop.trend === 'up' ? 'bg-leaf-light/50 text-leaf-dark' : 'bg-red-100 text-red-600'}`}>
                {crop.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
            </div>
            
            <div className="text-2xl font-extrabold text-slate-700">{crop.price}</div>
            
            <div className={`text-sm font-semibold mt-2 ${crop.trend === 'up' ? 'text-leaf-dark' : 'text-red-500'}`}>
              {crop.change} {t('since_yest')}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="glass bg-gradient-to-r from-brand-dark to-brand p-6 rounded-3xl text-white shadow-xl">
          <h2 className="text-xl font-bold mb-2">{t('ai_market_pred')}</h2>
          <p className="text-brand-light text-sm">
            {t('market_pred_desc')}
          </p>
        </div>
        
        <div className="glass bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Newspaper size={20} className="text-blue-500" /> {t('market_news')}</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm border-b border-slate-100 pb-2">
              <span className="font-bold text-red-500 whitespace-nowrap">10 Mins ago</span>
              <span className="text-slate-600">{t('news_1')}</span>
            </li>
            <li className="flex gap-3 text-sm border-b border-slate-100 pb-2">
              <span className="font-bold text-brand whitespace-nowrap">1 Hour ago</span>
              <span className="text-slate-600">{t('news_2')}</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketPrices;
