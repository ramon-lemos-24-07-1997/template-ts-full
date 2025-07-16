// Valida variáveis de ambiente
require('./env.js');

// Importa dependências principais
var express = require('express'); // Framework web
var path = require('path'); // Utilitário de caminhos
var cookieParser = require('cookie-parser'); // Parser de cookies
var bodyParser = require("body-parser"); // Parser de corpo de requisições
var cors = require('cors'); // Middleware de CORS
var logger = require('morgan'); // Middleware de logging
const { RateLimiterMemory } = require('rate-limiter-flexible'); // Limite de requisições
const helmet = require('helmet'); // Segurança HTTP

// Inicializa a aplicação Express
var app = express();

// Adiciona headers de segurança HTTP
app.use(helmet());

// Configura e ativa a documentação Swagger
require('./swagger')(app);

// Configuração de limite de requisições por IP
const rateLimiter = new RateLimiterMemory({
  points: 15, // Máximo de 15 requisições
  duration: 1, // Por segundo
  blockDuration: 15, // Bloqueia por 15 segundos se exceder
});

// Middlewares globais
app.use(cors()); // Libera CORS
app.use(logger("dev")); // Log de requisições
app.use(cookieParser()); // Habilita cookies
app.use(bodyParser.json({ limit: "50mb" })); // JSON grande
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Formulários grandes
app.use(express.static(path.join(__dirname, "public"))); // Arquivos estáticos

// Middleware para limitar requisições por IP
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    console.log(new Date(), "Muitas requisições, tente novamente em breve");
    res.status(429).send();
  }
});

// Importa e aplica rotas
require('./router.js')(app);

// Loga início do servidor
console.log(new Date(), "Servidor iniciado na porta", process.env.PORT || 4000);

// Exporta o app para uso externo
module.exports = app;


