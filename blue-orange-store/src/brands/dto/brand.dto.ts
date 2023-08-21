import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

// swagger
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'brand name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: 'brand status' })
  readonly status: string = 'new';
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}

export class FilterBrandsDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;
}
