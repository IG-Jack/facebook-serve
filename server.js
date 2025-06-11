const express = require('express');
const axios = require('axios');

const app = express();

const ACCESS_TOKEN = 'EACG70XZCyJtABOxz9rLVZBOolMvfH5s57jt6nvIxktwPj8XIKGSiDtSZBT0ulUdzJHU2fqkzYXbPbXZBxMTxApREZCEtFqzmSRM6NcuCMfAB3MMcpyV1FA0ja0XqASMH1G4DzSBWM0Ak91zq21eFbVRgZBi8DZCHTEyAWLuUuSMNXZAsCEZADWQV6hmZCarp0wZBYoWFqt43cXAtHcZB5NTGahDStmaD86Vc0Ne0';
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
