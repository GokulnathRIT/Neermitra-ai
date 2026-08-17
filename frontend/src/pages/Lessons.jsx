import { useTranslation } from 'react-i18next';
import { BookOpen, AlertTriangle, Sprout, Landmark } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Lessons() {
  const { t } = useTranslation();

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 space-y-12">
      <Helmet>
        <title>Farming Guides & Articles | NeerMitra AI</title>
        <meta name="description" content="Read expert articles on how to cure crop diseases, apply for Indian government farming subsidies (PM-KISAN), and maximize crop yield using organic farming methods." />
        <meta property="og:title" content="Expert Farming Guides | NeerMitra AI" />
        <meta property="og:description" content="Free guides on curing crop diseases and getting PM-KISAN subsidies." />
      </Helmet>

      <div className="text-center">
        <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-4 flex items-center justify-center gap-3">
          <BookOpen className="text-blue-400" size={36} /> Farming Guides
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Expert articles and step-by-step guides to help you stop crop diseases, secure government subsidies, and increase your farming profit.
        </p>
      </div>

      <div className="space-y-12">
        {/* Article 1 */}
        <article className="glass-card p-8 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-orange-400" size={28} />
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">How to Stop Tomato Early Blight & Leaf Spot in 2026</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">Published: August 2026 • 5 min read • By NeerMitra Agronomy Team</p>
          
          <div className="prose prose-invert max-w-none space-y-4 text-gray-300 leading-relaxed">
            <p>
              Tomato Early Blight (Alternaria solani) and Septoria Leaf Spot are two of the most devastating fungal diseases for tomato farmers in India, especially during the monsoon season when humidity is high. If left untreated, these diseases can destroy up to 80% of your crop yield within a matter of weeks.
            </p>
            
            <h3 className="text-xl font-bold text-green-400 mt-6 mb-2">How to Identify the Disease</h3>
            <p>
              Early Blight usually begins on the lower, older leaves of the tomato plant. Look for dark brown or black spots with concentric rings (like a bullseye). As the disease progresses, the leaves turn yellow and drop off. Septoria Leaf Spot, on the other hand, appears as numerous small, circular spots with dark borders and grey centers.
            </p>
            
            <h3 className="text-xl font-bold text-green-400 mt-6 mb-2">Organic & Preventative Measures</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Crop Rotation:</strong> Never plant tomatoes, potatoes, or eggplants in the same soil for more than two consecutive years.</li>
              <li><strong>Bottom Watering:</strong> Use drip irrigation. Fungal spores splash from the soil onto the leaves when you use overhead sprinklers.</li>
              <li><strong>Neem Oil Spray:</strong> A preventative spray of 5ml pure Neem Oil mixed with 1 liter of water and a few drops of organic soap every 10 days creates a protective barrier on the leaves.</li>
            </ul>

            <h3 className="text-xl font-bold text-blue-400 mt-6 mb-2">Chemical Treatment (For Severe Infections)</h3>
            <p>
              If the disease has already spread to the middle of the plant, organic methods will not be enough. You must apply a chemical fungicide immediately. 
              <strong> Copper Oxychloride (50% WP)</strong> at a dosage of 2.5 grams per liter of water is highly effective. Spray thoroughly, covering both the top and bottom of the leaves, during the cooler hours of the early morning or late evening.
            </p>
          </div>
        </article>

        {/* Article 2 */}
        <article className="glass-card p-8 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Landmark className="text-yellow-400" size={28} />
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">Step-by-Step Guide: How to Apply for the PM-KISAN Subsidy Online</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">Published: August 2026 • 4 min read • By NeerMitra Finance Team</p>
          
          <div className="prose prose-invert max-w-none space-y-4 text-gray-300 leading-relaxed">
            <p>
              The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme that provides ₹6,000 per year in three equal installments to all landholding farmers' families in India. Despite the massive benefits, many rural farmers lose out on this money simply because they don't know how to register.
            </p>

            <h3 className="text-xl font-bold text-blue-400 mt-6 mb-2">Eligibility Criteria</h3>
            <p>
              Any Indian citizen who owns cultivable land is eligible. However, institutional landholders, government employees, and those paying income tax are excluded.
            </p>

            <h3 className="text-xl font-bold text-green-400 mt-6 mb-2">Documents Required</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aadhaar Card (must be linked to your active mobile number)</li>
              <li>Active Bank Account Details (Passbook)</li>
              <li>Land Registration Documents (Patta / Chitta)</li>
            </ul>

            <h3 className="text-xl font-bold text-green-400 mt-6 mb-2">How to Apply from your Mobile Phone</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Open your browser and visit the official PM-KISAN portal at <strong>pmkisan.gov.in</strong>.</li>
              <li>Scroll down to the "Farmers Corner" section on the right side of the screen.</li>
              <li>Click on the <strong>"New Farmer Registration"</strong> button.</li>
              <li>Select whether you are a "Rural Farmer" or "Urban Farmer".</li>
              <li>Enter your Aadhaar Number, select your state (e.g., Tamil Nadu), and complete the CAPTCHA verification.</li>
              <li>You will receive an OTP on your Aadhaar-linked mobile number. Enter the OTP to proceed.</li>
              <li>Fill in the required personal details, your bank account information, and your exact land details from your Patta.</li>
              <li>Upload a clear photo of your land documents and click Submit.</li>
            </ol>

            <p className="mt-6 text-sm text-gray-400 italic">
              Disclaimer: NeerMitra AI is a private agricultural technology platform and is not affiliated with the Government of India. For official support, visit pmkisan.gov.in.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
