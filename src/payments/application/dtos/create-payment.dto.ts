import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID de la orden asociada al pago',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: 'Monto del pago',
    example: 1500.0,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'Moneda del pago (ISO 4217)',
    example: 'ARS',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  currency: string;
}
