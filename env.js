const requiredEnv = [
  "NODE_ENV",
  "RABBITMQ_URL",
  "REDIS_HOST",
  "REDIS_PORT",
];


function validateEnv(vars) {
  const missing = vars.filter((v) => !process.env[v]);
  if (missing.length) {
    throw new Error(`Variáveis de ambiente faltando: ${missing.join(", ")}`);
  }
}

validateEnv(requiredEnv);