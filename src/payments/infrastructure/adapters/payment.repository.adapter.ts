import { Injectable } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentRepositoryPort } from '../../application/ports/payment.repository.port';

@Injectable()
export class PaymentRepositoryAdapter implements PaymentRepositoryPort {
  private readonly store: Map<string, Payment> = new Map();

  async save(payment: Payment): Promise<Payment> {
    this.store.set(payment.id, payment);
    return payment;
  }

  async findById(id: string): Promise<Payment | null> {
    return this.store.get(id) ?? null;
  }

  async findAll(): Promise<Payment[]> {
    return Array.from(this.store.values());
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    for (const payment of this.store.values()) {
      if (payment.orderId === orderId) return payment;
    }
    return null;
  }
}
