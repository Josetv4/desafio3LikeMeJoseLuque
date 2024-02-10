import pkg from 'pg';

const { Pool } = pkg;
//REVISAR ARCHIVO README, PARA CUALQUIER DUDA
// Base de datos y tabla que debe ser creada en PostgreSQL
// CREATE DATABASE likeme;
// CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),descripcion VARCHAR(255), likes INT);

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '110223',
    database: 'likeme',
    allowExitOnIdle: true
})


const verPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts');

    return rows;
};

const agregarPost = async (post) => {
    const { titulo, img, descripcion } = post

    if (!titulo?.trim() || !img?.trim() || !descripcion?.trim()) {
        throw { code: '400' };
    }

    const consulta = 'INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *';
    const values = [titulo, img, descripcion, 0];
    const result = await pool.query(consulta, values);

    return result.rows[0];
};

export { verPosts, agregarPost };
