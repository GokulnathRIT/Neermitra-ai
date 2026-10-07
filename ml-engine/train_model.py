import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import json
import time

# 1. GENERATE MASSIVE SYNTHETIC DATASET
print("Generating ENTERPRISE-GRADE SYNTHETIC dataset (1,000,000 samples) for development...")
start_time = time.time()

np.random.seed(42)
n_samples = 1000000

# Realistic ranges for water parameters
ph = np.clip(np.random.normal(7.2, 1.5, n_samples), 0, 14)
tds = np.clip(np.random.normal(400, 300, n_samples), 0, 3000)
turbidity = np.clip(np.random.exponential(4, n_samples), 0, 100)
ec = tds * np.random.uniform(1.5, 2.0, n_samples)
temperature = np.random.normal(25, 5, n_samples)

# New Parameters to make the model richer!
# Nitrates: mg/L (Safe is typically < 45)
nitrates = np.clip(np.random.exponential(15, n_samples), 0, 200)

# Dissolved Oxygen (DO): mg/L (Safe is typically > 6.5)
do = np.clip(np.random.normal(7.5, 2.5, n_samples), 0, 15)

# Determine Risk Label based on strict guidelines (Synthetic Rules)
def determine_risk(p, t, turb, e, temp, n, d):
    if (p < 6.5 or p > 8.5) or t > 1000 or turb > 10 or e > 2000 or n > 45 or d < 4:
        return "Higher Risk"
    elif (p < 6.8 or p > 8.0) or t > 500 or turb > 5 or e > 800 or n > 10 or d < 6.5:
        return "Moderate Risk"
    else:
        return "Lower Risk"

# Vectorized approach for 1 Million rows for speed
print("Applying complex water-health rules to 1,000,000 samples...")
df = pd.DataFrame({
    'ph': ph, 'tds': tds, 'turbidity': turbidity, 'ec': ec, 
    'temperature': temperature, 'nitrates': nitrates, 'do': do
})

# Vectorized conditions
higher_risk = (df['ph'] < 6.5) | (df['ph'] > 8.5) | (df['tds'] > 1000) | (df['turbidity'] > 10) | (df['ec'] > 2000) | (df['nitrates'] > 45) | (df['do'] < 4)
moderate_risk = (df['ph'] < 6.8) | (df['ph'] > 8.0) | (df['tds'] > 500) | (df['turbidity'] > 5) | (df['ec'] > 800) | (df['nitrates'] > 10) | (df['do'] < 6.5)

df['risk_label'] = "Lower Risk"
df.loc[moderate_risk, 'risk_label'] = "Moderate Risk"
df.loc[higher_risk, 'risk_label'] = "Higher Risk"

# Add 10% realistic noise/edge-cases so the ML model generalizes instead of memorizing
noise_indices = np.random.choice(df.index, size=int(n_samples*0.10), replace=False)
df.loc[noise_indices, 'risk_label'] = np.random.choice(["Lower Risk", "Moderate Risk", "Higher Risk"], size=len(noise_indices))

df.to_csv('synthetic_water_data_1M.csv', index=False)
print(f"Dataset generated and saved in {time.time() - start_time:.2f} seconds!")

# 2. PREPARE DATA FOR ML
X = df[['ph', 'tds', 'turbidity', 'ec', 'temperature', 'nitrates', 'do']]
y = df['risk_label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. TRAIN BIG DATA MODEL
print("\n--- TRAINING ENTERPRISE RANDOM FOREST ON 1,000,000 ROWS ---")
# Using n_jobs=-1 to use all CPU cores
model = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)

train_start = time.time()
model.fit(X_train, y_train)
print(f"Training completed in {time.time() - train_start:.2f} seconds!")

y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"\nRandom Forest Accuracy: {acc:.4f}")
print(classification_report(y_test, y_pred))

# 4. SAVE THE MODEL
joblib.dump(model, 'water_health_model_v3_1M.pkl')
print("\nModel saved to water_health_model_v3_1M.pkl")

# Save model metadata
metadata = {
    "model_name": "Random Forest (Enterprise Big Data)",
    "model_version": "v3.0",
    "dataset_version": "synthetic_v3_1Million",
    "features": ["ph", "tds", "turbidity", "ec", "temperature", "nitrates", "do"],
    "accuracy": acc
}
with open('model_metadata.json', 'w') as f:
    json.dump(metadata, f)
