import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

// swagger
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'user email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ description: 'user password' })
  readonly password: string;
}
