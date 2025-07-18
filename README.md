## Template Node.js com Docker, Redis e RabbitMQ

### Descrição
Projeto base Node.js com integração a Redis e RabbitMQ, pronto para uso com Docker Compose.

### Serviços
- **app**: Aplicação Node.js
- **redis**: Banco de dados em memória
- **rabbitmq**: Mensageria com interface de gerenciamento
- **socket**: Comunicação em tempo real via WebSocket (handlers, emits, autenticação)

### Como rodar
1. Clone o repositório
2. Configure o arquivo `.env` conforme exemplo abaixo
3. Execute:
   ```sh
   docker-compose up --build -d
   ```

### Exemplo de .env
```env
NODE_ENV=dev

# RabbitMQ
RABBITMQ_URL=amqp://user:password@rabbitmq:5672/  

# Redis
# Use REDIS_HOST=localhost se rodar o app fora do Docker Compose
# Use REDIS_HOST=redis se rodar toda a stack pelo Docker Compose
REDIS_HOST=redis
REDIS_PORT=6379

# Postgres (ajuste conforme seu ambiente)
DATABASE_URL="postgresql://user:password@localhost:5432/seubanco?schema=public"
```

> **Dica:**
> - Se rodar o app localmente (fora do Docker), use `REDIS_HOST=localhost`.
> - Se rodar tudo pelo Docker Compose, use `REDIS_HOST=redis`.

### Acesso aos serviços
- App: http://localhost:4000
- RabbitMQ Management: http://localhost:15672 (user: user, senha: password)


### Estrutura principal
- `src/app.js`, `bin/www`: Inicialização da aplicação
- `infra/database/`: Configuração do banco
- `infra/rabbitmq/`: Configuração do RabbitMQ
- `infra/socket/`: Implementação de WebSocket, incluindo autenticação, handlers, emits e listeners
- `prisma/`: ORM Prisma (schema, client, migrations)
- `middlewares/`, `services/`, `routes/`: Lógica de negócio


### Logs
- `docker-compose logs -f app` 
--
Sinta-se à vontade para customizar conforme sua necessidade.
