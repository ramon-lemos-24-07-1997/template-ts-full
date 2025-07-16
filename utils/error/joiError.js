// Função utilitária para traduzir mensagens do Joi para português de forma modular
const joiTranslations = {
  'string.base':      (d) => `O campo ${d.context.label} deve ser um texto`,
  'string.empty':     (d) => `O campo ${d.context.label} não pode ser vazio`,
  'string.email':     (d) => `O campo ${d.context.label} deve ser um e-mail válido`,
  'any.required':     (d) => `O campo ${d.context.label} é obrigatório`,
  'number.base':      (d) => `O campo ${d.context.label} deve ser um número`,
  'number.integer':   (d) => `O campo ${d.context.label} deve ser um número inteiro`,
  'boolean.base':     (d) => `O campo ${d.context.label} deve ser verdadeiro ou falso`,
  'string.min':       (d) => `O campo ${d.context.label} deve ter no mínimo ${d.context.limit} caracteres`,
  'string.max':       (d) => `O campo ${d.context.label} deve ter no máximo ${d.context.limit} caracteres`,
  'number.min':       (d) => `O campo ${d.context.label} deve ser no mínimo ${d.context.limit}`,
  'number.max':       (d) => `O campo ${d.context.label} deve ser no máximo ${d.context.limit}`,
};

function translateJoiError(error) {
  if (!error || !error.details || error.details.length === 0) return '';
  const d = error.details[0];
  if (joiTranslations[d.type]) {
    return joiTranslations[d.type](d);
  }
  return d.message;
}

module.exports = { translateJoiError };