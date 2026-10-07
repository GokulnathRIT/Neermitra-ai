import React, { useState, useEffect } from 'react';
import { Activity, Droplets, AlertTriangle, CheckCircle, FileWarning, ArrowRight, Camera, FileText, Edit3, FlaskConical, ChevronLeft, UploadCloud, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WaterIntelligence() {
  const navigate = useNavigate();
  
  // View states: 'MENU', 'MANUAL', 'IMAGE', 'REPORT', 'KIT', 'WIZARD'
  const [view, setView] = useState('MENU');
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({ usage: '', source: '' });
  
  const [formData, setFormData] = useState({
    ph: '', tds: '', turbidity: '', ec: '', temperature: '', nitrates: '', do: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [visualResult, setVisualResult] = useState(null);
  const [error, setError] = useState(null);
  const [sourceId, setSourceId] = useState(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const token = localStorage.getItem('neermitra_token');
        if (!token) return;
        
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/water/sources`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSourceId(data[0]._id);
          }
        }
      } catch (err) {
        console.error('Error fetching sources:', err);
      }
    };
    fetchSources();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const analyzeWater = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ph: formData.ph ? parseFloat(formData.ph) : null,
        tds: formData.tds ? parseFloat(formData.tds) : null,
        turbidity: formData.turbidity ? parseFloat(formData.turbidity) : null,
        ec: formData.ec ? parseFloat(formData.ec) : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        nitrates: formData.nitrates ? parseFloat(formData.nitrates) : null,
        do: formData.do ? parseFloat(formData.do) : null,
      };

      const pythonRes = await fetch('http://127.0.0.1:5001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const aiData = await pythonRes.json();
      
      if (!pythonRes.ok) {
        throw new Error(aiData.message || 'Failed to analyze water data.');
      }

      const prediction = aiData.prediction;
      setResult(prediction);

      const token = localStorage.getItem('neermitra_token');
      if (token && sourceId) {
        setSaving(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await fetch(`${baseUrl}/api/water/readings`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            waterSourceId: sourceId,
            sourceType: 'MANUAL_INPUT',
            parameters: payload,
            analysis: {
              score: prediction.score,
              riskClass: prediction.risk_class,
              modelVersion: prediction.model_version,
              confidence: prediction.confidence_percent,
              contributingFactors: prediction.contributing_factors,
              recommendation: prediction.recommendation,
              availableParameters: prediction.available_parameters
            }
          })
        });
        setSaving(false);
      }

    } catch (err) {
      setError(err.message);
      setSaving(false);
    } finally {
      setLoading(false);
    }
  };

  const renderMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8 animate-fade-in">
      {/* Option 1 */}
      <button onClick={() => setView('IMAGE')} className="glass-card border border-white/10 hover:border-blue-500/50 p-8 rounded-3xl text-left transition-all hover:scale-105 group">
        <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
          <Camera size={32} className="text-blue-400 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Photo Scan</h3>
        <p className="text-gray-400">Upload a clear photo of your water sample to check for visual impurities and cloudiness.</p>
      </button>

      {/* Option 2 */}
      <button onClick={() => setView('REPORT')} className="glass-card border border-white/10 hover:border-emerald-500/50 p-8 rounded-3xl text-left transition-all hover:scale-105 group">
        <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
          <FileText size={32} className="text-emerald-400 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Upload Lab Report</h3>
        <p className="text-gray-400">Upload your printed laboratory results. The system will automatically read and log the values.</p>
      </button>

      {/* Option 3 */}
      <button onClick={() => setView('MANUAL')} className="glass-card border border-white/10 hover:border-purple-500/50 p-8 rounded-3xl text-left transition-all hover:scale-105 group">
        <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
          <Edit3 size={32} className="text-purple-400 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Enter Measurements</h3>
        <p className="text-gray-400">Manually input your test results (like pH, TDS, and Nitrates) for an immediate safety check.</p>
      </button>

      {/* Option 4 */}
      <button onClick={() => setView('KIT')} className="glass-card border border-white/10 hover:border-yellow-500/50 p-8 rounded-3xl text-left transition-all hover:scale-105 group">
        <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
          <FlaskConical size={32} className="text-yellow-400 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Hardware & Sensors</h3>
        <p className="text-gray-400">Connect a compatible testing kit or view our recommended smart sensors for continuous monitoring.</p>
      </button>

      {/* NO REPORT CTA */}
      <div className="md:col-span-2 mt-4 flex justify-center">
        <button 
          onClick={() => { setWizardStep(1); setWizardData({usage: '', source: ''}); setView('WIZARD'); }} 
          className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center gap-3 shadow-lg hover:shadow-xl"
        >
          <AlertTriangle className="text-yellow-400" />
          I don't have a water report. What should I test?
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderWizard = () => (
    <div className="max-w-3xl mx-auto animate-fade-in glass-card border border-white/10 p-8 rounded-3xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="text-blue-400" /> Water Testing Guide
        </h2>
        <button onClick={() => setView('MENU')} className="text-gray-400 hover:text-white text-sm font-bold">
          Cancel
        </button>
      </div>

      {wizardStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-xl font-bold text-center mb-6">Step 1: What is the primary use for this water?</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Drinking', 'Cooking', 'Household Use', 'Bathing', 'Irrigation', 'Livestock', 'Business', 'Other'].map(use => (
              <button 
                key={use}
                onClick={() => { setWizardData({...wizardData, usage: use}); setWizardStep(2); }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 p-4 rounded-xl text-left transition"
              >
                {use}
              </button>
            ))}
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 cursor-pointer hover:text-white" onClick={() => setWizardStep(1)}>
            <ChevronLeft size={16}/> Back
          </div>
          <h3 className="text-xl font-bold text-center mb-6">Step 2: What is the water source?</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Municipal Supply', 'Borewell', 'Well', 'Tank', 'Surface Water', 'Rainwater', 'River', 'Other'].map(src => (
              <button 
                key={src}
                onClick={() => { setWizardData({...wizardData, source: src}); setWizardStep(3); }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 p-4 rounded-xl text-left transition"
              >
                {src}
              </button>
            ))}
          </div>
        </div>
      )}

      {wizardStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <CheckCircle size={48} className="mx-auto text-emerald-400 mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400">Your Water Testing Plan</h3>
            <p className="text-gray-400 mt-2">Based on your selection: <b>{wizardData.usage}</b> from a <b>{wizardData.source}</b>.</p>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
            <h4 className="font-bold mb-4 text-blue-400 uppercase text-sm tracking-wider">Recommended Laboratory Tests:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-1 rounded"><Droplets size={16} className="text-blue-400"/></div>
                <div>
                  <b className="block">Basic Chemical Panel</b>
                  <span className="text-sm text-gray-400">Must include pH, TDS, EC, and Hardness. Essential for {wizardData.usage.toLowerCase()}.</span>
                </div>
              </li>
              {(wizardData.source === 'Borewell' || wizardData.source === 'Well' || wizardData.usage === 'Irrigation') && (
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-500/20 p-1 rounded"><AlertTriangle size={16} className="text-yellow-400"/></div>
                  <div>
                    <b className="block">Nitrates & Heavy Metals</b>
                    <span className="text-sm text-gray-400">Groundwater sources are highly susceptible to agricultural runoff.</span>
                  </div>
                </li>
              )}
              {(wizardData.usage === 'Drinking' || wizardData.usage === 'Cooking') && (
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-500/20 p-1 rounded"><Activity size={16} className="text-emerald-400"/></div>
                  <div>
                    <b className="block">Microbiological Assessment (Coliform)</b>
                    <span className="text-sm text-gray-400">Critical. Standard chemical tests do not detect harmful bacteria.</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="pt-6 border-t border-white/10 flex gap-4">
            <button onClick={() => navigate('/labs')} className="flex-1 bg-white/10 hover:bg-white/20 font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
              <MapPin size={18} /> Find Nearby Partner Lab
            </button>
            <button onClick={() => setView('MENU')} className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold py-4 rounded-xl transition">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderManual = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      <div className="glass-card border border-white/10 p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView('MENU')} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><ChevronLeft size={20}/></button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Edit3 className="text-purple-400" /> Enter Measurements
          </h2>
        </div>
        <form onSubmit={analyzeWater} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">pH Level</label>
              <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 7.2" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">TDS (mg/L)</label>
              <input type="number" name="tds" value={formData.tds} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 400" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Turbidity (NTU)</label>
              <input type="number" step="0.1" name="turbidity" value={formData.turbidity} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 3.5" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">EC (µS/cm)</label>
              <input type="number" name="ec" value={formData.ec} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 600" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Temp (°C)</label>
              <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 25.0" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nitrates (mg/L)</label>
              <input type="number" step="0.1" name="nitrates" value={formData.nitrates} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 15.0" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Dissolved Oxygen (mg/L)</label>
            <input type="number" step="0.1" name="do" value={formData.do} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. 7.5" required />
          </div>
          <button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50">
            {loading ? 'Processing...' : 'Submit Data'}
          </button>
        </form>
      </div>
      {renderResultsPanel()}
    </div>
  );

  // ... (image and report rendering skipped in this replace, I need to make sure I am replacing the exact lines)
  // Let's just do it directly.

  const handleVisualUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setVisualResult(null);
    try {
      const token = localStorage.getItem('neermitra_token');
      if (!token) throw new Error("Please login to use the Visual Assessment feature.");

      const formDataObj = new FormData();
      formDataObj.append('image', file);

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/water/visual`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Visual assessment failed');

      setVisualResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderImageUpload = () => (
    <div className="max-w-4xl mx-auto animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => {setView('MENU'); setVisualResult(null);}} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><ChevronLeft size={20}/></button>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Camera className="text-blue-400" /> Photo Scan
          </h2>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <label className={`glass-card border border-white/10 p-12 rounded-3xl text-center border-dashed border-2 hover:border-blue-500/50 transition cursor-pointer block ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          <input type="file" accept="image/*" className="hidden" onChange={handleVisualUpload} />
          {loading ? (
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          ) : (
            <UploadCloud size={64} className="mx-auto text-blue-400 mb-6" />
          )}
          <h3 className="text-xl font-bold mb-2">{loading ? 'Analyzing Apparent Turbidity...' : 'Upload Water Photo'}</h3>
          <p className="text-gray-400 mb-6">{loading ? 'Processing visual characteristics.' : 'Ensure the photo is taken in good lighting with a transparent glass for best results.'}</p>
          <div className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition">
            {loading ? 'Processing...' : 'Select Image'}
          </div>
        </label>
      </div>

      <div>
        {!visualResult && !loading && (
          <div className="h-full glass-card border border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <Camera size={48} className="mb-4 opacity-50" />
            <p>Upload an image to see the Vision AI assessment of apparent cloudiness and color.</p>
          </div>
        )}
        {visualResult && (
          <div className="h-full glass-card border border-white/10 rounded-3xl overflow-hidden animate-fade-in flex flex-col">
            <div className="p-6 border-b border-white/10 bg-blue-500/10">
              <h3 className="font-bold text-blue-400 uppercase tracking-wider text-sm">Visual Assessment Result</h3>
              <h2 className="text-2xl font-black mt-1">Apparent Properties Analyzed</h2>
            </div>
            <div className="p-6 space-y-6 flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Cloudiness / Turbidity</span>
                  <span className="text-lg font-bold">{visualResult.cloudiness}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Visible Color</span>
                  <span className="text-lg font-bold">{visualResult.color}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 col-span-2">
                  <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Suspended Particles</span>
                  <span className="text-lg font-bold">{visualResult.particles}</span>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-yellow-100 text-sm">
                <h4 className="font-bold text-yellow-400 mb-1 flex items-center gap-2"><AlertTriangle size={16}/> Safety Warning</h4>
                {visualResult.safety_warning}
              </div>

              <div className="text-xs text-gray-500 italic">
                * Note: This is an apparent visual assessment only. A normal photograph cannot reliably provide exact chemical measurements. We recommend a full laboratory test or IoT sensor reading for accurate chemical composition.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('neermitra_token');
      if (!token) throw new Error("Please login to use the Lab Report OCR feature.");

      const formDataObj = new FormData();
      formDataObj.append('report', file);

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/water/ocr`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'OCR failed');

      // Populate form data with extracted values
      setFormData({
        ph: data.ph ?? '',
        tds: data.tds ?? '',
        turbidity: data.turbidity ?? '',
        ec: data.ec ?? '',
        temperature: data.temperature ?? '',
        nitrates: data.nitrates ?? '',
        do: data.do ?? ''
      });

      // Switch view to manual entry so user can review and submit
      setView('MANUAL');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderReportUpload = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('MENU')} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><ChevronLeft size={20}/></button>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="text-emerald-400" /> Upload Lab Report
        </h2>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <label className={`glass-card border border-white/10 p-12 rounded-3xl text-center border-dashed border-2 hover:border-emerald-500/50 transition cursor-pointer block ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
        <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileUpload} />
        {loading ? (
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-6"></div>
        ) : (
          <UploadCloud size={64} className="mx-auto text-emerald-400 mb-6" />
        )}
        <h3 className="text-xl font-bold mb-2">{loading ? 'Extracting Data using Gemini AI...' : 'Upload Lab Report'}</h3>
        <p className="text-gray-400 mb-6">{loading ? 'This usually takes about 3-5 seconds.' : 'Supported formats: PDF, JPG, PNG. Make sure the text is clearly visible.'}</p>
        <div className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition">
          {loading ? 'Processing...' : 'Upload File'}
        </div>
      </label>
    </div>
  );

  const renderHardwareKit = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('MENU')} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><ChevronLeft size={20}/></button>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FlaskConical className="text-yellow-400" /> Hardware & Sensors
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card border border-white/10 p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Compatible Sensors</h3>
          <p className="text-gray-400 mb-6">We are working with manufacturers to support direct sensor integrations. Check back soon for the official list of supported devices.</p>
          <ul className="space-y-4 mb-6 text-sm text-gray-300">
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400"/> Auto-syncs to Dashboard</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400"/> Real-time Risk Alerts</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400"/> Solar powered options</li>
          </ul>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition">
            Join Hardware Waitlist
          </button>
        </div>

        <div className="glass-card border border-yellow-500/20 bg-yellow-500/5 p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Developer API</h3>
          <p className="text-gray-400 mb-6">Push data directly from your custom hardware to your dashboard via our REST API.</p>
          <div className="bg-black/50 p-4 rounded-xl font-mono text-xs text-blue-300 mb-6 overflow-x-auto">
            POST /api/water/readings <br/>
            Authorization: Bearer YOUR_TOKEN <br/>
            {'{'} <br/>
            &nbsp;&nbsp;"sourceType": "IOT_SENSOR", <br/>
            &nbsp;&nbsp;"parameters": {'{'} "ph": 7.1, "tds": 350 {'}'} <br/>
            {'}'}
          </div>
          <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition">
            View API Docs
          </button>
        </div>
      </div>
    </div>
  );

  const renderResultsPanel = () => (
    <div className="flex flex-col gap-4">
      {!result && !error && !loading && (
        <div className="h-full glass-card border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-500">
          <Activity size={48} className="mb-4 opacity-50" />
          <p>Results will appear here automatically.</p>
        </div>
      )}
      {error && (
        <div className="glass-card border border-red-500/30 bg-red-500/10 p-6 rounded-2xl text-red-400 flex items-start gap-3">
          <AlertTriangle className="flex-shrink-0" />
          <div><h3 className="font-bold">Analysis Failed</h3><p className="text-sm mt-1">{error}</p></div>
        </div>
      )}
      {result && (
        <div className="glass-card border border-white/10 rounded-2xl overflow-hidden animate-fade-in flex flex-col h-full">
          <div className={`p-6 border-b border-white/10 flex justify-between items-center ${
            result.risk_class === 'Higher Risk' ? 'bg-red-500/20 text-red-400' :
            result.risk_class === 'Moderate Risk' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-emerald-500/20 text-emerald-400'
          }`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Water Safety Status</p>
              <h2 className="text-3xl font-black">{result.risk_class}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Health Score</p>
              <h2 className="text-3xl font-black">{result.score}/100</h2>
            </div>
          </div>
          <div className="p-6 space-y-6 flex-grow">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Confidence Score</h3>
              <div className="flex items-center gap-4">
                <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${result.confidence_percent}%` }}></div>
                </div>
                <span className="font-bold">{result.confidence_percent}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Key Observations</h3>
              {result.contributing_factors.length > 0 ? (
                <ul className="space-y-2">
                  {result.contributing_factors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                      <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />{factor}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-start gap-2 text-sm bg-emerald-500/10 text-emerald-400 p-3 rounded-lg border border-emerald-500/20">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> No hazardous factors detected.
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Action Plan</h3>
              <p className="text-sm leading-relaxed bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-purple-100">
                {result.recommendation}
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-900/50 border-t border-white/10 flex justify-between items-center flex-wrap gap-4">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              {saving ? <><div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div> Saving...</> : sourceId ? <><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Saved securely</> : <><div className="w-2 h-2 bg-red-500 rounded-full"></div> Login to save</>}
            </div>
            <div className="flex gap-4">
              <button onClick={() => window.print()} className="text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 border border-emerald-400/30 px-4 py-2 rounded-lg bg-emerald-400/10 transition">
                <FileText size={16} /> Download PDF Report
              </button>
              <button onClick={() => navigate('/dashboard')} className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 border border-blue-400/30 px-4 py-2 rounded-lg transition">
                View History <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <Droplets size={48} className="mx-auto text-blue-400 mb-4" />
          <h1 className="text-4xl font-black font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Water Quality Hub
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Select a method to log and analyze your water data.
          </p>
        </div>

        {view === 'MENU' && renderMenu()}
        {view === 'WIZARD' && renderWizard()}
        {view === 'MANUAL' && renderManual()}
        {view === 'IMAGE' && renderImageUpload()}
        {view === 'REPORT' && renderReportUpload()}
        {view === 'KIT' && renderHardwareKit()}
        
      </div>
    </div>
  );
}
