import SeoMetadata from '../models/SeoMetadata.js';

export const getSeoByRoute = async (req, res) => {
  try {
    const { route } = req.query;
    if (!route) {
      return res.status(400).json({ success: false, message: 'Route parameter is required' });
    }

    const seoData = await SeoMetadata.findOne({ page_route: route });
    if (!seoData) {
      return res.status(404).json({ success: false, message: 'SEO data not found for this route' });
    }

    res.status(200).json({ success: true, data: seoData });
  } catch (error) {
    console.error('Error fetching SEO data by route:', error);
    res.status(500).json({ success: false, message: 'Server error fetching SEO data' });
  }
};

export const getAllSeo = async (req, res) => {
  try {
    const seoDataList = await SeoMetadata.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: seoDataList });
  } catch (error) {
    console.error('Error fetching all SEO data:', error);
    res.status(500).json({ success: false, message: 'Server error fetching SEO data' });
  }
};

export const createOrUpdateSeo = async (req, res) => {
  try {
    const {
      page_route,
      meta_title,
      meta_description,
      og_title,
      og_description,
      og_image,
      canonical_url,
      robots_meta,
    } = req.body;

    if (!page_route) {
      return res.status(400).json({ success: false, message: 'page_route is required' });
    }

    let seoData = await SeoMetadata.findOne({ page_route });

    if (seoData) {
      // Update
      seoData.meta_title = meta_title ?? seoData.meta_title;
      seoData.meta_description = meta_description ?? seoData.meta_description;
      seoData.og_title = og_title ?? seoData.og_title;
      seoData.og_description = og_description ?? seoData.og_description;
      seoData.og_image = og_image ?? seoData.og_image;
      seoData.canonical_url = canonical_url ?? seoData.canonical_url;
      seoData.robots_meta = robots_meta ?? seoData.robots_meta;
      
      await seoData.save();
      return res.status(200).json({ success: true, message: 'SEO data updated successfully', data: seoData });
    } else {
      // Create
      seoData = new SeoMetadata({
        page_route,
        meta_title,
        meta_description,
        og_title,
        og_description,
        og_image,
        canonical_url,
        robots_meta,
      });

      await seoData.save();
      return res.status(201).json({ success: true, message: 'SEO data created successfully', data: seoData });
    }
  } catch (error) {
    console.error('Error creating/updating SEO data:', error);
    res.status(500).json({ success: false, message: 'Server error updating SEO data' });
  }
};

export const deleteSeo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeo = await SeoMetadata.findByIdAndDelete(id);
    
    if (!deletedSeo) {
      return res.status(404).json({ success: false, message: 'SEO record not found' });
    }

    res.status(200).json({ success: true, message: 'SEO record deleted successfully' });
  } catch (error) {
    console.error('Error deleting SEO data:', error);
    res.status(500).json({ success: false, message: 'Server error deleting SEO data' });
  }
};
