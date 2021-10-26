const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const app = express();

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');


app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(session({secret: 'Clave secreta',
  resave: false,
  saveUninitialized: false
}));

app.use(cookieParser());

app.use(userLoggedMiddleware);

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cors = require('cors');

app.use(cors())

app.listen(process.env.PORT || 3001, () => {
console.log("Servidor corriendo");
});

const rutasMain = require('./src/routes/main');
const rutasProductos = require('./src/routes/productos');
const rutasUsuarios = require('./src/routes/usuarios');
const rutasCarrito = require('./src/routes/carrito');
const rutasArtista = require('./src/routes/artistas');
const rutasApi = require('./src/routes/rutasApi');


app.use('/', rutasMain);

app.use('/galeria', rutasProductos);

app.use('/carrito', rutasCarrito);

app.use('/user', rutasUsuarios); 

app.use('/artist', rutasArtista);

app.use('/api', rutasApi)
