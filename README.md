# NestJS Payments — Arquitectura Hexagonal

Módulo de pagos construido con NestJS siguiendo **Arquitectura Hexagonal (Ports & Adapters)**.

## Capas

| Capa | Responsabilidad |
|---|---|
| **Domain** | Entidades puras, enums, reglas de negocio |
| **Application** | DTOs, puertos (interfaces), use cases |
| **Infrastructure** | Controller, Guard, Interceptor, Adaptador de repositorio |

## Características

- ✅ Arquitectura Hexagonal (Ports & Adapters)
- ✅ DTOs con validación (`class-validator`)
- ✅ Guard de autenticación por API Key
- ✅ Interceptor de logging
- ✅ Documentación Swagger (`@nestjs/swagger`)
- ✅ Tests unitarios con Jest

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run start:dev
```

## Swagger

Disponible en: `http://localhost:3000/api`

## Tests

```bash
npm run test
npm run test:cov
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PAYMENT_API_KEY` | API Key requerida en el header `x-api-key` |

## Estructura del proyecto

```
src/
├── main.ts
├── app.module.ts
└── payments/
    ├── application/
    │   ├── dtos/
    │   │   ├── create-payment.dto.ts
    │   │   └── payment-response.dto.ts
    │   ├── ports/
    │   │   └── payment.repository.port.ts
    │   └── use-cases/
    │       ├── create-payment.use-case.ts
    │       └── get-payment.use-case.ts
    ├── domain/
    │   ├── entities/
    │   │   └── payment.entity.ts
    │   └── enums/
    │       └── payment-status.enum.ts
    ├── infrastructure/
    │   ├── adapters/
    │   │   └── payment.repository.adapter.ts
    │   ├── guards/
    │   │   └── payment-auth.guard.ts
    │   ├── interceptors/
    │   │   └── payment-logging.interceptor.ts
    │   └── controllers/
    │       └── payment.controller.ts
    ├── payments.module.ts
    └── payments.spec.ts
```
