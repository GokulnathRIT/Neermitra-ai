// User Schema for Firebase Firestore
// Collection: "users"
// Each document represents a registered user

const UserSchema = {
  uid: 'string',           // Firebase Auth UID
  name: 'string',
  email: 'string',
  phone: 'string',
  role: 'farmer | ngo | government',
  village: 'string',
  district: 'string',
  state: 'string',
  subscription: 'free | premium',
  badgesEarned: ['string'],
  waterPointsEarned: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
};

module.exports = UserSchema;
