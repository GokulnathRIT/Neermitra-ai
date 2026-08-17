import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Stethoscope, CloudRain, Sprout, Landmark, Home as HomeIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const { t } = useTranslation();

  const mainTools = [
    { 
      Icon: Stethoscope,
      color: 'from-green-500 to-emerald-400', 
      title: t('doctor') || 'Crop Doctor',   
      desc: 'Take a photo of a diseased leaf for an instant AI diagnosis and remedy.', 
      to: '/doctor' 
    },
    { 
      Icon: CloudRain,
      color: 'from-blue-500 to-cyan-400',    
      title: t('dashboard') || 'Weather Dashboard', 
      desc: 'Live 3-day weather predictor and soil moisture tracking for your district.', 
      to: '/dashboard' 
    },
    { 
      Icon: Sprout,
      color: 'from-emerald-500 to-teal-400', 
      title: t('planner') || 'Crop Planner',   
      desc: 'AI-driven crop profitability and yield estimator based on your land.', 
      to: '/planner' 
    },
    { 
      Icon: Landmark,
      color: 'from-purple-500 to-violet-400', 
      title: t('schemes') || 'Govt Schemes',   
      desc: 'Discover agricultural subsidies and financial schemes you are eligible for.', 
      to: '/schemes' 
    },
    { 
      Icon: HomeIcon,
      color: 'from-orange-500 to-amber-400', 
      title: t('house_farming') || 'House Farming',   
      desc: 'Tips for kitchen gardens, planting, soil levels, and natural pesticides.', 
      to: '/house-farming' 
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 space-y-12">
      <Helmet>
        <title>NeerMitra AI | India's First AI Agri-Tech Platform</title>
        <meta name="description" content="India's first AI-powered water intelligence and crop disease scanner platform for rural farmers. Predict Water. Protect Communities." />
        <meta property="og:title" content="NeerMitra AI | Empowering Farmers" />
        <meta property="og:description" content="AI Disease Scanner, Weather Tracking, and Crop Planning for Indian Farmers." />
      </Helmet>
      
      {/* ── Hero Title ─────────────────────────────────────────── */}
      <section className="text-center space-y-4 max-w-4xl mx-auto pt-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight font-['Space_Grotesk']">
          <span className="shimmer-text">NeerMitra AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
          {t('hero_sub') || "Your AI Farming Companion. Diagnose crops. Plan cultivation. Monitor conditions. Discover schemes. Grow smarter."}
        </p>
      </section>

      {/* ── Minimal 5-Grid Layout ──────────────────────────────── */}
      <section className="max-w-6xl w-full mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center place-items-center">
          {mainTools.map((tool, i) => {
            return (
              <Link key={i} to={tool.to}
                className="group relative w-full max-w-sm flex flex-col items-center justify-center p-8 text-center glass-card card-hover hover:scale-[1.02] transition-transform duration-300 border-2 border-white/5 hover:border-white/20 h-auto min-h-[22rem]">
                
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Icon Container */}
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-xl mb-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] transition-shadow border border-white/20 flex-shrink-0 bg-gradient-to-br ${tool.color}`}>
                  <tool.Icon className="text-white w-12 h-12 md:w-14 md:h-14 transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h2 className="text-3xl font-black mb-3 font-['Space_Grotesk']">{tool.title}</h2>
                <p className="text-gray-400 text-sm md:text-base px-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {tool.desc}
                </p>
                
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  );
}
