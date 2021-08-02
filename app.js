const express = require('express');
const path = require('path');

const app = express();

const rutasMain = require('./src/routes/main');
const rutasProductos = require('./src/routes/productos');
const rutasUsuarios = require('./src/routes/usuarios');
const rutasCarrito = require('./src/routes/carrito');

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());



const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use('/', rutasMain);

app.use('/galeria', rutasProductos);

app.use('/carrito', rutasCarrito);

app.use('/user', rutasUsuarios);  



app.listen(process.env.PORT || 3000, () => {
console.log("Servidor corriendo");
});
