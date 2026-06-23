import { Module } from '@nestjs/common';
import { PaymentController } from './infrastructure/controllers/payment.controller';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { GetPaymentUseCase } from './application/use-cases/get-payment.use-case';
import { PaymentRepositoryAdapter } from './infrastructure/adapters/payment.repository.adapter';
import { PAYMENT_REPOSITORY_PORT } from './application/ports/payment.repository.port';

@Module({
  controllers: [PaymentController],
  providers: [
    CreatePaymentUseCase,
    GetPaymentUseCase,
    {
      provide: PAYMENT_REPOSITORY_PORT,
      useClass: PaymentRepositoryAdapter,
    },
  ],
  exports: [CreatePaymentUseCase, GetPaymentUseCase],
})
export class PaymentsModule {}
