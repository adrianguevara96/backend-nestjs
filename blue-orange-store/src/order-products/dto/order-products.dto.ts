import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';

// swagger
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderProductDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'order id' })
  readonly orderId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'product id' })
  readonly productId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'product quantity' })
  readonly quantity: number;
}

export class UpdateOrderProductDTO extends PartialType(CreateOrderProductDTO) {}

export class FilterOrderProductDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;
}
