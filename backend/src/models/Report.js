// Report Schema for Firebase Firestore
// Collection: "reports"
// Each document represents a water issue report submitted by a user

const ReportSchema = {
  reportId: 'string',       // Auto-generated Firestore ID
  userId: 'string',         // UID of the user who submitted
  category: 'contamination | shortage | infrastructure | flooding | other',
  description: 'string',
  photoUrl: 'string',       // Firebase Storage URL
  location: {
    lat: 'number',
    lng: 'number',
    village: 'string',
    district: 'string',
  },
  status: 'pending | acknowledged | resolved',
  upvotes: 'number',
  createdAt: 'timestamp',
  resolvedAt: 'timestamp | null',
};

module.exports = ReportSchema;
