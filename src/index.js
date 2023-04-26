
/* ----------------------------- antigua manera ----------------------------- */
//const express = require('express')
/* ------------------------------ nueva manera ------------------------------ */
import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import {pool} from './db.js'
import indexRoutes from './routes/index.js'

const app = express()
/* ------------------ constante para obtener ruta absoluta ------------------ */
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.get('/ping', async (req, res) => {
   const [result] = await pool.query('SELECT "pong" AS result')
   res.json(result[0])
   });

app.get('/empleados', (req, res) => res.send('Obteniendo empleados'))
app.post('/empleados', (req, res) => res.send('creando empleados'))
app.put('/empleados', (req, res) => res.send('Actualizando empleados'))
app.delete('/empleados', (req, res) => res.send('eliminando empleados'))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(indexRoutes)
app.use(express.static(join(__dirname, 'public')))
// app.use(express.static(join(__dirname, 'js')))

// process.env es una variable de entorno del sistema que entrega el puerto
app.listen(process.env.PORT || 3001)
console.log('Server listening on port', process.env.PORT || 3001)

