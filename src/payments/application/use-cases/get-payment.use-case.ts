import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PAYMENT_REPOSITORY_PORT,
  PaymentRepositoryPort,
} from '../ports/payment.repository.port';
import { PaymentResponseDto } from '../dtos/payment-response.dto';

@Injectable()
export class GetPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY_PORT)
    private readonly paymentRepository: PaymentRepositoryPort,
  ) {}

  async execute(id: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new NotFoundException(`Payment with id "${id}" not found`);
    }
    return PaymentResponseDto.fromEntity(payment);
  }

  async findAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentRepository.findAll();
    return payments.map(PaymentResponseDto.fromEntity);
  }
}
