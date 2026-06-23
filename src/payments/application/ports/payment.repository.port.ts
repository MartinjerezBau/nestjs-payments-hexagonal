import { Payment } from '../../domain/entities/payment.entity';

export const PAYMENT_REPOSITORY_PORT = 'PAYMENT_REPOSITORY_PORT';

export interface PaymentRepositoryPort {
  save(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  findByOrderId(orderId: string): Promise<Payment | null>;
}
