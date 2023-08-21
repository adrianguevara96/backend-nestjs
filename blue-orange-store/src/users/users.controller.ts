import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';

// services
import { UsersService } from './users.service';

// DTO's
import { CreateUserDTO, FilterUsersDTO, UpdateUserDTO } from './dto/user.dto';

// swagger
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Users found' })
  @ApiOperation({ summary: 'Users list' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'A parameter optional',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    description: 'A parameter optional',
    required: false,
  })
  getUsers(@Query() params: FilterUsersDTO) {
    return this.userService.findAll(params);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'User found by id' })
  @ApiOperation({ summary: 'Get a user by id' })
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'User created' })
  @ApiOperation({ summary: 'Create a user' })
  createUser(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiOperation({ summary: 'Update a user by id' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDTO,
  ) {
    return this.userService.update(id, payload);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiOperation({ summary: 'Delete a user by id' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
