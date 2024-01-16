import { createClient } from '@supabase/supabase-js';
import moment from 'moment';

const SupabaseService = {
  async uploadImagesProduct(images, userID) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const imagesUrls = [];

    images.forEach(async (image) => {
      const imageFullName = `vendors/${userID}/${moment().format('DDMMYYYYmmss')}_${image.name}`;

      const { error } = await supabase.storage.from('cms_mateto').upload(`${imageFullName}`, image.data);

      if (error) {
        throw error;
      }

      imagesUrls.push(`${process.env.SUPABASE_BUCKET}/${imageFullName}`);
    });

    return imagesUrls;
  },

  async uploadImageProfile(image, userID) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    const imageFullName = `users/${userID}_${moment().format('DDMMYYYYmmss')}_${image.name}`;

    const { error } = await supabase.storage.from('cms_mateto').upload(`${imageFullName}`, image.data);

    if (error) {
      throw error;
    }

    return `${process.env.SUPABASE_BUCKET}/${imageFullName}`;
  },

  async deleteImages(imagesUrls) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    imagesUrls.forEach(async (imageUrl) => {
      const { error } = await supabase.storage.from('cms_mateto').remove([imageUrl]);

      if (error) {
        throw error;
      }
    });
  },
};

export default SupabaseService;
