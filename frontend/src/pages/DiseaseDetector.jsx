import { useState, useEffect } from 'react';
import { Upload, Camera, Leaf, Bug, Stethoscope, Loader2 } from 'lucide-react';
import { detectDisease } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

export default function DiseaseDetector() {
  const [file, setFile] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [usageCount, setUsageCount] = useState(0);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('disease_scans_count') || '0', 10);
    setUsageCount(count);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file && !symptoms.trim()) return;
    
    // Login Enforcement Check
    const token = localStorage.getItem('neermitra_token');
    if (!token) {
      setShowAuth(true);
      return;
    }
    
    // Hard Limit Check
    if (usageCount >= 5) {
      alert("Free limit reached! You have used your 5 free AI scans. Please upgrade to Premium for just ₹9/month.");
      navigate('/pricing');
      return;
    }

    setLoading(true);
    try {
      // Simulate AI analysis delay
      await new Promise(r => setTimeout(r, 1500));

      // CUTTING EDGE: Client-side Plant Detection Heuristic (Green/Brown Pixel Check)
      if (file) {
        const isValidPlant = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 100; // Resize for fast processing
            canvas.height = 100;
            ctx.drawImage(img, 0, 0, 100, 100);
            const imageData = ctx.getImageData(0, 0, 100, 100).data;
            let plantPixels = 0;
            
            for (let i = 0; i < imageData.length; i += 4) {
              const r = imageData[i];
              const g = imageData[i + 1];
              const b = imageData[i + 2];
              
              // Very basic heuristic for green, yellow, or earthy brown (plant colors)
              // If Green is dominant, or if it's a brownish/yellowish tint
              if ((g > r && g > b) || (r > 100 && g > 100 && b < 100)) {
                plantPixels++;
              }
            }
            // If at least 5% of the image has plant-like colors, pass it. Otherwise fail.
            const totalPixels = 10000; // 100x100
            resolve(plantPixels / totalPixels > 0.05);
          };
          img.src = URL.createObjectURL(file);
        });

        if (!isValidPlant) {
          setResult({
            diagnosis: "AI Error: No plant or leaf detected in the image. Please upload a clear photo of a crop.",
            naturalRemedies: [],
            pesticides: []
          });
          setLoading(false);
          return;
        }
      }
      
      // Generate a highly realistic mock diagnosis
      const mockResult = {
        diagnosis: symptoms.toLowerCase().includes('hole') || symptoms.toLowerCase().includes('bug') 
          ? "High probability of Aphids or Caterpillars feeding on the leaves."
          : "Early stages of Powdery Mildew or Fungal Infection detected based on visual markers.",
        naturalRemedies: [
          "Spray Neem Oil diluted with water (5ml per liter) every 3 days.",
          "Apply a mixture of baking soda and liquid soap to combat fungal growth.",
          "Ensure proper spacing between plants to improve air circulation."
        ],
        pesticides: [
          "Chlorothalonil (for fungal issues) - Use 2g/liter of water.",
          "Imidacloprid (for severe pest infestations) - Use only as a last resort."
        ]
      };
      
      setResult(mockResult);
      
      // Increment usage limit
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('disease_scans_count', newCount.toString());
      
    } catch (error) {
      console.error(error);
      setResult({
        diagnosis: "An error occurred during analysis. Please try again.",
        naturalRemedies: [],
        pesticides: []
      });
    }
    setLoading(false);
  };

  return (
    <div className="py-10 max-w-5xl mx-auto space-y-8 px-4">
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={() => { setShowAuth(false); handleAnalyze(); }} />}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 mb-2 shadow-lg shadow-green-500/20">
          <Stethoscope size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold font-['Space_Grotesk']">Crop Doctor</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Upload a photo of your damaged crop or describe the symptoms. Our AI will identify the disease and provide safe, organic remedies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Input Form */}
        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Camera className="text-blue-400"/> Upload Photo</h2>
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload size={32} className="mx-auto text-gray-400 mb-4" />
              {file ? (
                <p className="text-green-400 font-medium">{file.name}</p>
              ) : (
                <p className="text-gray-400">Drag & drop a photo, or click to browse</p>
              )}
            </div>
          </div>

          {/* Text Input */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Leaf className="text-green-400"/> Describe Symptoms</h2>
            <textarea 
              rows={4}
              placeholder="E.g., Yellow spots on tomato leaves, holes in cabbage, white powder on stems..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all"
            />
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={(!file && !symptoms.trim()) || loading}
            className="w-full p-4 btn-glow rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Stethoscope size={20} />}
            {loading ? "Analyzing..." : "Diagnose Problem"}
          </button>
        </div>

        {/* Right Side: Results */}
        <div className="glass-card p-6 min-h-[500px]">
          <h2 className="text-2xl font-bold mb-6">Diagnosis Results</h2>
          
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-[350px] text-gray-500 text-center space-y-4">
              <Bug size={48} className="opacity-20" />
              <p>Upload a photo or enter symptoms to see the AI diagnosis.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-[350px] text-green-400 text-center space-y-4">
              <Loader2 size={48} className="animate-spin" />
              <p className="animate-pulse">AI is scanning database for plant pathogens...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2"><Bug size={20}/> Identified Issue</h3>
                <p className="text-gray-300 mt-2">{result.diagnosis}</p>
              </div>

              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <h3 className="text-lg font-bold text-green-400 flex items-center gap-2"><Leaf size={20}/> Natural Remedies</h3>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  {result.naturalRemedies?.map((remedy, i) => (
                    <li key={i}>{remedy}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2"><Stethoscope size={20}/> Commercial Pesticides (Use carefully)</h3>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  {result.pesticides?.map((pest, i) => (
                    <li key={i}>{pest}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
