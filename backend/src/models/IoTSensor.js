// IoTSensorData Schema for Firebase Firestore
// Collection: "iot_data"
// Real-time data synced from IoT soil moisture and water level sensors

const IoTSensorSchema = {
  sensorId: 'string',
  type: 'soil_moisture | water_level | rainfall',
  village: 'string',
  district: 'string',
  readings: {
    value: 'number',
    unit: 'string',   // e.g. "%" for moisture, "cm" for water level
    timestamp: 'timestamp',
  },
  batteryLevel: 'number',
  status: 'active | inactive | maintenance',
};

module.exports = IoTSensorSchema;
