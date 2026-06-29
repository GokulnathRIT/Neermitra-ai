import { useTranslation } from 'react-i18next';
import { Play, BookOpen } from 'lucide-react';

export default function Lessons() {
  const { t } = useTranslation();
  
  const videos = [
    {
      id: '1',
      title: 'Drip Irrigation Basics',
      description: 'Learn how to save up to 60% of water using simple drip irrigation techniques.',
      embedUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ' // Working nature placeholder
    },
    {
      id: '2',
      title: 'Identifying Fall Armyworm',
      description: 'Quickly identify and organically treat the devastating Fall Armyworm in Maize.',
      embedUrl: 'https://www.youtube.com/embed/YE7VzlLtp-4' // Working placeholder
    },
    {
      id: '3',
      title: 'Applying for PM-KISAN',
      description: 'A step-by-step 2 minute guide on registering for government subsidies online.',
      embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ' // Working placeholder
    }
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-4 flex items-center justify-center gap-3">
          <BookOpen className="text-blue-400" size={36} /> Micro-Lessons
        </h1>
        <p className="text-gray-300">Short, 2-minute videos to help you master smart farming and water conservation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map(video => (
          <div key={video.id} className="glass-card overflow-hidden border border-blue-500/30 hover:border-blue-400 transition-colors">
            <div className="relative pt-[56.25%] w-full bg-black">
              <iframe 
                src={video.embedUrl} 
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
                <Play size={18} /> {video.title}
              </h3>
              <p className="text-sm text-gray-300">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
