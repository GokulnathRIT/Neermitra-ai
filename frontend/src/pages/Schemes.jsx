import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getSchemes } from '../services/api';
import { Search, ExternalLink } from 'lucide-react';

export default function Schemes() {
  const { t } = useTranslation();
  const [schemes, setSchemes]   = useState([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const mockSchemes = [
    {
      id: 1,
      title: 'PM-KISAN Samman Nidhi',
      description: 'Provides ₹6,000 per year in 3 equal installments to all landholding farmers.',
      tags: ['Financial', 'Direct Transfer'],
      eligibility: ['Small farmers', 'Marginal farmers'],
      link: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme offering low premium rates for farmers against natural calamities.',
      tags: ['Insurance', 'Crops'],
      eligibility: ['All farmers growing notified crops'],
      link: 'https://pmfby.gov.in/'
    },
    {
      id: 3,
      title: 'Kisan Credit Card (KCC)',
      description: 'Provides adequate and timely credit support from the banking system for agricultural needs.',
      tags: ['Loan', 'Credit'],
      eligibility: ['Individual farmers', 'Tenant farmers'],
      link: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card'
    },
    {
      id: 4,
      title: 'Paramparagat Krishi Vikas Yojana',
      description: 'Promotes organic farming through a cluster approach with financial assistance.',
      tags: ['Organic', 'Subsidy'],
      eligibility: ['Clusters of 50 acres', 'Organic farmers'],
      link: 'https://pgsindia-ncof.gov.in/'
    }
  ];

  const fetchSchemes = async (q = '') => {
    setLoading(true);
    try {
      const data = await getSchemes(q);
      if (data && data.schemes && data.schemes.length > 0) {
        setSchemes(data.schemes);
      } else {
        throw new Error('API empty');
      }
    } catch {
      // Fallback to robust mock data if backend fails
      const filtered = mockSchemes.filter(s => s.title.toLowerCase().includes(q.toLowerCase()));
      setSchemes(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchemes(); }, []);

  return (
    <div className="py-10 max-w-4xl mx-auto space-y-8 px-4 relative">
      <h1 className="text-4xl font-bold text-center font-['Space_Grotesk']">{t('schemes_title')}</h1>
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchSchemes(search)}
            placeholder={t('search_schemes')}
            className="w-full p-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" />
        </div>
        <button onClick={() => fetchSchemes(search)}
          className="px-6 btn-glow font-bold rounded-xl text-white text-sm">
          {t('schemes')}
        </button>
      </div>
      
      {/* Modal for Step-by-Step Guide */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto relative border border-green-500/50">
            <button 
              onClick={() => setSelectedScheme(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-green-400 mb-2">{selectedScheme.title}</h2>
            <p className="text-gray-300 mb-6 border-b border-white/10 pb-4">Step-by-Step Application Guide</p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg text-blue-300">Gather Documents</h3>
                  <p className="text-sm text-gray-400">You will need your Aadhar Card, Land Ownership Papers (7/12 extract), and Bank Passbook.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg text-blue-300">Register Online or Locally</h3>
                  <p className="text-sm text-gray-400">Visit the official portal or your local CSC (Common Service Centre) to fill out the form.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg text-blue-300">Submit Application</h3>
                  <p className="text-sm text-gray-400">After submitting, note down your Application Reference Number to track status.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <a href={selectedScheme.link} target="_blank" rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-blue-900 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors">
                Go to Official Portal <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      {loading
        ? <p className="text-center animate-pulse text-gray-400">Loading schemes...</p>
        : (
          <div className="space-y-4">
            {schemes.map(s => (
              <div key={s.id} className="glass-card p-6 space-y-3 relative">
                <h3 className="text-xl font-bold text-green-400">{s.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags?.map(tag => <span key={tag} className="px-3 py-1 text-xs bg-blue-800/50 border border-blue-700 rounded-full text-blue-300">{tag}</span>)}
                </div>
                <p className="text-sm text-gray-400"><strong className="text-white">{t('eligible')}:</strong> {s.eligibility?.join(', ')}</p>
                <button 
                  onClick={() => setSelectedScheme(s)}
                  className="mt-4 bg-blue-500/20 hover:bg-blue-500 border border-blue-500/50 text-blue-300 hover:text-white transition-colors py-2 px-4 rounded-lg flex items-center gap-2 text-sm font-bold"
                >
                  View Step-by-Step Guide
                </button>
              </div>
            ))}
            {schemes.length === 0 && <p className="text-center text-gray-400">No schemes found for that keyword.</p>}
          </div>
        )}
    </div>
  );
}
