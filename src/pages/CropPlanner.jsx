import { useState } from 'react';
import { Sprout, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CropPlanner = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const season = formData.get('season');
    const soil = formData.get('soil');
    
    // Simulate AI loading
    setTimeout(() => {
      setLoading(false);
      let res = {
        primary: "Pearl Millet (Bajra)",
        reason: "Highly drought-resistant. Perfect for the upcoming moderate drought risk and your current sandy-loam soil type. Requires 30% less water.",
        profit: "₹15,000 - ₹18,000 / acre",
        duration: "75-85 Days",
        waterNeeds: "Low (200-300 mm)"
      };

      if (season === 'Rabi (Winter)') {
        res = {
          primary: "Chickpea (Chana)",
          reason: `Excellent for ${season} season. Thrives well in ${soil} with minimal residual moisture.`,
          profit: "₹20,000 - ₹25,000 / acre",
          duration: "90-110 Days",
          waterNeeds: "Very Low (150-250 mm)"
        };
      } else if (soil === 'Black Cotton') {
         res = {
          primary: "Cotton (Short-duration)",
          reason: `Your ${soil} soil retains moisture well, making it suitable for a short-duration cotton variety despite lower rainfall.`,
          profit: "₹30,000 - ₹35,000 / acre",
          duration: "120-140 Days",
          waterNeeds: "Moderate (400-500 mm)"
        };
      }

      setResult(res);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-leaf-light text-leaf-dark rounded-full mb-4 shadow-sm">
          <Sprout size={32} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('smart_planner')}</h1>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto">Enter your farm details to get Vertex AI-powered crop recommendations tailored to your local water availability.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="glass p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold text-lg text-slate-800 mb-4">{t('farm_details')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Land Size (Acres)</label>
              <input type="number" required defaultValue="2" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Soil Type</label>
              <select name="soil" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf">
                <option>Sandy Loam</option>
                <option>Clay</option>
                <option>Black Cotton</option>
                <option>Red Soil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Water Source</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf">
                <option>Rainfed</option>
                <option>Borewell</option>
                <option>Canal</option>
                <option>Pond / Tank</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Season</label>
              <select name="season" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf">
                <option>Kharif (Monsoon)</option>
                <option>Rabi (Winter)</option>
                <option>Zaid (Summer)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-leaf to-leaf-dark text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <span className="animate-pulse">AI is analyzing data...</span>
              ) : (
                "Get AI Recommendation"
              )}
            </button>

          </form>
        </div>

        {/* Results Section */}
        <div>
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
              <Sprout size={48} className="mb-4 opacity-50" />
              <p>Fill out the form to generate AI insights based on local satellite and soil data.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-leaf-light border-t-leaf rounded-full animate-spin"></div>
              <p className="text-leaf-dark font-medium animate-pulse">Running Vertex AI predictive models...</p>
            </div>
          )}

          {result && !loading && (
            <div className="glass p-6 rounded-3xl border border-leaf/30 shadow-lg bg-leaf-50/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-leaf font-bold mb-4">
                <CheckCircle2 size={20} />
                <span>AI Recommendation Ready</span>
              </div>
              
              <h3 className="text-3xl font-extrabold text-slate-800 mb-2">{result.primary}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{result.reason}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                  <span className="text-slate-500 text-sm font-medium">Est. Profit</span>
                  <span className="font-bold text-slate-800">{result.profit}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                  <span className="text-slate-500 text-sm font-medium">Crop Duration</span>
                  <span className="font-bold text-slate-800">{result.duration}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                  <span className="text-slate-500 text-sm font-medium">Water Needs</span>
                  <span className="font-bold text-brand-dark bg-brand-light/50 px-2 py-1 rounded-md text-xs">{result.waterNeeds}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-white border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                Save to My Plan
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CropPlanner;
