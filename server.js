const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));

// Configuración de acceso
const ACCESS_TOKEN = 'EACG70XZCyJtABOZB4dGUvggqYlM4xpMyqLY96pgNchsEk0ZCgLiVAn4zpUnwXNg9PnVBKXBa9HFbZCLv3m2xe30di8u4ZAv83igiZCCv2RVbTKeBVSC62EadZBDDthpUNX63wZAZCuD4AqWScelfSwv1ZAVMmcnFyjvq677x0JS5Gs5gKg9VmWGPVTKJ6q7hcTXBvl1jSkFt2u';
const PAGE_ID = '689691177555236';

// Ruta principal
app.get('/', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v15.0/${PAGE_ID}/posts?access_token=${ACCESS_TOKEN}&limit=1`;
    const response = await axios.get(url);
    const posts = response.data.data;

    if (posts && posts.length > 0) {
      const latestPostId = posts[0].id; // Formato: PAGEID_POSTID
      const postIdOnly = latestPostId.split('_')[1]; // Solo POSTID
      const postUrl = `https://www.facebook.com/${PAGE_ID}/posts/${postIdOnly}`;

      // Redirección con respaldo HTML + JS + meta-refresh
      return res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Redireccionando...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="refresh" content="1; url=${postUrl}" />
        </head>
        <body style="text-align: center; font-family: Arial; padding-top: 50px;">
          <h2>Redireccionando a la última publicación de Facebook...</h2>
          <p>Si no se redirige automáticamente, <a href="${postUrl}">haz clic aquí</a>.</p>
          <script>
            setTimeout(() => { window.location.href = "${postUrl}"; }, 1000);
          </script>
        </body>
        </html>
      `);
    } else {
      return res.status(404).send('No se encontró la publicación más reciente.');
    }
  } catch (error) {
    console.error('Error al obtener publicación:', error.message);
    return res.status(500).send(`Error al obtener la publicación: ${error.message}`);
  }
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
