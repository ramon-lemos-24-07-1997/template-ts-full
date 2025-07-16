const requiredEnv = [
  "NODE_ENV",
];


function validateEnv(vars) {
  const missing = vars.filter((v) => !process.env[v]);
  if (missing.length) {
    throw new Error(`Variáveis de ambiente faltando: ${missing.join(", ")}`);
  }
}

validateEnv(requiredEnv);