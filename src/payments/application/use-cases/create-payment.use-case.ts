import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import {
  PAYMENT_REPOSITORY_PORT,
  PaymentRepositoryPort,
} from '../ports/payment.repository.port';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentResponseDto } from '../dtos/payment-response.dto';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY_PORT)
    private readonly paymentRepository: PaymentRepositoryPort,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const now = new Date();
    const payment = new Payment(
      randomUUID(),
      dto.orderId,
      dto.amount,
      dto.currency,
      PaymentStatus.PENDING,
      now,
      now,
    );

    const saved = await this.paymentRepository.save(payment);
    return PaymentResponseDto.fromEntity(saved);
  }
}
