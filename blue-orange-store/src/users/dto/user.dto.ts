import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsPositive,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

// swagger
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user last name' })
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'user email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ description: 'user password' })
  readonly password: string;

  @IsString()
  @ApiProperty({ description: 'user status' })
  readonly status: string = 'active';

  @IsString()
  @ApiProperty({ description: 'user role' })
  readonly role: string = 'user';
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class FilterUsersDTO {
  @IsPositive()
  @IsOptional()
  @IsNumber()
  readonly limit: number;

  @Min(0)
  @IsOptional()
  @IsNumber()
  readonly offset: number;
}
