var express = require("express");
var router = express.Router();
const logger = require("../utils/logger/logger");
const helper = require("../utils/helper/helper");
const { userSchema } = require("../validation/userValidation");
const { translateJoiError } = require("../utils/error/joiError");
const UserService = require("../services/UserService");


router.post("/", async (req, res) => {
  try {
    helper.checkRequiredParams(req, ['string', 'numero', 'booleano']);
    const { error } = userSchema.validate(req.body);
    if (error) throw error;
    const response = await UserService.test(req.body);
    res.send(response);
  } catch (err) {
    logger.error("err:", err);
    if (err.isJoi) {
      return res.status(400).send({ message: translateJoiError(err) });
    }
    if (typeof ErrorResponse !== 'undefined' && err instanceof ErrorResponse) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send('Erro não tratado');
  }
});


module.exports = router;


