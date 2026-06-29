import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Droplets, Leaf, Save, Plus } from 'lucide-react';

export default function Journal() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState([
    { id: 1, date: '2023-10-15', water: '150L', cropHealth: 'Good', notes: 'Used drip irrigation for 2 hours today. Soil moisture is perfect.' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ water: '', cropHealth: 'Good', notes: '' });

  const handleSave = () => {
    if (!newEntry.water || !newEntry.notes) return;
    setEntries([{ id: Date.now(), date: new Date().toISOString().split('T')[0], ...newEntry }, ...entries]);
    setNewEntry({ water: '', cropHealth: 'Good', notes: '' });
    setShowForm(false);
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-['Space_Grotesk'] flex items-center gap-3">
          <Book className="text-blue-400" size={36} /> Farmer's Journal
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-blue-900 font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> New Entry
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-8 animate-fade-in border border-green-400/30">
          <h2 className="text-2xl font-bold mb-4">Today's Log</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2 flex items-center gap-2"><Droplets size={16} className="text-cyan-400"/> Water Used (Liters)</label>
              <input 
                type="number" 
                value={newEntry.water}
                onChange={(e) => setNewEntry({...newEntry, water: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
                placeholder="e.g. 500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2 flex items-center gap-2"><Leaf size={16} className="text-green-400"/> Crop Health</label>
              <select 
                value={newEntry.cropHealth}
                onChange={(e) => setNewEntry({...newEntry, cropHealth: e.target.value})}
                className="w-full bg-blue-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Needs Attention</option>
                <option>Poor</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-2">Observations & Notes</label>
            <textarea 
              value={newEntry.notes}
              onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-green-400 h-24"
              placeholder="What did you notice in the field today?"
            ></textarea>
          </div>
          
          {/* AI Tip Preview */}
          {newEntry.notes.length > 10 && (
            <div className="bg-blue-900/40 border border-blue-500/30 p-4 rounded-lg mb-6 flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <p className="text-sm text-blue-200">
                <strong className="text-blue-300 block mb-1">AI Advisor Tip:</strong>
                Based on your notes, keeping the soil moisture consistent is great. Consider applying a light layer of mulch tomorrow to lock in that moisture!
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Save size={20} /> Save Log
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="glass-card p-6 border-l-4 border-green-500 hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="font-bold text-xl text-yellow-400">{entry.date}</div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-cyan-300 bg-cyan-900/30 px-3 py-1 rounded-full text-sm"><Droplets size={14}/> {entry.water}</span>
                <span className="flex items-center gap-1 text-green-300 bg-green-900/30 px-3 py-1 rounded-full text-sm"><Leaf size={14}/> {entry.cropHealth}</span>
              </div>
            </div>
            <p className="text-gray-300">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
