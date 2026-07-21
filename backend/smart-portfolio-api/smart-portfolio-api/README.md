# Portfolio Backend — Spring Boot

Standalone Java 21 + Spring Boot 3.5 API that powers the portfolio's AI chat and contact endpoints. The React frontend proxies `/api/*` calls here in local development; in production, deploy this service and point the frontend's `VITE_API_BASE_URL` at it.

## Requirements

- Java 21+
- Maven 3.9+

## Run locally

```bash
cd backend
./mvnw spring-boot:run
# or: mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

## Endpoints

| Method | Path              | Description                                     |
| ------ | ----------------- | ----------------------------------------------- |
| GET    | `/api/health`     | Health check                                    |
| POST   | `/api/chat`       | AI chatbot — knowledge-base backed Q&A         |
| POST   | `/api/contact`    | Contact form submission                         |
| GET    | `/api/profile`    | Public profile data                             |

### Chat request

```json
POST /api/chat
{ "message": "What are your top skills?" }
```

Response:

```json
{ "reply": "..." }
```

## Configuration

Set an OpenAI-compatible key to enable LLM-backed replies (falls back to a rule-based knowledge base when absent):

```
OPENAI_API_KEY=sk-...
```

CORS defaults to `http://localhost:3000,http://localhost:5173`. Override via `app.cors.origins` in `application.yml`.

## Build

```bash
./mvnw clean package
java -jar target/portfolio-backend-1.0.0.jar
```

## Docker

```bash
docker build -t portfolio-backend .
docker run -p 8080:8080 portfolio-backend
```