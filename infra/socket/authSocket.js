const { verify } = require("jsonwebtoken");
const ErrorResponse = require("../../utils/error/ErrorHandle");

const authSocket = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new ErrorResponse("Token não fornecido."));
    }

    const decoded = verify(token, process.env.SECRET);
    if (!decoded) {
      return next(new ErrorResponse("Token inválido."));
    }
    // Exemplo de estrutura do token decodificado para socket
    // socket.data.user = {
    //   id: decoded.id,
    //   nome: decoded.nome,
    //   email: decoded.email,
    //   org: decoded.org,
    // };

    next(); 
  } catch (error) {
    next(new ErrorResponse("Erro na autenticação do socket."));
  }
};

module.exports = { authSocket };