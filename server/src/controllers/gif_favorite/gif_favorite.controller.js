const GifFavoriteModel = require("../../models/gifFavorite.model");

const CreateGifFavorite = async (req, res) => {
  const { body } = req;

  try {
    const findByCode = await GifFavoriteModel.findOne({
      code: body.code,
    });

    if (findByCode) {
      return res.status(409).send({
        message: "This gif is already in your favorites",
        status: false,
      });
    } else {
      const create = new GifFavoriteModel({ ...body, user: req.user._id });
      await create.save();
      return res.status(201).json({
        message: "Create favorite Gif",
        status: true,
        gif: create,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const AllGifFavorite = async (req, res) => {
  try {
    const findGifs = await GifFavoriteModel.find({
      user: req.user._id,
      state: false,
    });
    if (findGifs.length > 0) {
      return res.status(200).json({
        message: "Favorites gifs found",
        gifs: findGifs,
        status: true,
      });
    }

    return res.status(404).json({
      message: "He doesn't have any favorite gifs",
      gifs: [],
      status: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const FindByCodeGifFavorite = async (req, res) => {
  try {
    const findGif = await GifFavoriteModel.findOne({
      code: req.query.id,
      user: req.user._id,
    });
    if (findGif) {
      return res.status(200).json({
        message: "Find gifs favorites for code",
        gif: findGif,
        status: true,
      });
    }
    return res.status(404).json({
      message: `The gif with the code was not found ${req.query.id}`,
      status: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const DeleteByCodeGifFavorite = async (req, res) => {
  try {
    const findGif = await GifFavoriteModel.findOne({
      code: req.query.code,
      user: req.user._id,
    });

    if (!findGif) {
      return res.status(404).json({
        message: `The gif with the code ${req.query.code} was not found`,
        status: false,
      });
    }

    await GifFavoriteModel.findByIdAndDelete(findGif._id);

    return res.status(200).json({
      message: "Deleted gif favorite",
      gif: findGif,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  CreateGifFavorite,
  AllGifFavorite,
  FindByCodeGifFavorite,
  DeleteByCodeGifFavorite,
};
