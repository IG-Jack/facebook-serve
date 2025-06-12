const express = require('express');
const axios = require('axios');

const app = express();

const ACCESS_TOKEN = 'EACG70XZCyJtABOZB4dGUvggqYlM4xpMyqLY96pgNchsEk0ZCgLiVAn4zpUnwXNg9PnVBKXBa9HFbZCLv3m2xe30di8u4ZAv83igiZCCv2RVbTKeBVSC62EadZBDDthpUNX63wZAZCuD4AqWScelfSwv1ZAVMmcnFyjvq677x0JS5Gs5gKg9VmWGPVTKJ6q7hcTXBvl1jSkFt2u';
const PAGE_ID = '689691177555236';

app.get('/', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v15.0/${PAGE_ID}/posts?access_token=${ACCESS_TOKEN}&limit=1`;
    const response = await axios.get(url);
    const posts = response.data.data;

    if (posts && posts.length > 0) {
      const latestPostId = posts[0].id;
      const postUrl = `https://www.facebook.com/${latestPostId}`;
      return res.redirect(postUrl);
    } else {
      return res.status(404).send('No se encontró la publicación más reciente');
    }
  } catch (error) {
    console.error('Error al obtener publicación:', error.message);
    return res.status(500).send('Error al obtener la publicación');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
