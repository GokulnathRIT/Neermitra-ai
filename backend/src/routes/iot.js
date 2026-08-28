const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Mock IoT sensor data store
let sensorData = [
  { sensorId: 'SNS001', type: 'soil_moisture', village: 'Rampur', district: 'Patna', readings: { value: 42, unit: '%', timestamp: new Date() }, batteryLevel: 85, status: 'active' },
  { sensorId: 'SNS002', type: 'water_level', village: 'Sitapur', district: 'Vaishali', readings: { value: 120, unit: 'cm', timestamp: new Date() }, batteryLevel: 72, status: 'active' },
  { sensorId: 'SNS003', type: 'rainfall', village: 'Gopalganj', district: 'Gopalganj', readings: { value: 15, unit: 'mm', timestamp: new Date() }, batteryLevel: 90, status: 'active' },
];

// @route   GET /api/iot/sensors
// @desc    Get all sensor data
router.get('/sensors', (req, res) => {
  res.json({ count: sensorData.length, sensors: sensorData });
});

// @route   POST /api/iot/sensors
// @desc    IoT Gateway pushes new sensor reading
router.post('/sensors', (req, res) => {
  const { sensorId, type, village, district, value, unit, ph, temp } = req.body;
  
  if (type === 'water_health' && (ph !== undefined || temp !== undefined)) {
    // Special handling for the water health sensor
    const existing = sensorData.find(s => s.sensorId === sensorId);
    if (existing) {
      existing.readings = { ph, temp, timestamp: new Date() };
      return res.json({ message: 'Sensor reading updated.', sensor: existing });
    }
    const newSensor = { sensorId, type: 'water_health', village: 'Demo', district: 'Expo', readings: { ph, temp, timestamp: new Date() }, batteryLevel: 100, status: 'active' };
    sensorData.push(newSensor);
    return res.status(201).json({ message: 'Sensor registered.', sensor: newSensor });
  }

  if (!sensorId || !type || !value) {
    return res.status(400).json({ error: 'sensorId, type and value are required.' });
  }
  const existing = sensorData.find(s => s.sensorId === sensorId);
  if (existing) {
    existing.readings = { value, unit: unit || existing.readings.unit, timestamp: new Date() };
    return res.json({ message: 'Sensor reading updated.', sensor: existing });
  }
  const newSensor = { sensorId, type, village: village || 'Unknown', district: district || 'Unknown', readings: { value, unit: unit || 'unit', timestamp: new Date() }, batteryLevel: 100, status: 'active' };
  sensorData.push(newSensor);
  res.status(201).json({ message: 'Sensor registered and data saved.', sensor: newSensor });
});

// @route   GET /api/iot/dashboard
// @desc    Aggregated IoT data for dashboards
router.get('/dashboard', (req, res) => {
  const moisture = sensorData.filter(s => s.type === 'soil_moisture').map(s => s.readings.value);
  const waterLevels = sensorData.filter(s => s.type === 'water_level').map(s => s.readings.value);
  const rainfall = sensorData.filter(s => s.type === 'rainfall').map(s => s.readings.value);
  
  // Find the latest water_health reading
  const waterHealthSensors = sensorData.filter(s => s.type === 'water_health');
  let latestPH = 7.0;
  let latestTemp = 25;
  if (waterHealthSensors.length > 0) {
    const latest = waterHealthSensors[waterHealthSensors.length - 1];
    latestPH = latest.readings.ph;
    latestTemp = latest.readings.temp;
  }

  const avg = arr => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

  res.json({
    averageSoilMoisture: `${avg(moisture)}%`,
    averageWaterLevel: `${avg(waterLevels)} cm`,
    averageRainfall: `${avg(rainfall)} mm`,
    waterPH: `${latestPH}`,
    waterTemp: `${latestTemp} °C`,
    totalActiveSensors: sensorData.filter(s => s.status === 'active').length,
    lastUpdated: new Date(),
  });
});

module.exports = router;
