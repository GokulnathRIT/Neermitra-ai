import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, AlertTriangle } from 'lucide-react';
import L from 'leaflet';

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const VillageMap = () => {
  // Center map on a generic coordinate in India for demo
  const position = [21.1458, 79.0882]; // Nagpur (Central India)

  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Village Water Map</h1>
        <p className="text-slate-500 text-sm">Interactive map showing water stress zones and community reports.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm whitespace-nowrap">
          <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500"></div> High Stress
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm whitespace-nowrap">
          <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500"></div> Moderate Stress
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm whitespace-nowrap">
          <MapPin size={14} className="text-brand" /> Community Reports
        </div>
      </div>

      <div className="flex-1 glass rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative z-0 h-[500px]">
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Example Red Zone */}
          <Circle center={[21.15, 79.07]} radius={800} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold flex items-center gap-1 text-red-600"><AlertTriangle size={14}/> High Drought Risk</h3>
                <p className="text-xs text-slate-600 mt-1">Groundwater severely depleted.</p>
              </div>
            </Popup>
          </Circle>

          {/* Example Yellow Zone */}
          <Circle center={[21.13, 79.1]} radius={1200} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.2 }}>
            <Popup>
               <div className="font-sans">
                <h3 className="font-bold flex items-center gap-1 text-orange-600"><AlertTriangle size={14}/> Moderate Risk</h3>
                <p className="text-xs text-slate-600 mt-1">Water levels dropping.</p>
              </div>
            </Popup>
          </Circle>

          {/* Example Marker for Report */}
          <Marker position={[21.14, 79.08]}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-sm">Broken Pipe</h3>
                <p className="text-xs text-slate-500 mt-1">Reported 2 hours ago by Raju Farmer</p>
              </div>
            </Popup>
          </Marker>

        </MapContainer>
      </div>
    </div>
  );
};

export default VillageMap;
