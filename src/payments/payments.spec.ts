import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { GetPaymentUseCase } from './application/use-cases/get-payment.use-case';
import { PAYMENT_REPOSITORY_PORT } from './application/ports/payment.repository.port';
import { PaymentStatus } from './domain/enums/payment-status.enum';
import { Payment } from './domain/entities/payment.entity';

const mockPayment = new Payment(
  'test-uuid',
  'order-uuid',
  1500,
  'ARS',
  PaymentStatus.PENDING,
  new Date(),
  new Date(),
);

const mockRepository = {
  save: jest.fn().mockResolvedValue(mockPayment),
  findById: jest.fn().mockResolvedValue(mockPayment),
  findAll: jest.fn().mockResolvedValue([mockPayment]),
  findByOrderId: jest.fn().mockResolvedValue(mockPayment),
};

describe('PaymentsModule — Use Cases', () => {
  let createUseCase: CreatePaymentUseCase;
  let getUseCase: GetPaymentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePaymentUseCase,
        GetPaymentUseCase,
        { provide: PAYMENT_REPOSITORY_PORT, useValue: mockRepository },
      ],
    }).compile();

    createUseCase = module.get(CreatePaymentUseCase);
    getUseCase = module.get(GetPaymentUseCase);
  });

  afterEach(() => jest.clearAllMocks());

  describe('CreatePaymentUseCase', () => {
    it('debería crear un pago y retornar el DTO', async () => {
      const dto = { orderId: 'order-uuid', amount: 1500, currency: 'ARS' };
      const result = await createUseCase.execute(dto);

      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(result.orderId).toBe(dto.orderId);
      expect(result.status).toBe(PaymentStatus.PENDING);
    });
  });

  describe('GetPaymentUseCase', () => {
    it('debería retornar el pago por ID', async () => {
      const result = await getUseCase.execute('test-uuid');
      expect(result.id).toBe('test-uuid');
    });

    it('debería lanzar NotFoundException si no existe el pago', async () => {
      mockRepository.findById.mockResolvedValueOnce(null);
      await expect(getUseCase.execute('no-existe')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debería retornar todos los pagos', async () => {
      const result = await getUseCase.findAll();
      expect(result).toHaveLength(1);
    });
  });
});
