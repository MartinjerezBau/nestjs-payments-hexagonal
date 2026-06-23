import { PaymentStatus } from '../enums/payment-status.enum';

export class Payment {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly status: PaymentStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  isCompleted(): boolean {
    return this.status === PaymentStatus.COMPLETED;
  }

  isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }
}
