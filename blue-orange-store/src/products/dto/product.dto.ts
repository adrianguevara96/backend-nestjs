import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsUUID,
  IsArray,
  IsOptional,
  IsPositive,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

// swagger
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'product name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'product description' })
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'product price' })
  readonly price: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ description: 'product stock' })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'product image' })
  readonly image: string;

  @IsString()
  @ApiProperty({ description: 'product status' })
  readonly status: string = 'new';

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'product brand id' })
  readonly brandId: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: 'categories ids' })
  readonly categoriesIds: string[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  @IsNumber()
  maxPrice: number;
}
