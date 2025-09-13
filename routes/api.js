import express from 'express';
import Insight from '../models/Insight.js';

const router = express.Router();

//  Filtered data endpoint
router.get('/data', async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      country,
      city
    } = req.query;

    // Build dynamic query
    const query = {};

    // Add filters only if they are provided and not empty
    if (end_year && end_year.trim()) {
      query.end_year = end_year;
    }
    if (topic && topic.trim()) {
      query.topic = { $regex: topic, $options: 'i' };
    }
    if (sector && sector.trim()) {
      query.sector = { $regex: sector, $options: 'i' };
    }
    if (region && region.trim()) {
      query.region = { $regex: region, $options: 'i' };
    }
    if (pestle && pestle.trim()) {
      query.pestle = { $regex: pestle, $options: 'i' };
    }
    if (source && source.trim()) {
      query.source = { $regex: source, $options: 'i' };
    }
    if (country && country.trim()) {
      query.country = { $regex: country, $options: 'i' };
    }

    const data = await Insight.find(query).lean();
    
    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message
    });
  }
});

//Filter options endpoint
router.get('/filters', async (req, res) => {
  try {
    const [topics, sectors, regions, pestles, sources, countries] = await Promise.all([
      Insight.distinct('topic', { topic: { $ne: '', $exists: true } }),
      Insight.distinct('sector', { sector: { $ne: '', $exists: true } }),
      Insight.distinct('region', { region: { $ne: '', $exists: true } }),
      Insight.distinct('pestle', { pestle: { $ne: '', $exists: true } }),
      Insight.distinct('source', { source: { $ne: '', $exists: true } }),
      Insight.distinct('country', { country: { $ne: '', $exists: true } })
    ]);

    res.json({
      success: true,
      filters: {
        topics: topics.sort(),
        sectors: sectors.sort(),
        regions: regions.sort(),
        pestles: pestles.sort(),
        sources: sources.sort(),
        countries: countries.sort()
      }
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
});

//- Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalInsights = await Insight.countDocuments();
    const avgIntensity = await Insight.aggregate([
      { $group: { _id: null, avgIntensity: { $avg: '$intensity' } } }
    ]);
    const avgRelevance = await Insight.aggregate([
      { $group: { _id: null, avgRelevance: { $avg: '$relevance' } } }
    ]);
    const avgLikelihood = await Insight.aggregate([
      { $group: { _id: null, avgLikelihood: { $avg: '$likelihood' } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalInsights,
        avgIntensity: avgIntensity[0]?.avgIntensity || 0,
        avgRelevance: avgRelevance[0]?.avgRelevance || 0,
        avgLikelihood: avgLikelihood[0]?.avgLikelihood || 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

export default router;