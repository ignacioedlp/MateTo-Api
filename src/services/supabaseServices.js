const { createClient } = require('@supabase/supabase-js');
const moment = require('moment');

const SupabaseService = {
  async uploadImagesProduct(images, userID) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const imagesUrls = [];

    for (const image of images) {
      //Creo el nombre de la imagen en base al id del usuario y el nombre de la imagen
      const imageFullName = `vendors/${userID}/${moment().format(`DDMMYYYYmmss`)}_${image.name}`;


      // for (const image of images) {
      const { data, error } = await supabase.storage.from('cms_mateto').upload(`${imageFullName}`, image.data)


      if (error) {
        throw error;
      }


      imagesUrls.push(
        `${process.env.SUPABASE_BUCKET}/${imageFullName}`
      );
    }

    return imagesUrls;

  },

  async uploadImageProfile(images, userID) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const imagesUrls = [];

    for (const image of images) {
      //Creo el nombre de la imagen en base al id del usuario y el nombre de la imagen
      const imageFullName = `users/${userID}_${moment().format(`DDMMYYYYmmss`)}_${image.name}`;


      // for (const image of images) {
      const { data, error } = await supabase.storage.from('cms_mateto').upload(`${imageFullName}`, image.data)


      if (error) {
        throw error;
      }


      imagesUrls.push(
        `${process.env.SUPABASE_BUCKET}/${imageFullName}`
      );
    }

    return imagesUrls;

  },

  async deleteImages(imagesUrls) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    for (const imageUrl of imagesUrls) {
      const { data, error } = await supabase.storage.from('cms_mateto').remove([imageUrl]);

      if (error) {
        throw error;
      }
    }
  }
}

module.exports = SupabaseService;