import { ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const GovtSchemes = () => {
  const { t } = useLanguage();
  const schemes = [
    {
      title: t('scheme_1'),
      desc: t('scheme_1_desc'),
      status: "Active",
      tags: ["Irrigation", "Subsidy"]
    },
    {
      title: t('scheme_2'),
      desc: t('scheme_2_desc'),
      status: "Active",
      tags: ["Community", "Groundwater"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{t('govt_schemes')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t('schemes_desc')}</p>
      </div>

      <div className="grid gap-6">
        {schemes.map((scheme, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ scale: 1.01 }}
            className="glass p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-slate-800">{scheme.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle size={12} /> {scheme.status}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4">{scheme.desc}</p>
              <div className="flex gap-2">
                {scheme.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-lg font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-medium shadow-md hover:bg-brand-dark transition-all shrink-0">
              {t('apply_now')} <ExternalLink size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GovtSchemes;
