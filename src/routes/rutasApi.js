const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


router.get ('/users', apiController.users);

router.get ('/users/lastuser', apiController.lastUser);

router.get ('/users/:id', apiController.userId);

router.get ('/artists', apiController.artists);

router.get ('/artists/lastartist', apiController.lastArtist);

router.get ('/artists/:id', apiController.artistId);

router.get('/allproducts', apiController.allProducts);

router.get('/lastproduct', apiController.lastProduct);

router.get('/product/:id', apiController.productId);

router.get('/allcategories', apiController.allCategories);



module.exports = router;