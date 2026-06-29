import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard", advisor: "AI Advisor", climate: "Climate", planner: "Crop Planner", market: "Mandi Prices", schemes: "Schemes", map: "Village Map",
    // Common
    submit: "Submit", loading: "Loading...", update_now: "Update Now",
    // Home
    hero_title1: "Predict Water.", hero_title2: "Protect Communities.", hero_title3: "Empower Farmers.",
    hero_sub: "NeerMitra AI uses advanced AI to forecast water availability, helping you make smart crop decisions.",
    talk_ai: "Talk to AI", report_issue: "Report Issue",
    // Market
    live_mandi: "Live Mandi Prices", market_desc: "Real-time market rates from your nearest APMC mandi.",
    ai_market_pred: "AI Market Prediction", market_news: "Market News",
    // Crop Planner
    smart_planner: "Smart Crop Planner", farm_details: "Farm Details", land_size: "Land Size (Acres)",
    soil_type: "Soil Type", water_src: "Water Source", season: "Current Season", get_recom: "Get AI Recommendation",
    // Water Report
    comm_report: "Community Water Report", what_issue: "What is the issue?", location: "Location", add_photo: "Add Photo",
    // Market specific
    wheat: "Wheat (Sharbati)", soyabean: "Soyabean", cotton: "Cotton", millet: "Pearl Millet (Bajra)", onion: "Onion",
    since_yest: "since yesterday", market_pred_desc: "Based on historical data and current export demands, Soybean prices are expected to rise by 5-8% next month.",
    news_1: "Heavy rains in Maharashtra expected to affect Onion supply.", news_2: "Government announces new export quota for Wheat.",
    // AI Advisor specific
    ai_greeting: "Namaste! I am your NeerMitra AI Advisor. How can I assist you today?",
    ai_analyzing: "I am analyzing the current water data for your village. Ground water is currently sufficient for short-duration crops.",
    q_rain: "When scheme will rain next?", q_crop: "What crop uses less water?", q_score: "Check my water health score", q_scheme: "Show drought relief schemes",
    // Govt Schemes
    govt_schemes: "Government Schemes", schemes_desc: "Financial support and subsidies available for you.",
    apply_now: "Apply Now", scheme_1: "PM Krishi Sinchayee Yojana", scheme_1_desc: "Subsidy for drip and sprinkler irrigation systems to save water.",
    scheme_2: "Atal Bhujal Yojana", scheme_2_desc: "Community-led sustainable groundwater management.",
    // Climate
    climate_rain: "Climate & Rainfall", climate_desc: "7-day forecast and historical data.",
    temp: "Temperature", humidity: "Humidity", wind: "Wind Speed", rain_prob: "Rain Probability",
    // Leaderboard
    leaderboard: "Village Leaderboard", leader_desc: "Top water-saving champions in your community.",
    rank: "Rank", farmer: "Farmer", points: "Points",
    rank: "Rank", farmer: "Farmer", points: "Points",
    // Login
    login_title: "Water Intelligence for Farmers", login_btn: "Login to NeerMitra", create_acc: "Create Account",
    full_name: "Full Name", phone: "Phone Number", password: "Password", village_name: "Village Name",
    no_acc: "Don't have an account? Register", has_acc: "Already have an account? Login",
    // AI Answers
    ans_rain: "Based on climate data, there is an 80% chance of rain on Thursday. I recommend delaying irrigation.",
    ans_crop: "For low water availability, I strongly recommend Pearl Millet (Bajra) or Sorghum. They require 40% less water.",
    ans_score: "Your village water health score is currently 72/100. Groundwater levels are stable but slowly declining.",
    ans_scheme: "You are highly eligible for the PM Krishi Sinchayee Yojana! It provides up to 55% subsidy for drip irrigation."
  },
  hi: {
    dashboard: "डैशबोर्ड", advisor: "एआई सलाहकार", climate: "जलवायु", planner: "फसल योजना", market: "मंडी के भाव", schemes: "योजनाएं", map: "गाँव का नक्शा",
    submit: "जमा करें", loading: "लोड हो रहा है...", update_now: "अभी अपडेट करें",
    hero_title1: "जल की भविष्यवाणी।", hero_title2: "समुदायों की सुरक्षा।", hero_title3: "किसानों का सशक्तिकरण।",
    hero_sub: "नीरमित्रा एआई पानी की उपलब्धता का पूर्वानुमान लगाने के लिए एआई का उपयोग करता है।",
    talk_ai: "एआई से बात करें", report_issue: "समस्या दर्ज करें",
    live_mandi: "लाइव मंडी भाव", market_desc: "आपके नजदीकी APMC मंडी से रीयल-टाइम दरें।",
    ai_market_pred: "एआई बाजार भविष्यवाणी", market_news: "बाजार समाचार",
    smart_planner: "स्मार्ट फसल योजनाकार", farm_details: "खेत का विवरण", land_size: "भूमि का आकार (एकड़)",
    soil_type: "मिट्टी का प्रकार", water_src: "जल स्रोत", season: "वर्तमान मौसम", get_recom: "सिफारिश प्राप्त करें",
    comm_report: "सामुदायिक जल रिपोर्ट", what_issue: "समस्या क्या है?", location: "स्थान", add_photo: "फोटो जोड़ें",
    wheat: "गेहूं", soyabean: "सोयाबीन", cotton: "कपास", millet: "बाजरा", onion: "प्याज",
    since_yest: "कल से", market_pred_desc: "ऐतिहासिक डेटा के आधार पर, अगले महीने सोयाबीन की कीमतों में 5-8% की वृद्धि की उम्मीद है।",
    news_1: "महाराष्ट्र में भारी बारिश से प्याज की आपूर्ति प्रभावित होने की उम्मीद है।", news_2: "सरकार ने गेहूं के लिए नए निर्यात कोटे की घोषणा की।",
    ai_greeting: "नमस्ते! मैं आपका नीरमित्रा एआई सलाहकार हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    ai_analyzing: "मैं आपके गांव के वर्तमान जल डेटा का विश्लेषण कर रहा हूं। भूजल पर्याप्त है।",
    q_rain: "अगली बारिश कब होगी?", q_crop: "कौन सी फसल कम पानी का उपयोग करती है?", q_score: "मेरा जल स्वास्थ्य स्कोर जांचें", q_scheme: "राहत योजनाएं दिखाएं",
    govt_schemes: "सरकारी योजनाएं", schemes_desc: "आपके लिए उपलब्ध वित्तीय सहायता और सब्सिडी।",
    apply_now: "अभी आवेदन करें", scheme_1: "पीएम कृषि सिंचाई योजना", scheme_1_desc: "पानी बचाने के लिए ड्रिप और स्प्रिंकलर सिंचाई प्रणालियों के लिए सब्सिडी।",
    scheme_2: "अटल भूजल योजना", scheme_2_desc: "समुदाय के नेतृत्व में टिकाऊ भूजल प्रबंधन।",
    climate_rain: "जलवायु और वर्षा", climate_desc: "7-दिन का पूर्वानुमान और ऐतिहासिक डेटा।",
    temp: "तापमान", humidity: "नमी", wind: "हवा की गति", rain_prob: "वर्षा की संभावना",
    leaderboard: "ग्राम लीडरबोर्ड", leader_desc: "आपके समुदाय में शीर्ष जल-बचत चैंपियन।",
    rank: "रैंक", farmer: "किसान", points: "अंक",
    login_title: "किसानों के लिए जल बुद्धिमत्ता", login_btn: "लॉगिन करें", create_acc: "खाता बनाएं",
    full_name: "पूरा नाम", phone: "फ़ोन नंबर", password: "पासवर्ड", village_name: "गाँव का नाम",
    no_acc: "खाता नहीं है? रजिस्टर करें", has_acc: "पहले से खाता है? लॉगिन करें",
    ans_rain: "जलवायु डेटा के आधार पर, गुरुवार को बारिश होने की 80% संभावना है। मैं सिंचाई में देरी करने की सलाह देता हूं।",
    ans_crop: "कम पानी की उपलब्धता के लिए, मैं बाजरा या ज्वार की अत्यधिक अनुशंसा करता हूं। उन्हें 40% कम पानी की आवश्यकता होती है।",
    ans_score: "आपके गाँव का जल स्वास्थ्य स्कोर वर्तमान में 72/100 है। भूजल स्तर स्थिर है लेकिन धीरे-धीरे गिर रहा है।",
    ans_scheme: "आप पीएम कृषि सिंचाई योजना के लिए अत्यधिक पात्र हैं! यह ड्रिप सिंचाई के लिए 55% तक की सब्सिडी प्रदान करता है।"
  },
  ta: {
    dashboard: "முகப்பு", advisor: "AI ஆலோசகர்", climate: "காலநிலை", planner: "பயிர் திட்டம்", market: "சந்தை விலை", schemes: "திட்டங்கள்", map: "கிராம வரைபடம்",
    submit: "சமர்ப்பி", loading: "ஏற்றுகிறது...", update_now: "புதுப்பிக்கவும்",
    hero_title1: "நீரை கணிக்கவும்.", hero_title2: "சமூகங்களை பாதுகாக்கவும்.", hero_title3: "விவசாயிகளை மேம்படுத்தவும்.",
    hero_sub: "நீர்மித்ரா AI நீர் இருப்பை கணிக்க மேம்பட்ட AI ஐ பயன்படுத்துகிறது.",
    talk_ai: "AI உடன் பேசுங்கள்", report_issue: "பிரச்சனையை புகாரளி",
    live_mandi: "நேரடி சந்தை விலை", market_desc: "உங்கள் அருகிலுள்ள APMC சந்தையிலிருந்து நேரடி விலைகள்.",
    ai_market_pred: "AI சந்தை கணிப்பு", market_news: "சந்தை செய்திகள்",
    smart_planner: "ஸ்மார்ட் பயிர் திட்டம்", farm_details: "பண்ணை விவரங்கள்", land_size: "நில அளவு (ஏக்கர்)",
    soil_type: "மண் வகை", water_src: "நீர் ஆதாரம்", season: "தற்போதைய பருவம்", get_recom: "பரிந்துரையைப் பெறுங்கள்",
    comm_report: "சமூக நீர் அறிக்கை", what_issue: "பிரச்சனை என்ன?", location: "இடம்", add_photo: "புகைப்படம் சேர்",
    wheat: "கோதுமை", soyabean: "சோயாபீன்", cotton: "பருத்தி", millet: "கம்பு", onion: "வெங்காயம்",
    since_yest: "நேற்றிலிருந்து", market_pred_desc: "வரலாற்று தரவுகளின் அடிப்படையில், சோயாபீன் விலை 5-8% அதிகரிக்கும் என எதிர்பார்க்கப்படுகிறது.",
    news_1: "மகாராஷ்டிராவில் பெய்து வரும் கனமழையால் வெங்காய விநியோகம் பாதிக்கப்படும் என எதிர்பார்க்கப்படுகிறது.", news_2: "கோதுமைக்கான புதிய ஏற்றுமதி ஒதுக்கீட்டை அரசு அறிவித்துள்ளது.",
    ai_greeting: "நமஸ்தே! நான் உங்கள் நீர்மித்ரா AI ஆலோசகர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    ai_analyzing: "உங்கள் கிராமத்தின் தற்போதைய நீர் தரவை பகுப்பாய்வு செய்கிறேன். நிலத்தடி நீர் போதுமானதாக உள்ளது.",
    q_rain: "அடுத்த மழை எப்போது?", q_crop: "குறைந்த நீரை பயன்படுத்தும் பயிர் எது?", q_score: "எனது நீர் ஆரோக்கிய மதிப்பெண்ணை சரிபார்க்கவும்", q_scheme: "நிவாரண திட்டங்களை காட்டு",
    govt_schemes: "அரசு திட்டங்கள்", schemes_desc: "உங்களுக்கான நிதி உதவி மற்றும் மானியங்கள்.",
    apply_now: "இப்போதே விண்ணப்பிக்கவும்", scheme_1: "பிஎம் கிருஷி சின்சாயி யோஜனா", scheme_1_desc: "தண்ணீரை சேமிக்க சொட்டு நீர் பாசன அமைப்புகளுக்கான மானியம்.",
    scheme_2: "அடல் புஜல் யோஜனா", scheme_2_desc: "சமூக தலைமையிலான நிலையான நிலத்தடி நீர் மேலாண்மை.",
    climate_rain: "காலநிலை & மழை", climate_desc: "7 நாள் முன்னறிவிப்பு மற்றும் தரவு.",
    temp: "வெப்பநிலை", humidity: "ஈரப்பதம்", wind: "காற்றின் வேகம்", rain_prob: "மழை வாய்ப்பு",
    leaderboard: "கிராம லீடர்போர்டு", leader_desc: "உங்கள் சமூகத்தில் சிறந்த நீர் சேமிப்பு சாம்பியன்கள்.",
    rank: "தரவரிசை", farmer: "விவசாயி", points: "புள்ளிகள்",
    login_title: "விவசாயிகளுக்கான நீர் நுண்ணறிவு", login_btn: "உள்நுழைக", create_acc: "கணக்கை உருவாக்கு",
    full_name: "முழு பெயர்", phone: "தொலைபேசி எண்", password: "கடவுச்சொல்", village_name: "கிராமத்தின் பெயர்",
    no_acc: "கணக்கு இல்லையா? பதிவு செய்", has_acc: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக",
    ans_rain: "காலநிலை தரவுகளின் அடிப்படையில், வியாழக்கிழமை மழை பெய்ய 80% வாய்ப்பு உள்ளது. நீர்ப்பாசனத்தை தாமதப்படுத்த பரிந்துரைக்கிறேன்.",
    ans_crop: "குறைந்த நீர் இருப்புக்கு, கம்பு அல்லது சோளத்தை நான் கடுமையாக பரிந்துரைக்கிறேன். அவற்றுக்கு 40% குறைவான நீர் தேவைப்படுகிறது.",
    ans_score: "உங்கள் கிராமத்தின் நீர் ஆரோக்கிய மதிப்பெண் தற்போது 72/100 ஆக உள்ளது. நிலத்தடி நீர் அளவு நிலையானதாக உள்ளது ஆனால் மெதுவாக குறைந்து வருகிறது.",
    ans_scheme: "பிஎம் கிருஷி சின்சாயி யோஜனா திட்டத்திற்கு நீங்கள் மிகவும் தகுதியானவர்! இது சொட்டுநீர் பாசனத்திற்கு 55% வரை மானியம் வழங்குகிறது."
  },
  te: {
    dashboard: "డాష్‌బోర్డ్", advisor: "AI సలహాదారు", climate: "వాతావరణం", planner: "పంట ప్రణాళిక", market: "మార్కెట్ ధరలు", schemes: "పథకాలు", map: "గ్రామ పటం",
    submit: "సమర్పించు", loading: "లోడ్ అవుతోంది...", update_now: "అప్‌డేట్ చేయండి",
    hero_title1: "నీటిని అంచనా వేయండి.", hero_title2: "సంఘాలను రక్షించండి.", hero_title3: "రైతులకు సాధికారత.",
    hero_sub: "నీటి లభ్యతను అంచనా వేయడానికి నీర్ మిత్ర AI అధునాతన AI ని ఉపయోగిస్తుంది.",
    talk_ai: "AI తో మాట్లాడండి", report_issue: "సమస్యను నివేదించండి",
    live_mandi: "లైవ్ మార్కెట్ ధరలు", market_desc: "మీ సమీప APMC మార్కెట్ నుండి ప్రత్యక్ష ధరలు.",
    ai_market_pred: "AI మార్కెట్ అంచనా", market_news: "మార్కెట్ వార్తలు",
    smart_planner: "స్మార్ట్ పంట ప్రణాళిక", farm_details: "వ్యవసాయ వివరాలు", land_size: "భూమి పరిమాణం (ఎకరాలు)",
    soil_type: "నేల రకం", water_src: "నీటి వనరు", season: "ప్రస్తుత సీజన్", get_recom: "సిఫార్సు పొందండి",
    comm_report: "కమ్యూనిటీ నీటి నివేదిక", what_issue: "సమస్య ఏమిటి?", location: "స్థానం", add_photo: "ఫోటో జోడించండి"
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", advisor: "AI ಸಲಹೆಗಾರ", climate: "ಹವಾಮಾನ", planner: "ಬೆಳೆ ಯೋಜನೆ", market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", schemes: "ಯೋಜನೆಗಳು", map: "ಗ್ರಾಮ ನಕ್ಷೆ",
    submit: "ಸಲ್ಲಿಸಿ", loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...", update_now: "ನವೀಕರಿಸಿ",
    hero_title1: "ನೀರನ್ನು ಊಹಿಸಿ.", hero_title2: "ಸಮುದಾಯಗಳನ್ನು ರಕ್ಷಿಸಿ.", hero_title3: "ರೈತರನ್ನು ಸಬಲಗೊಳಿಸಿ.",
    hero_sub: "ನೀರಿನ ಲಭ್ಯತೆಯನ್ನು ಊಹಿಸಲು ನೀರ್ ಮಿತ್ರ AI ಸುಧಾರಿತ AI ಅನ್ನು ಬಳಸುತ್ತದೆ.",
    talk_ai: "AI ಜೊತೆ ಮಾತನಾಡಿ", report_issue: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
    live_mandi: "ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", market_desc: "ನಿಮ್ಮ ಹತ್ತಿರದ APMC ಮಾರುಕಟ್ಟೆಯಿಂದ ನೇರ ಬೆಲೆಗಳು.",
    ai_market_pred: "AI ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆ", market_news: "ಮಾರುಕಟ್ಟೆ ಸುದ್ದಿ",
    smart_planner: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಯೋಜನೆ", farm_details: "ಕೃಷಿ ವಿವರಗಳು", land_size: "ಭೂಮಿಯ ಗಾತ್ರ (ಎಕರೆ)",
    soil_type: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", water_src: "ನೀರಿನ ಮೂಲ", season: "ಪ್ರಸ್ತುತ ಋತು", get_recom: "ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
    comm_report: "ಸಮುದಾಯ ನೀರಿನ ವರದಿ", what_issue: "ಸಮಸ್ಯೆ ಏನು?", location: "ಸ್ಥಳ", add_photo: "ಫೋಟೋ ಸೇರಿಸಿ"
  },
  ml: {
    dashboard: "ഡാഷ്‌ബോർഡ്", advisor: "AI ഉപദേശകൻ", climate: "കാലാവസ്ഥ", planner: "വിള പ്ലാനർ", market: "മാർക്കറ്റ് വില", schemes: "പദ്ധതികൾ", map: "ഗ്രാമ ഭൂപടം",
    submit: "സമർപ്പിക്കുക", loading: "ലോഡുചെയ്യുന്നു...", update_now: "അപ്ഡേറ്റ് ചെയ്യുക",
    hero_title1: "വെള്ളം പ്രവചിക്കുക.", hero_title2: "സമൂഹങ്ങളെ സംരക്ഷിക്കുക.", hero_title3: "കർഷകരെ ശാക്തീകരിക്കുക.",
    hero_sub: "ജല ലഭ്യത പ്രവചിക്കാൻ നീർമിത്ര AI വിപുലമായ AI ഉപയോഗിക്കുന്നു.",
    talk_ai: "AI-യോട് സംസാരിക്കുക", report_issue: "പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക",
    live_mandi: "തത്സമയ മാർക്കറ്റ് വിലകൾ", market_desc: "നിങ്ങളുടെ അടുത്തുള്ള APMC മാർക്കറ്റിൽ നിന്നുള്ള തത്സമയ നിരക്കുകൾ.",
    ai_market_pred: "AI മാർക്കറ്റ് പ്രവചനം", market_news: "മാർക്കറ്റ് വാർത്തകൾ",
    smart_planner: "സ്മാർട്ട് വിള പ്ലാനർ", farm_details: "ഫാം വിശദാംശങ്ങൾ", land_size: "ഭൂമിയുടെ വലിപ്പം (ഏക്കർ)",
    soil_type: "മണ്ണിന്റെ തരം", water_src: "ജലസ്രോതസ്സ്", season: "നിലവിലെ സീസൺ", get_recom: "ശുപാർശ നേടുക",
    comm_report: "കമ്മ്യൂണിറ്റി ജല റിപ്പോർട്ട്", what_issue: "എന്താണ് പ്രശ്നം?", location: "സ്ഥാനം", add_photo: "ഫോട്ടോ ചേർക്കുക"
  },
  mr: {
    dashboard: "डॅशबोर्ड", advisor: "एआय सल्लागार", climate: "हवामान", planner: "पीक नियोजक", market: "मंडी भाव", schemes: "योजना", map: "गावचा नकाशा",
    submit: "सबमिट करा", loading: "लोड होत आहे...", update_now: "अद्यतनित करा",
    hero_title1: "पाण्याचा अंदाज.", hero_title2: "समुदायांचे रक्षण.", hero_title3: "शेतकऱ्यांचे सक्षमीकरण.",
    hero_sub: "पाण्याच्या उपलब्धतेचा अंदाज घेण्यासाठी नीरमित्रा एआय वापरते.",
    talk_ai: "एआयशी बोला", report_issue: "समस्या नोंदवा",
    live_mandi: "थेट मंडी भाव", market_desc: "तुमच्या जवळच्या APMC मंडीतील थेट दर.",
    ai_market_pred: "एआय बाजार अंदाज", market_news: "बाजार बातम्या",
    smart_planner: "स्मार्ट पीक नियोजक", farm_details: "शेतीचा तपशील", land_size: "जमिनीचा आकार (एकर)",
    soil_type: "मातीचा प्रकार", water_src: "पाण्याचा स्रोत", season: "सध्याचा ऋतू", get_recom: "शिफारस मिळवा",
    comm_report: "समुदाय पाणी अहवाल", what_issue: "समस्या काय आहे?", location: "स्थान", add_photo: "फोटो जोडा"
  },
  bn: {
    dashboard: "ড্যাশবোর্ড", advisor: "এআই উপদেষ্টা", climate: "জলবায়ু", planner: "ফসল পরিকল্পনাকারী", market: "বাজারের দাম", schemes: "স্কিম", map: "গ্রামের মানচিত্র",
    submit: "জমা দিন", loading: "লোড হচ্ছে...", update_now: "আপডেট করুন",
    hero_title1: "জলের পূর্বাভাস।", hero_title2: "সম্প্রদায়ের সুরক্ষা।", hero_title3: "কৃষকদের ক্ষমতায়ন।",
    hero_sub: "জলের উপলব্ধতার পূর্বাভাস দিতে নীরমিত্র এআই ব্যবহার করে।",
    talk_ai: "এআই এর সাথে কথা বলুন", report_issue: "সমস্যা রিপোর্ট করুন",
    live_mandi: "লাইভ বাজারের দাম", market_desc: "আপনার নিকটবর্তী APMC বাজার থেকে লাইভ রেট।",
    ai_market_pred: "এআই বাজার পূর্বাভাস", market_news: "বাজারের খবর",
    smart_planner: "স্মার্ট ফসল পরিকল্পনাকারী", farm_details: "খামারের বিবরণ", land_size: "জমির আকার (একর)",
    soil_type: "মাটির ধরন", water_src: "জলের উৎস", season: "বর্তমান ঋতু", get_recom: "সুপারিশ পান",
    comm_report: "সম্প্রদায় জল রিপোর্ট", what_issue: "সমস্যা কি?", location: "অবস্থান", add_photo: "ছবি যোগ করুন"
  },
  gu: { dashboard: "ડેશબોર્ડ", advisor: "AI સલાહકાર", climate: "આબોહવા", planner: "પાક આયોજક", market: "બજાર ભાવ", schemes: "યોજનાઓ", map: "ગામનો નકશો", submit: "સબમિટ કરો", loading: "લોડ થઈ રહ્યું છે...", update_now: "અપડેટ કરો", hero_title1: "પાણીની આગાહી.", hero_title2: "સમુદાયોનું રક્ષણ.", hero_title3: "ખેડૂતોનું સશક્તિકરણ.", hero_sub: "પાણીની ઉપલબ્ધતાની આગાહી કરવા માટે નીરમિત્ર AI નો ઉપયોગ કરે છે.", talk_ai: "AI સાથે વાત કરો", report_issue: "સમસ્યા નોંધો", live_mandi: "લાઇવ બજાર ભાવ", market_desc: "નજીકના APMC બજારમાંથી લાઇવ રેટ.", ai_market_pred: "AI બજાર આગાહી", market_news: "બજાર સમાચાર", smart_planner: "સ્માર્ટ પાક આયોજક", farm_details: "ખેતરની વિગતો", land_size: "જમીનનું કદ (એકર)", soil_type: "જમીનનો પ્રકાર", water_src: "પાણીનો સ્ત્રોત", season: "વર્તમાન ઋતુ", get_recom: "ભલામણ મેળવો", comm_report: "સમુદાય પાણી અહેવાલ", what_issue: "સમસ્યા શું છે?", location: "સ્થાન", add_photo: "ફોટો ઉમેરો" },
  pa: { dashboard: "ਡੈਸ਼ਬੋਰਡ", advisor: "ਏਆਈ ਸਲਾਹਕਾਰ", climate: "ਜਲਵਾਯੂ", planner: "ਫਸਲ ਯੋਜਨਾਕਾਰ", market: "ਮੰਡੀ ਦੇ ਭਾਅ", schemes: "ਸਕੀਮਾਂ", map: "ਪਿੰਡ ਦਾ ਨਕਸ਼ਾ", submit: "ਜਮ੍ਹਾਂ ਕਰੋ", loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...", update_now: "ਅੱਪਡੇਟ ਕਰੋ", hero_title1: "ਪਾਣੀ ਦੀ ਭਵਿੱਖਬਾਣੀ।", hero_title2: "ਭਾਈਚਾਰਿਆਂ ਦੀ ਸੁਰੱਖਿਆ।", hero_title3: "ਕਿਸਾਨਾਂ ਦਾ ਸਸ਼ਕਤੀਕਰਨ।", hero_sub: "ਨੀਰਮਿਤਰਾ ਏਆਈ ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰਨ ਲਈ ਏਆਈ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ।", talk_ai: "ਏਆਈ ਨਾਲ ਗੱਲ ਕਰੋ", report_issue: "ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ", live_mandi: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ", market_desc: "ਨੇੜਲੀ APMC ਮੰਡੀ ਤੋਂ ਲਾਈਵ ਰੇਟ।", ai_market_pred: "ਏਆਈ ਮਾਰਕੀਟ ਭਵਿੱਖਬਾਣੀ", market_news: "ਮਾਰਕੀਟ ਖ਼ਬਰਾਂ", smart_planner: "ਸਮਾਰਟ ਫਸਲ ਯੋਜਨਾਕਾਰ", farm_details: "ਖੇਤ ਦੇ ਵੇਰਵੇ", land_size: "ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ (ਏਕੜ)", soil_type: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ", water_src: "ਪਾਣੀ ਦਾ ਸਰੋਤ", season: "ਮੌਜੂਦਾ ਮੌਸਮ", get_recom: "ਸਿਫਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ", comm_report: "ਕਮਿਊਨਿਟੀ ਪਾਣੀ ਦੀ ਰਿਪੋਰਟ", what_issue: "ਸਮੱਸਿਆ ਕੀ ਹੈ?", location: "ਸਥਾਨ", add_photo: "ਫੋਟੋ ਸ਼ਾਮਲ ਕਰੋ" }
};

export const languagesList = [
  { code: 'en', name: 'English' }, { code: 'hi', name: 'हिंदी' }, { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' }, { code: 'kn', name: 'ಕನ್ನಡ' }, { code: 'ml', name: 'മലയാളം' },
  { code: 'mr', name: 'मराठी' }, { code: 'bn', name: 'বাংলা' }, { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' }
];

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
