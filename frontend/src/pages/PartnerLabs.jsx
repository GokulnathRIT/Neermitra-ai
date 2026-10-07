import React from 'react';
import { MapPin, Phone, Star, Droplets, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_LABS = [
  {
    id: 1,
    name: "AquaSafe National Laboratory",
    rating: 4.8,
    reviews: 124,
    distance: "2.4 km",
    address: "124 Science Park Road, Tech District",
    certifications: ["ISO 9001", "NABL Accredited"],
    tests: ["Basic Chemical", "Microbiological", "Heavy Metals"],
    price: "₹899",
    verified: true
  },
  {
    id: 2,
    name: "Purity Check Environmental Services",
    rating: 4.5,
    reviews: 89,
    distance: "5.1 km",
    address: "45 Industrial Estate, Phase 2",
    certifications: ["State Certified"],
    tests: ["Basic Chemical", "Agricultural/Irrigation"],
    price: "₹499",
    verified: true
  },
  {
    id: 3,
    name: "City Diagnostics Water Wing",
    rating: 4.2,
    reviews: 56,
    distance: "7.8 km",
    address: "Healthcare Hub, City Center",
    certifications: ["ISO 14001"],
    tests: ["Drinking Water Panel", "Coliform Test"],
    price: "₹1,200",
    verified: false
  }
];

export default function PartnerLabs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <ShieldCheck size={48} className="mx-auto text-emerald-400 mb-4" />
          <h1 className="text-4xl font-black font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            Verified Partner Laboratories
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Book a test with a certified laboratory. Once you receive your report, upload it to the Water Hub for instant AI analysis.
          </p>
        </div>

        {/* SEARCH & FILTER (Static for MVP) */}
        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search by city or zip code..." 
            className="flex-grow bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500"
          />
          <button className="bg-emerald-600 hover:bg-emerald-500 font-bold py-4 px-8 rounded-xl transition">
            Search
          </button>
        </div>

        {/* LAB LISTINGS */}
        <div className="space-y-6">
          {MOCK_LABS.map(lab => (
            <div key={lab.id} className="glass-card border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row gap-6 hover:border-emerald-500/30 transition-all group">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{lab.name}</h2>
                  {lab.verified && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <CheckCircle size={12} /> NeerMitra Verified
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star size={16} className="fill-yellow-400"/> {lab.rating} ({lab.reviews})</span>
                  <span className="flex items-center gap-1"><MapPin size={16}/> {lab.distance}</span>
                  <span>{lab.address}</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Available Tests</p>
                  <div className="flex flex-wrap gap-2">
                    {lab.tests.map(test => (
                      <span key={test} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-gray-300">
                        {test}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Certifications</p>
                  <div className="flex gap-2">
                    {lab.certifications.map(cert => (
                      <span key={cert} className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                <div>
                  <p className="text-sm text-gray-400">Starting from</p>
                  <h3 className="text-3xl font-black text-emerald-400">{lab.price}</h3>
                </div>
                <div className="space-y-3 mt-6">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                    <MapPin size={18} /> Book Test
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <Phone size={18} /> Call Lab
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 glass-card border border-blue-500/30 bg-blue-500/10 p-8 rounded-3xl text-center">
          <h3 className="text-2xl font-bold mb-2">Are you a Certified Water Laboratory?</h3>
          <p className="text-blue-100/80 mb-6 max-w-lg mx-auto">
            Partner with NeerMitra to receive test bookings directly from our users. Expand your business while helping communities access safe water.
          </p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition inline-flex items-center gap-2">
            Apply for Partnership <ExternalLink size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
