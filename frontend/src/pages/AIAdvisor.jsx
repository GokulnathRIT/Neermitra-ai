import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Send, Loader, Volume2, VolumeX } from 'lucide-react';
import { askAdvisor } from '../services/api';

export default function AIAdvisor() {
  const { t, i18n } = useTranslation();
  
  const langMap = {
    'en': 'en-IN', 'hi': 'hi-IN', 'ta': 'ta-IN', 
    'te': 'te-IN', 'mr': 'mr-IN', 'kn': 'kn-IN', 'gu': 'gu-IN'
  };
  
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState([
    { role: 'ai', text: t('advisor_greeting') }
  ]);
  const [loading, setLoading] = useState(false);
  const [voiceLang, setVoiceLang] = useState(langMap[i18n.language] || 'en-IN');
  const [isMuted, setIsMuted] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || loading) return;
    const userMsg = query;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);
    try {
      const data = await askAdvisor(userMsg);
      setChat(prev => [...prev, { role: 'ai', text: data.response }]);
      
      // Text to Speech for the AI Response
      if ('speechSynthesis' in window && !isMuted) {
        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(data.response.replace(/[\u{1F600}-\u{1F6FF}]/gu, '')); // Strip emojis for speech
        utterance.lang = voiceLang;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      setChat(prev => [...prev, { role: 'ai', text: '⚠️ Could not connect to AI. Make sure backend is running on port 5000.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 w-full max-w-3xl mx-auto space-y-6 px-4">
      <h1 className="text-4xl font-bold font-['Space_Grotesk']">{t('advisor_title')}</h1>
      <div className="glass-card w-full flex flex-col p-4" style={{ height: '75vh', minHeight: '400px', maxHeight: '800px' }}>
        <div className="flex-grow overflow-y-auto space-y-4 mb-4 pr-2">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed
                ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white/10 border border-white/20 text-gray-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-2 text-sm text-gray-300">
                <Loader size={16} className="animate-spin text-green-400" />
                {t('thinking')}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={voiceLang}
            onChange={(e) => setVoiceLang(e.target.value)}
            className="p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm hidden sm:block"
          >
            <option value="en-IN" className="bg-slate-800">English (IN)</option>
            <option value="hi-IN" className="bg-slate-800">हिंदी (Hindi)</option>
            <option value="ta-IN" className="bg-slate-800">தமிழ் (Tamil)</option>
            <option value="te-IN" className="bg-slate-800">తెలుగు (Telugu)</option>
            <option value="mr-IN" className="bg-slate-800">मराठी (Marathi)</option>
            <option value="kn-IN" className="bg-slate-800">ಕನ್ನಡ (Kannada)</option>
            <option value="gu-IN" className="bg-slate-800">ગુજરાતી (Gujarati)</option>
          </select>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 glass-card hover:bg-white/20 transition-colors flex-shrink-0 rounded-xl"
            title={isMuted ? "Unmute AI" : "Mute AI"}
          >
            {isMuted ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-blue-400" />}
          </button>
          <button 
            onClick={() => {
              if (!('webkitSpeechRecognition' in window)) {
                alert('Speech recognition is not supported in your browser. Try Chrome.');
                return;
              }
              const recognition = new window.webkitSpeechRecognition();
              recognition.lang = voiceLang; // Dynamic language selection
              recognition.interimResults = false;
              recognition.maxAlternatives = 1;
              recognition.start();
              recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                setQuery(speechResult);
                // Auto-send after a brief delay so the user can see it
                setTimeout(() => {
                  const sendBtn = document.getElementById('ai-send-btn');
                  if(sendBtn) sendBtn.click();
                }, 500);
              };
              recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
              };
            }}
            className="p-3 glass-card hover:bg-white/20 transition-colors flex-shrink-0 rounded-xl"
            title="Click to Speak"
          >
            <Mic size={20} className="text-red-400 hover:text-red-500 animate-pulse" />
          </button>
          <input
            type="text" value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t('type_question')}
            className="flex-grow p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
          <button id="ai-send-btn" onClick={handleSend} disabled={loading}
            className="p-3 bg-green-400 hover:bg-green-500 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50">
            <Send size={20} className="text-blue-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
