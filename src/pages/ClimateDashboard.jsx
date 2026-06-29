import { CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ClimateDashboard = () => {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <CloudRain className="text-brand" /> {t('climate_rain')}
        </h1>
        <p className="text-slate-500 text-sm mt-1">{t('climate_desc')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.05 }} className="glass p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Thermometer className="text-orange-500 mb-2" size={28} />
          <div className="text-2xl font-bold text-slate-800">32°C</div>
          <div className="text-xs text-slate-500 font-medium">{t('temp')}</div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} className="glass p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Droplets className="text-blue-500 mb-2" size={28} />
          <div className="text-2xl font-bold text-slate-800">65%</div>
          <div className="text-xs text-slate-500 font-medium">{t('humidity')}</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="glass p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Wind className="text-slate-400 mb-2" size={28} />
          <div className="text-2xl font-bold text-slate-800">12 km/h</div>
          <div className="text-xs text-slate-500 font-medium">{t('wind')}</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="glass p-5 rounded-2xl border border-brand/30 bg-brand-light/20 shadow-sm flex flex-col items-center justify-center text-center">
          <CloudRain className="text-brand mb-2" size={28} />
          <div className="text-2xl font-bold text-brand-dark">80%</div>
          <div className="text-xs text-brand-dark font-medium">{t('rain_prob')}</div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default ClimateDashboard;
