import mongoose from 'mongoose';

const localizedString = {
  en: { type: String},
  hi: { type: String },
};

const FeatureSchema = new mongoose.Schema({
  name:localizedString,
  features: localizedString,
});

export default mongoose.models.Feature || mongoose.model('Feature', FeatureSchema);

