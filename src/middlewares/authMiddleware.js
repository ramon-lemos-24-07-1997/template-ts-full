const logger = require("../utils/logger/logger");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" }); 
    if (token !== process.env.API_SECRET_KEY) {
        const decoded = jwt.verify(token, process.env.SECRET);
        // Exemplo de estrutura do token decodificado
        // {
        //   "id": "123",
        //   "email": "user@example.com",
        //   "nome": "Nome do Usuário",
        //   "org": "Organização",
        //   "tipo": "Tipo de Usuário",
        //   "escola": "Escola"
        // } = decoded
        // Aqui você pode definir o usuário no objeto req para uso posterior
        // Exemplo:
        // const user = {
        //   id: decoded.id,
        //   email: decoded.email,
        //   nome: decoded.nome
        // }
        // E então, você pode fazer algo como:
        // req.user = user;
        return next();
    }
    return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    logger.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports =  auth;