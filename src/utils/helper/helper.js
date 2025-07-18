const validator = require("validator");
const ErrorResponse = require("../error/ErrorHandle");


const isEmailValid = (email) => {
  const isValid = validator.isEmail(email);
  if (!isValid) {
    throw new ErrorResponse("Email inválido.");
  }
  return isValid;
}

const checkRequiredParams = (req, params, key = null) => {
  const data = key ? req.body[key] : req.body; 
  if (!data || typeof data !== 'object') throw new ErrorResponse(`Parâmetro "${key}" ausente ou inválido.`); 
  const missingParams = params.filter(param => !data.hasOwnProperty(param) || data[param] === null || data[param] === '');
  if (missingParams.length > 0) throw new ErrorResponse(`Parâmetros ausentes ou vazios: ${missingParams.join(', ')}`);
};


module.exports = {
  isEmailValid,
  checkRequiredParams
};
