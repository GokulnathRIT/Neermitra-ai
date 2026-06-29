import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MessageSquare, MapPin, Droplets, Leaf, Search, Trophy, ArrowRight, ChevronRight } from 'lucide-react';

const sponsors = ['State Water Board', 'AgriTech India', 'Green Earth NGO', 'RuralTech Fund', 'NABARD'];

export default function Home() {
  const { t } = useTranslation();

  const features = [
    { icon: MessageSquare, color: 'from-blue-500 to-cyan-400',    title: t('advisor'),   desc: 'Multilingual AI chatbot — ask in Hindi, Telugu, Tamil or English.', to: '/advisor', img: '/images/realistic_ai_advisor_1782542927951.png'   },
    { icon: MapPin,        color: 'from-red-500 to-orange-400',   title: t('community'), desc: 'Submit GPS-tagged community water problems and track resolution.',   to: '/community', img: '/images/realistic_community_1782542941590.png' },
    { icon: Droplets,      color: 'from-cyan-500 to-blue-400',    title: t('dashboard'), desc: 'Real-time software-computed water health score for your region.',     to: '/dashboard', img: '/images/realistic_dashboard_1782542952277.png' },
    { icon: Leaf,          color: 'from-green-500 to-emerald-400',title: t('planner'),   desc: 'AI-driven crop picks with profitability estimates based on your land.',to: '/planner', img: '/images/realistic_planner_1782542967116.png'   },
    { icon: Search,        color: 'from-purple-500 to-violet-400',title: t('schemes'),   desc: 'Discover subsidies and schemes you are eligible for right now.',       to: '/schemes', img: '/images/realistic_schemes_1782542979676.png'   },
    { icon: Trophy,        color: 'from-yellow-500 to-amber-400', title: t('impact'),    desc: 'Leaderboards, badges and gamified water conservation challenges.',     to: '/impact', img: '/images/realistic_impact_1782542994067.png'    },
  ];

  const stats = [
    { value: '12,450+', label: t('farmers_helped')  },
    { value: '4.2M L',  label: t('litres_saved')    },
    { value: '874',     label: t('issues_resolved') },
    { value: '230',     label: t('villages')         },
  ];

  return (
    <div className="flex flex-col space-y-24 pb-24 px-4">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center pt-20 space-y-8 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card neon-border text-sm text-green-300 font-medium animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          {t('live_badge')}
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight animate-slide-up font-['Space_Grotesk']">
          {t('hero_line1')}{' '}
          <span className="shimmer-text">{t('hero_line2')}</span>{' '}
          {t('hero_line3')}
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl animate-slide-up">
          {t('hero_sub')}
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
          <Link to="/advisor" className="flex items-center gap-2 px-7 py-4 btn-glow text-base font-bold rounded-2xl">
            <MessageSquare size={18} /> {t('talk_to_ai')}
          </Link>
          <Link to="/pricing" className="flex items-center gap-2 px-7 py-4 glass-card neon-border text-green-300 font-bold rounded-2xl hover:bg-white/10 transition-all">
            {t('view_plans')} <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto w-full">
        <div className="glass-strong p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black gradient-text">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto w-full space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-['Space_Grotesk']">
          Everything a farmer needs, <span className="gradient-text">in one place</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Link key={i} to={f.to}
              className="glass-card p-6 card-hover group hover:scale-[1.03] hover:border-white/25 flex flex-col gap-4">
              <div className="h-48 w-full -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden relative">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                <div className={`absolute bottom-4 left-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg border-2 border-[#0f172a]`}>
                  <f.icon size={22} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-blue-400 group-hover:text-green-400 transition-colors mt-auto">
                Explore Feature <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Revenue Preview ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto w-full space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-['Space_Grotesk']">
          Our <span className="gradient-text">Revenue Model</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { emoji: '🆓', title: 'Free Tier',      color: 'border-gray-600', items: ['Basic AI chatbot', '5 crop plans/month', 'View community reports', 'Public schemes list'] },
            { emoji: '⭐', title: 'Premium ₹7/mo', color: 'border-blue-500', items: ['Unlimited AI queries', 'Advanced crop analytics', 'Submit + track reports', 'Priority scheme alerts'] },
            { emoji: '🏛️', title: 'NGO / Govt Plan', color: 'border-green-500', items: ['Data API access', 'Custom dashboards', 'Village analytics', 'White-label options'] },
          ].map((plan, i) => (
            <div key={i} className={`glass-card p-6 border ${plan.color} space-y-4`}>
              <div className="text-3xl">{plan.emoji}</div>
              <h3 className="text-xl font-bold">{plan.title}</h3>
              <ul className="space-y-2">
                {plan.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="block text-center py-2 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 transition-opacity mt-2">
                {t('get_started')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Farmer Testimonials ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto w-full space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-['Space_Grotesk']">
          Trusted by <span className="gradient-text">Real Farmers</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col gap-4 border-l-4 border-blue-400">
            <p className="text-gray-300 italic">"Before NeerMitra, I didn't know how much water I was wasting. The Voice AI told me in Hindi to switch to Millets during the dry season, and my income has doubled!"</p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">R</div>
              <div>
                <p className="font-bold text-sm text-white">Ramesh Kumar</p>
                <p className="text-xs text-green-400">Farmer from Rajasthan</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 flex flex-col gap-4 border-l-4 border-green-400">
            <p className="text-gray-300 italic">"I live in a low-network village. The offline caching feature allows me to check the drought risk and log my daily Journal even without internet. NeerMitra is my best friend."</p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-white">S</div>
              <div>
                <p className="font-bold text-sm text-white">Sanjay Patil</p>
                <p className="text-xs text-green-400">Farmer from Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sponsor Ticker ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full space-y-4">
        <p className="text-center text-sm text-gray-500 uppercase tracking-widest">Trusted & Sponsored By</p>
        <div className="glass-card py-4 px-8 flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((s, i) => (
            <span key={i} className="text-gray-400 font-semibold text-sm hover:text-white transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
