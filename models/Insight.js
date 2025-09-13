import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
}, { timestamps: true });

// Add indexes for better query performance
insightSchema.index({ end_year: 1 });
insightSchema.index({ topic: 1 });
insightSchema.index({ sector: 1 });
insightSchema.index({ region: 1 });
insightSchema.index({ country: 1 });
insightSchema.index({ pestle: 1 });
insightSchema.index({ source: 1 });

export default mongoose.model('Insight', insightSchema);