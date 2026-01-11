const validateToken = require("../middleware/validateToken.middleware");
module.exports = function (app) {
  app.use("/api/auth", require("./auth.route"));
  app.use("/api/favoriteGifs", validateToken, require("./gif_favorite.route"));
  //app.use('/api/user', require('./User.routes'))
};
