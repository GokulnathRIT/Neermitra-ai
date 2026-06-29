import { useState, useEffect } from 'react';
import { Send, Mic, Bot, User, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AiAdvisor = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Initial greeting using t()
  useEffect(() => {
    setMessages([{ id: 1, text: t('ai_greeting'), sender: 'ai' }]);
  }, [t]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMsg]);
    const currentInput = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let responseText = t('ai_analyzing');
      
      // Smart Keyword Matching
      if (currentInput.includes('rain') || currentInput.includes('मழ') || currentInput.includes('बारिश')) {
        responseText = t('ans_rain');
      } else if (currentInput.includes('crop') || currentInput.includes('பயிர்') || currentInput.includes('फसल')) {
        responseText = t('ans_crop');
      } else if (currentInput.includes('score') || currentInput.includes('மதிப்') || currentInput.includes('स्कोर')) {
        responseText = t('ans_score');
      } else if (currentInput.includes('scheme') || currentInput.includes('திட்ட') || currentInput.includes('योजना')) {
        responseText = t('ans_scheme');
      }

      setMessages((prev) => [
        ...prev, 
        { id: Date.now() + 1, text: responseText, sender: 'ai' }
      ]);
    }, 1000);
  };

  const suggestedQuestions = [
    t('q_rain'),
    t('q_crop'),
    t('q_score'),
    t('q_scheme')
  ];

  return (
    <div className="h-full flex flex-col glass rounded-3xl overflow-hidden shadow-sm border border-slate-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-brand to-leaf p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">NeerMitra Assistant</h2>
            <p className="text-white/80 text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <HelpCircle size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm ${msg.sender === 'user' ? 'bg-slate-200 text-slate-500' : 'bg-brand-light text-brand-dark'}`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`p-3 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-brand text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 bg-white/50">
        {suggestedQuestions.map((q, i) => (
          <button 
            key={i}
            onClick={() => setInput(q)}
            className="flex-shrink-0 px-3 py-1.5 bg-brand-light/30 text-brand-dark text-xs md:text-sm font-medium rounded-full border border-brand/20 hover:bg-brand-light/60 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex items-center gap-2 relative">
          <button type="button" className="p-3 text-slate-400 hover:text-brand bg-slate-100 hover:bg-slate-200 rounded-full transition-colors focus:outline-none">
            <Mic size={20} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-slate-700 placeholder-slate-400 text-sm md:text-base shadow-inner"
          />
          
          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              input.trim() 
                ? 'bg-brand text-white shadow-md hover:shadow-lg hover:scale-105' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Send size={20} className={input.trim() ? 'ml-1' : ''} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default AiAdvisor;
