import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Droplet, Sprout, Sun, Shield, Leaf } from 'lucide-react';

export default function HouseFarming() {
  const { t } = useTranslation();
  
  const [space, setSpace] = useState('balcony');
  const [sunlight, setSunlight] = useState('partial');
  const [plantType, setPlantType] = useState('food');
  const [recommendation, setRecommendation] = useState(null);

  const generatePlan = () => {
    let result = { crops: [], advice: '' };
    
    if (plantType === 'decorative') {
      if (space === 'window' && sunlight === 'low') {
        result = { crops: ['Snake Plant', 'ZZ Plant', 'Pothos'], advice: 'These plants thrive in low light and purify indoor air. Water every 2 weeks.' };
      } else if (space === 'balcony' && sunlight === 'full') {
        result = { crops: ['Bougainvillea', 'Hibiscus', 'Petunias'], advice: 'Beautiful flowering plants that love direct sunlight. Water daily.' };
      } else if (space === 'terrace' && sunlight === 'full') {
        result = { crops: ['Jasmine', 'Rose bushes', 'Plumeria'], advice: 'Large pots required. Add compost monthly for best blooms.' };
      } else {
        result = { crops: ['Peace Lily', 'Spider Plant', 'Ferns'], advice: 'Great for partial shade. Keep soil moist but not soggy.' };
      }
    } else {
      // Food plants
      if (space === 'window' && sunlight === 'low') {
        result = { crops: ['Mint', 'Microgreens', 'Aloe Vera'], advice: 'Stick to low-light herbs. Ensure pots have good drainage.' };
      } else if (space === 'balcony' && sunlight === 'full') {
        result = { crops: ['Tomatoes', 'Chilies', 'Coriander', 'Spinach'], advice: 'Use medium-sized pots (8-12 inches). Water daily in summer.' };
      } else if (space === 'terrace' && sunlight === 'full') {
        result = { crops: ['Brinjal', 'Okra', 'Bottle Gourd', 'Lemon'], advice: 'You have great space! Use grow bags and set up a drip irrigation system.' };
      } else {
        result = { crops: ['Basil', 'Curry Leaves', 'Lemongrass'], advice: 'Versatile plants that survive most conditions. Do not overwater.' };
      }
    }
    
    setRecommendation(result);
  };

  return (
    <div className="py-12 max-w-6xl mx-auto space-y-12 px-4">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 mb-2 shadow-lg shadow-orange-500/20">
          <Home size={40} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
          {t('house_farming') || 'House Farming Guide'}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to grow your own organic kitchen garden on your balcony or terrace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: The Mini Planner */}
        <div className="glass-card p-8 border-t-4 border-orange-500 space-y-6">
          <h2 className="text-2xl font-bold font-['Space_Grotesk'] flex items-center gap-2">
            <Sprout className="text-orange-400" /> Kitchen Garden Mini Planner
          </h2>
          <p className="text-gray-400">Tell us what space you have, and we'll tell you what to plant.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Available Space</label>
              <select value={space} onChange={(e) => setSpace(e.target.value)} className="w-full p-4 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-orange-400">
                <option value="window">Window Sill</option>
                <option value="balcony">Balcony</option>
                <option value="terrace">Open Terrace</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Sunlight Level</label>
              <select value={sunlight} onChange={(e) => setSunlight(e.target.value)} className="w-full p-4 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-orange-400">
                <option value="low">Low (1-3 hours)</option>
                <option value="partial">Partial (3-5 hours)</option>
                <option value="full">Full Sun (6+ hours)</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-300">What do you want to grow?</label>
              <select value={plantType} onChange={(e) => setPlantType(e.target.value)} className="w-full p-4 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-orange-400">
                <option value="food">Food & Kitchen Herbs</option>
                <option value="decorative">Decorative & Flowers</option>
              </select>
            </div>
            
            <button onClick={generatePlan} className="w-full p-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/30">
              Get Recommendations
            </button>
          </div>

          {recommendation && (
            <div className="mt-6 p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl animate-fade-in space-y-3">
              <h3 className="text-xl font-bold text-orange-400">Recommended to Plant:</h3>
              <div className="flex flex-wrap gap-2">
                {recommendation.crops.map((crop, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm font-semibold">{crop}</span>
                ))}
              </div>
              <p className="text-gray-300 mt-2 text-sm italic">{recommendation.advice}</p>
            </div>
          )}
        </div>

        {/* Right Col: Tips & Guides */}
        <div className="space-y-6">
          
          <div className="glass-card p-6 flex gap-4 hover:bg-white/5 transition-colors">
            <div className="p-3 bg-blue-500/20 rounded-xl h-fit"><Droplet className="text-blue-400" size={24} /></div>
            <div>
              <h3 className="text-xl font-bold mb-1">Watering Rules</h3>
              <p className="text-sm text-gray-400">Never water on a schedule. Stick your finger 1 inch into the soil; if it feels dry, then water. Overwatering kills 80% of house plants. Ensure your pots have drainage holes.</p>
            </div>
          </div>

          <div className="glass-card p-6 flex gap-4 hover:bg-white/5 transition-colors">
            <div className="p-3 bg-amber-500/20 rounded-xl h-fit"><Sun className="text-amber-400" size={24} /></div>
            <div>
              <h3 className="text-xl font-bold mb-1">Soil & Sunlight</h3>
              <p className="text-sm text-gray-400">Use a mix of 30% garden soil, 30% coco peat (for moisture), and 40% vermicompost. Keep fruiting plants (like tomatoes) in South-facing areas for maximum sunlight.</p>
            </div>
          </div>

          <div className="glass-card p-6 flex gap-4 hover:bg-white/5 transition-colors">
            <div className="p-3 bg-green-500/20 rounded-xl h-fit"><Shield className="text-green-400" size={24} /></div>
            <div>
              <h3 className="text-xl font-bold mb-1">Natural Pesticides</h3>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li><strong>Neem Oil Spray:</strong> Mix 5ml neem oil + 1L water + 2 drops of dish soap. Spray weekly to prevent bugs.</li>
                <li><strong>Garlic Water:</strong> Crush garlic in water, leave overnight, and spray on aphids.</li>
                <li><strong>Wood Ash:</strong> Sprinkle around pots to stop snails.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
