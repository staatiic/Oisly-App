const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const facultadRoutes = require('./routes/facultadRoutes');
const negocioRoutes = require('./routes/negocioRoutes');
const menuRoutes = require('./routes/menuRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());

// ruta d prueba 
app.get("/", (req, res) => {
    res.send("pruebaa");
});


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categorias', categoriaRoutes);
app.use('/api/v1/facultades', facultadRoutes);
app.use('/api/v1/negocios', negocioRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/items', itemsRoutes);

// Prender el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening on port ${PORT} :p`);
});