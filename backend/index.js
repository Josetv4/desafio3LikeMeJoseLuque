import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleErrors } from './database/errors.js';
import { agregarPost, verPosts } from './database/connection.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("servidor listo en http://localhost:" + PORT);
});

// GET
app.get('/posts', async (req, res) => {
    try {
        const result = await verPosts();
        return res.status(200).json({ ok: true, message: 'Posts registrados', result });
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});

// POST
app.post('/posts', async (req, res) => {
    const post = {
        titulo: req.body.titulo,
        img: req.body.url,
        descripcion: req.body.descripcion
    };

    try {
        const result = await agregarPost(post);
        return res.status(201).json({ ok: true, message: 'Post agregado con exito', result });
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});

// GET Mensaje para rutas no incluidas
app.use('*', (req, res) => {
    res.json({ ok: false, result: '404 Pagina no Encontrada' });
});
