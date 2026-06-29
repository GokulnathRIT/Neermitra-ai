import { useState } from 'react';
import { Camera, MapPin, Upload, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WaterReport = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Report Submitted!</h2>
        <p className="text-slate-500 max-w-sm">Thank you for helping the community. The local authorities have been notified, and you earned <span className="font-bold text-brand-dark">+50 Water Points</span>.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 px-6 py-2.5 bg-brand text-white rounded-full font-medium shadow-md hover:bg-brand-dark transition-colors">
          Report Another Issue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{t('comm_report')}</h1>
        <p className="text-slate-500 text-sm mt-1">Help us track local water issues to improve village resources.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass p-6 rounded-3xl space-y-5 shadow-sm border border-slate-200">
        
        {/* Issue Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t('what_issue')}</label>
          <div className="grid grid-cols-2 gap-3">
            {['Water Leak', 'Dry Borewell', 'Contaminated Water', 'Empty Tank'].map((type) => (
              <label key={type} className="relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-brand focus-within:ring-2 focus-within:ring-brand transition-all">
                <input type="radio" name="issue_type" className="peer sr-only" required />
                <span className="text-sm font-medium text-slate-700 peer-checked:text-brand-dark">{type}</span>
                <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-brand peer-checked:bg-brand-light/10 pointer-events-none"></div>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
          <div className="flex gap-2">
            <input type="text" placeholder="E.g., Near Panchayat Office" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand text-sm" required />
            <button type="button" className="p-2.5 bg-slate-100 text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-200 hover:text-brand transition-colors flex items-center justify-center">
              <MapPin size={20} />
            </button>
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Add Photo</label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="p-3 bg-white shadow-sm rounded-full mb-3 group-hover:scale-110 transition-transform">
              <Camera size={24} className="text-brand" />
            </div>
            <p className="text-sm font-medium">Tap to take photo</p>
            <p className="text-xs mt-1 text-slate-400">or upload from gallery</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional Details (Optional)</label>
          <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand text-sm resize-none"></textarea>
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-leaf text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all">
          <Upload size={18} /> Submit Report
        </button>

      </form>
    </div>
  );
};

export default WaterReport;
