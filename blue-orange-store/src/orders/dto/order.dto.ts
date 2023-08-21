import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsPositive,
  IsNumber,
  Min,
} from 'class-validator';

// swagger
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @IsString()
  @ApiProperty({ description: 'order status' })
  readonly status: string = 'created';

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'order user id' })
  readonly userId: string;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}

export class FilterOrderDTO {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;
}
