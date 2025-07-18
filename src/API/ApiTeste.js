const axios = require('axios');
const ErrorResponse = require('../utils/error/ErrorHandle');

const BASE_URL = process.env.TESTE_URL || 'http://localhost:3000/api/teste';

const ApiTeste = async (path, payload, method = 'POST',) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${path}`, 
      method: method,
      data: payload
    });
    return response.data; 
  } catch (err) {
    throw new ErrorResponse(err);
  }
}

module.exports = ApiTeste;
