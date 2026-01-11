const express = require('express');
const router = express.Router();

const favorite_gif = require('../controllers/gif_favorite/gif_favorite.controller');

router.post('/createFavGif', favorite_gif.CreateGifFavorite);
router.get('/allFavGif', favorite_gif.AllGifFavorite);
router.get('/findCodeFavGif', favorite_gif.FindByCodeGifFavorite);
router.put('/deleteFavoriteGif', favorite_gif.DeleteByCodeGifFavorite);

module.exports = router;