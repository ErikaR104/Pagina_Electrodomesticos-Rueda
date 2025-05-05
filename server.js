require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


connection.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Ruta registro
app.post('/registro', (req, res) => {
  const { nombre, email } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
  connection.query(sql, [nombre, email], (err, result) => {
    if (err) throw err;
    console.log('Usuario registrado:', result.insertId);
    res.redirect('/');
  });
});

// Ruta checkout
app.post('/checkout', (req, res) => {
  const { producto } = req.body;
  const sql = 'INSERT INTO carrito (producto) VALUES (?)';
  connection.query(sql, [producto], (err, result) => {
    if (err) throw err;
    console.log('Producto agregado al carrito:', result.insertId);
    res.redirect('/checkout');
  });
});

// Rutas básicas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(__dirname, 'public', 'registro.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(__dirname, 'public', 'checkout.html')));
app.get('/neveralg', (req, res) => res.sendFile(path.join(__dirname, 'public', 'neveralg.html')));
app.get('/lavadorasms', (req, res) => res.sendFile(path.join(__dirname, 'public', 'lavadorasms.html')));
app.get('/estufax', (req, res) => res.sendFile(path.join(__dirname, 'public', 'estufax.html')));

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});

const port = process.env.PORT || 3000;
