import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { Payment } from '../../domain/entities/payment.entity';

export class PaymentResponseDto {
  @ApiProperty({ example: 'uuid-del-pago' })
  id: string;

  @ApiProperty({ example: 'uuid-de-la-orden' })
  orderId: string;

  @ApiProperty({ example: 1500.0 })
  amount: number;

  @ApiProperty({ example: 'ARS' })
  currency: string;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING })
  status: PaymentStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromEntity(payment: Payment): PaymentResponseDto {
    const dto = new PaymentResponseDto();
    dto.id = payment.id;
    dto.orderId = payment.orderId;
    dto.amount = payment.amount;
    dto.currency = payment.currency;
    dto.status = payment.status;
    dto.createdAt = payment.createdAt;
    dto.updatedAt = payment.updatedAt;
    return dto;
  }
}
