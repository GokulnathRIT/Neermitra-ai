// CropRecommendation Schema for Firebase Firestore
// Collection: "crop_recommendations"

const CropRecommendationSchema = {
  recommendationId: 'string',
  userId: 'string',
  inputs: {
    landSizeAcres: 'number',
    soilType: 'loamy | clay | sandy | black',
    waterAvailability: 'high | medium | low',
    season: 'kharif | rabi | zaid',
  },
  recommendation: {
    primaryCrop: 'string',
    alternativeCrops: ['string'],
    waterRequired: 'string',
    estimatedProfit: 'string',
    reasoning: 'string',
  },
  createdAt: 'timestamp',
};

module.exports = CropRecommendationSchema;
