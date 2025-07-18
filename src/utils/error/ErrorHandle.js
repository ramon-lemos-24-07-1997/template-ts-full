class ErrorResponse extends Error {
  constructor(message = 'Erro interno', statusCode = 500, success = false) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.success = success;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;