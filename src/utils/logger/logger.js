const winston = require("winston");

// Configuração do formato JSON para logs de arquivo
const jsonLogFileFormat = winston.format.combine(
  winston.format.errors({ stack: true }), // Inclui stack trace para erros
  winston.format.timestamp(),            // Adiciona timestamp ao log
  winston.format.prettyPrint()           // Exibe o log em formato JSON legível
);

// Determina o ambiente (prod ou dev)
let env = "dev"; // Ambiente padrão é desenvolvimento
if (process.env && process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
}
console.log(`Ambiente: ${env}`);
// Define o nível de log com base no ambiente
const level = env === "prod" ? "info" : "debug";

// Cria o logger com transportes configurados
const logger = winston.createLogger({
  level, // Nível de log (info para produção, debug para desenvolvimento)
  format: jsonLogFileFormat, // Formato do log (JSON estruturado)
  transports: [
    // Transporte para console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.errors({ stack: true }), // Inclui stack trace
        winston.format.colorize(),             // Adiciona cores para melhor leitura no terminal
        winston.format.printf(({ level, message, timestamp, stack }) => {
          if (stack) {
            // Log com stack trace
            return `${level}: ${timestamp} ${message} - ${stack}`;
          }
          // Log sem stack trace
          return `${level}: ${timestamp} ${message}`;
        })
      )
    }),

    // Transporte para arquivo
    new winston.transports.File({
      filename: "./logs/app.logg", // Caminho para o arquivo de log
      level: "error",             // Apenas logs de nível "error"
      handleExceptions: true,     // Captura exceções não tratadas
      maxsize: 10485760,          // Tamanho máximo do arquivo (10 MB)
      maxFiles: 10                // Quantidade máxima de arquivos de log
    }),

    // Transporte HTTP (opcional)
    new winston.transports.Http({
      level: "warn",               // Apenas logs de nível "warn" ou superiores
      format: winston.format.json() // Envia os logs em formato JSON
    })
  ]
});

module.exports = logger;