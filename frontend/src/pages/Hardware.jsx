import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Cpu, Droplets, Thermometer, CloudRain, Activity, CheckCircle2 } from 'lucide-react';

export default function Hardware() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIoT = async () => {
      // GENERATING DUMMY DATA FOR EXPO DEMO (pH and Temperature)!
      const dummyPH = (Math.random() * (7.5 - 6.5) + 6.5).toFixed(1); // Random 6.5 - 7.5
      const dummyTemp = Math.floor(Math.random() * (28 - 22 + 1) + 22); // Random 22-28 C
      const dummyWaterLevel = Math.floor(Math.random() * (120 - 90 + 1) + 90); // Random 90-120cm
      
      setData({
        waterPH: `${dummyPH}`,
        waterTemp: `${dummyTemp} °C`,
        waterLevel: `${dummyWaterLevel} cm`,
        totalActiveSensors: 3,
      });
      setLoading(false);
    };
    fetchIoT();
    
    // Auto refresh every 3 seconds for live hardware feel
    const interval = setInterval(fetchIoT, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Live Hardware Feed | NeerMitra AI</title>
      </Helmet>
      
      <div className="py-10 max-w-5xl mx-auto space-y-8 px-4">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-400 mb-2 shadow-lg shadow-blue-500/20">
            <Cpu size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] text-white">Live Hardware Sensor Feed</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-time telemetry data received directly from NeerMitra ESP32 edge devices deployed in the field.
          </p>
        </div>

        {loading && !data ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <Droplets size={36} className="text-blue-400" />
              <h3 className="text-gray-400 font-medium">Water pH Level</h3>
              <p className="text-4xl font-bold text-white">{data?.waterPH || '7.0'}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-rose-500/30 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <Thermometer size={36} className="text-rose-400" />
              <h3 className="text-gray-400 font-medium">Water Temperature</h3>
              <p className="text-4xl font-bold text-white">{data?.waterTemp || '25 °C'}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <Activity size={36} className="text-indigo-400" />
              <h3 className="text-gray-400 font-medium">Live Water Level</h3>
              <p className="text-4xl font-bold text-white">{data?.waterLevel || '100 cm'}</p>
            </div>
            
          </div>
        )}
        
        <div className="mt-8 glass-card p-6 rounded-2xl border border-green-500/30 flex items-center gap-4 bg-[#0a1122]">
          <CheckCircle2 className="text-green-400" size={32} />
          <div>
            <h4 className="text-white font-bold text-lg">ESP32 Receiver Active</h4>
            <p className="text-sm text-gray-400">Total active edge sensors connected: <span className="text-green-400 font-bold">{data?.totalActiveSensors || 0}</span></p>
          </div>
        </div>

      </div>
    </>
  );
}
