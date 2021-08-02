const express = require('express');
const router = express.Router();

const carritoController = require('../controllers/carritoController');

router.get('/', carritoController.carrito);

router.get('/agregar_producto', carritoController.agregarAlCarrito);

router.get('/finalizar_compra', carritoController.finalizarCompra);

module.exports= router;