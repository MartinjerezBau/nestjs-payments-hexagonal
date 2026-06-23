import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreatePaymentDto } from '../../application/dtos/create-payment.dto';
import { PaymentResponseDto } from '../../application/dtos/payment-response.dto';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { GetPaymentUseCase } from '../../application/use-cases/get-payment.use-case';
import { PaymentAuthGuard } from '../guards/payment-auth.guard';
import { PaymentLoggingInterceptor } from '../interceptors/payment-logging.interceptor';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(PaymentAuthGuard)
@UseInterceptors(PaymentLoggingInterceptor)
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly getPaymentUseCase: GetPaymentUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiCreatedResponse({ type: PaymentResponseDto })
  @ApiUnauthorizedResponse({ description: 'API Key inválida o ausente' })
  async create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.createPaymentUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @ApiOkResponse({ type: [PaymentResponseDto] })
  @ApiUnauthorizedResponse({ description: 'API Key inválida o ausente' })
  async findAll(): Promise<PaymentResponseDto[]> {
    return this.getPaymentUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiOkResponse({ type: PaymentResponseDto })
  @ApiNotFoundResponse({ description: 'Pago no encontrado' })
  @ApiUnauthorizedResponse({ description: 'API Key inválida o ausente' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PaymentResponseDto> {
    return this.getPaymentUseCase.execute(id);
  }
}
