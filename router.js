const authMiddleware = require('./middlewares/authMiddleware');
const usersRouter = require('./routes/users.js');
const indexRouter = require('./routes/index.js');


module.exports = (app) => {
  app.use('/', indexRouter);

  // Middlewares globais, todas as rotas abaixo deste middleware terão acesso a ele
  //app.use(authMiddleware);

  // Rotas
  app.use('/users', usersRouter);
};