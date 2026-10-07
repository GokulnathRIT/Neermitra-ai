import React, { useState, useEffect } from 'react';
import { Activity, Droplets, TrendingUp, AlertTriangle, CheckCircle, Calendar, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [sources, setSources] = useState([]);
  const [activeSource, setActiveSource] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSourcesAndHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('neermitra_token');
      if (!token) return;
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Fetch Sources
      const sourcesRes = await fetch(`${baseUrl}/api/water/sources`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const sourcesData = await sourcesRes.json();
      
      if (sourcesData && sourcesData.length > 0) {
        setSources(sourcesData);
        setActiveSource(sourcesData[0]);
        
        // Fetch History for the active source
        const historyRes = await fetch(`${baseUrl}/api/water/readings/${sourcesData[0]._id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const historyData = await historyRes.json();
        // reverse to make chronological order for the chart
        setHistory(historyData.reverse() || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSourcesAndHistory();
  }, []);

  // Format data for Recharts
  const chartData = history.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: item.analysis?.score || 0
  }));

  const latestReading = history.length > 0 ? history[history.length - 1] : null;

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black font-['Space_Grotesk']">Water Dashboard</h1>
            <p className="text-gray-400 mt-1">Track your historical water quality and AI risk assessments.</p>
          </div>
          <button onClick={fetchSourcesAndHistory} className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your water history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-card border border-white/10 p-12 text-center rounded-2xl">
            <Droplets size={48} className="mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Water History Yet</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">You haven't analyzed any water sources yet. Head over to the Water AI tool to get started.</p>
            <a href="/water-intelligence" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition">
              Run First Analysis
            </a>
          </div>
        ) : (
          <>
            {/* TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="glass-card border border-white/10 p-6 rounded-2xl">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Current Water Source</p>
                <h2 className="text-2xl font-bold truncate">{activeSource?.name}</h2>
                <div className="mt-4 inline-block bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
                  {activeSource?.type}
                </div>
              </div>

              <div className="glass-card border border-white/10 p-6 rounded-2xl">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Latest Health Score</p>
                <div className="flex items-end gap-3">
                  <h2 className={`text-4xl font-black ${
                    latestReading?.analysis?.riskClass === 'Higher Risk' ? 'text-red-400' :
                    latestReading?.analysis?.riskClass === 'Moderate Risk' ? 'text-yellow-400' :
                    'text-emerald-400'
                  }`}>
                    {latestReading?.analysis?.score || '--'}
                  </h2>
                  <span className="text-gray-400 mb-1">/ 100</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} /> {new Date(latestReading?.timestamp).toLocaleString()}
                </div>
              </div>

              <div className={`glass-card border p-6 rounded-2xl ${
                latestReading?.analysis?.riskClass === 'Higher Risk' ? 'border-red-500/30 bg-red-500/5' :
                latestReading?.analysis?.riskClass === 'Moderate Risk' ? 'border-yellow-500/30 bg-yellow-500/5' :
                'border-emerald-500/30 bg-emerald-500/5'
              }`}>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Risk Status</p>
                <h2 className={`text-2xl font-bold ${
                    latestReading?.analysis?.riskClass === 'Higher Risk' ? 'text-red-400' :
                    latestReading?.analysis?.riskClass === 'Moderate Risk' ? 'text-yellow-400' :
                    'text-emerald-400'
                  }`}>
                  {latestReading?.analysis?.riskClass}
                </h2>
                {latestReading?.analysis?.riskClass === 'Higher Risk' ? (
                  <p className="mt-2 text-sm text-red-400/80 line-clamp-2">Immediate filtration recommended.</p>
                ) : (
                  <p className="mt-2 text-sm text-emerald-400/80 line-clamp-2">Water is relatively safe.</p>
                )}
              </div>

            </div>

            {/* CHART */}
            <div className="glass-card border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-400" /> 30-Day Health Trend
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickMargin={10} />
                    <YAxis stroke="#ffffff50" fontSize={12} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                      itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      name="AI Health Score"
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#020817' }}
                      activeDot={{ r: 6, fill: '#60a5fa' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* HISTORY LOG */}
            <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold">Recent Assessments Log</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400">
                    <tr>
                      <th className="p-4 font-bold uppercase tracking-wider">Date</th>
                      <th className="p-4 font-bold uppercase tracking-wider">Parameters</th>
                      <th className="p-4 font-bold uppercase tracking-wider">Score</th>
                      <th className="p-4 font-bold uppercase tracking-wider">Risk Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {[...history].reverse().map((reading, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition">
                        <td className="p-4 whitespace-nowrap text-gray-300">
                          {new Date(reading.timestamp).toLocaleDateString()} <br/>
                          <span className="text-xs text-gray-500">{new Date(reading.timestamp).toLocaleTimeString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-2 max-w-sm">
                            {reading.parameters?.ph && <span className="bg-white/10 px-2 py-0.5 rounded text-xs">pH {reading.parameters.ph}</span>}
                            {reading.parameters?.tds && <span className="bg-white/10 px-2 py-0.5 rounded text-xs">TDS {reading.parameters.tds}</span>}
                            {reading.parameters?.turbidity && <span className="bg-white/10 px-2 py-0.5 rounded text-xs">Turb {reading.parameters.turbidity}</span>}
                            {reading.parameters?.nitrates && <span className="bg-white/10 px-2 py-0.5 rounded text-xs">N {reading.parameters.nitrates}</span>}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-lg">
                          {reading.analysis?.score}
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            reading.analysis?.riskClass === 'Higher Risk' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            reading.analysis?.riskClass === 'Moderate Risk' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {reading.analysis?.riskClass}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
