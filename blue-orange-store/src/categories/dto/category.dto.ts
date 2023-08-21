import {
  IsString,
  IsNotEmpty,
  IsEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

// swagger
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'category name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: 'category status' })
  readonly status: string = 'new';

  @IsEmpty()
  // @IsArray()
  @ApiProperty({ description: 'products ids' })
  readonly productsIds: string[];
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}

export class FilterCategoriesDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number;
}
