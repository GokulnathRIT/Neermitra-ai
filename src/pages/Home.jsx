import { ArrowRight, Droplets, Wind, ThermometerSun, Leaf, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark via-brand to-leaf text-white p-6 md:p-10 shadow-xl"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-brand-light opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
            {t('hero_title1')}<br />
            {t('hero_title2')}<br />
            <span className="text-leaf-light">{t('hero_title3')}</span>
          </h1>
          <p className="text-brand-light mb-6 text-sm md:text-base max-w-md">
            {t('hero_sub')}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Link to="/advisor" className="bg-white text-brand-dark px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-sm md:text-base">
              {t('talk_ai')} <ArrowRight size={18} />
            </Link>
            <Link to="/report" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-white/30 transition-all text-sm md:text-base">
              {t('report_issue')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Water Health', value: 'Good', icon: <Activity className="text-leaf" size={24} />, bg: 'bg-leaf-light/30' },
          { label: 'Next Rain', value: '3 Days', icon: <Wind className="text-brand" size={24} />, bg: 'bg-brand-light/30' },
          { label: 'Soil Moisture', value: '45%', icon: <Droplets className="text-blue-500" size={24} />, bg: 'bg-blue-100/30' },
          { label: 'Temp', value: '32°C', icon: <ThermometerSun className="text-orange-500" size={24} />, bg: 'bg-orange-100/30' },
        ].map((stat, i) => (
          <div key={i} className={`glass p-4 rounded-2xl flex flex-col items-center justify-center text-center ${stat.bg} transition-transform hover:scale-105 cursor-pointer`}>
            <div className="mb-2 p-2 bg-white rounded-full shadow-sm">{stat.icon}</div>
            <p className="text-lg font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Main Features */}
      <section className="pt-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">Smart Tools for You</h2>
        <div className="grid md:grid-cols-2 gap-4">
          
          <Link to="/crop-planner" className="glass p-5 rounded-2xl border border-slate-200/60 hover:shadow-xl hover:border-brand/30 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-leaf-light/40 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-leaf-light to-leaf/20 text-leaf-dark rounded-xl">
                <Leaf size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-brand-dark transition-colors">Smart Crop Planner</h3>
                <p className="text-sm text-slate-600">Get AI recommendations on what to plant based on predicted water levels and your soil type.</p>
              </div>
            </div>
          </Link>

          <Link to="/climate" className="glass p-5 rounded-2xl border border-slate-200/60 hover:shadow-xl hover:border-brand/30 transition-all group overflow-hidden relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light/40 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-brand-light to-brand/20 text-brand-dark rounded-xl">
                <Wind size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-brand-dark transition-colors">Climate & Rainfall</h3>
                <p className="text-sm text-slate-600">View interactive drought risk maps and localized rainfall predictions for your specific region.</p>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
};

export default Home;
