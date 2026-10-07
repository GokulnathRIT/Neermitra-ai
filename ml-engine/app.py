from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import json

app = Flask(__name__)
CORS(app)

# Load the trained model and metadata
model = joblib.load('water_health_model_v3_1M.pkl')
with open('model_metadata.json', 'r') as f:
    metadata = json.load(f)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "metadata": metadata})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        ph = data.get('ph')
        tds = data.get('tds')
        turbidity = data.get('turbidity')
        ec = data.get('ec')
        temperature = data.get('temperature')
        nitrates = data.get('nitrates')
        do = data.get('do')
        
        # Validation for MVP
        missing = []
        if ph is None: missing.append('pH')
        if tds is None: missing.append('TDS')
        if turbidity is None: missing.append('Turbidity')
        if ec is None: missing.append('EC')
        if temperature is None: missing.append('Temperature')
        if nitrates is None: missing.append('Nitrates')
        if do is None: missing.append('Dissolved Oxygen')
            
        if len(missing) > 0:
            return jsonify({
                "status": "insufficient_data",
                "message": "Insufficient data for a comprehensive water-health assessment.",
                "missing": missing
            }), 400

        # Predict Risk
        features = pd.DataFrame([[ph, tds, turbidity, ec, temperature, nitrates, do]], columns=['ph', 'tds', 'turbidity', 'ec', 'temperature', 'nitrates', 'do'])
        prediction = model.predict(features)[0]
        
        # Feature Importance / Contributing Factor estimation
        contributing_factors = []
        if ph < 6.5 or ph > 8.5:
            contributing_factors.append("pH is outside the safe range (6.5 - 8.5).")
        if tds > 500:
            contributing_factors.append("TDS is elevated.")
        if turbidity > 5:
            contributing_factors.append("Turbidity is high, indicating suspended particles.")
        if ec > 800:
            contributing_factors.append("Electrical Conductivity (EC) is elevated.")
        if temperature > 35 or temperature < 10:
            contributing_factors.append("Temperature is unusual for normal drinking sources.")
        if nitrates > 45:
            contributing_factors.append("Nitrates are dangerously high (>45 mg/L), indicating possible agricultural runoff.")
        if do < 6.5:
            contributing_factors.append("Dissolved Oxygen (DO) is critically low, indicating poor water aeration or pollution.")
            
        recommendation = "Verify through an appropriate calibrated laboratory method for important decisions."
        if prediction == "Higher Risk":
            recommendation = "High risk detected. Immediate treatment or filtration is recommended. Verify through a lab."
            
        # Optional confidence (Random Forest predict_proba)
        probabilities = model.predict_proba(features)[0]
        confidence = round(max(probabilities) * 100, 2)
        
        # Convert prediction to 0-100 Score
        # (Lower Risk = ~90s, Moderate = ~70s, Higher = ~40s)
        base_score = 95 if prediction == "Lower Risk" else (70 if prediction == "Moderate Risk" else 40)
        # deduct points for edge cases
        score = base_score - (100 - confidence)/10
        
        return jsonify({
            "status": "success",
            "prediction": {
                "risk_class": prediction,
                "score": round(score),
                "confidence_percent": confidence,
                "model_version": metadata["model_version"],
                "contributing_factors": contributing_factors,
                "recommendation": recommendation,
                "available_parameters": ["pH", "TDS", "Turbidity", "EC", "Temperature", "Nitrates", "Dissolved Oxygen"]
            }
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
