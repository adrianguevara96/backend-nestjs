import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';

// swagger
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

// DTO's
import {
  CreateOrderDTO,
  UpdateOrderDTO,
  FilterOrderDTO,
} from './dto/order.dto';
// services
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Orders found' })
  @ApiOperation({ summary: 'Order list' })
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
  getBrands(@Query() params: FilterOrderDTO) {
    return this.ordersService.findAll(params);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Order found by id' })
  @ApiOperation({ summary: 'Get an order by id' })
  @HttpCode(HttpStatus.ACCEPTED)
  getBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Order created' })
  @ApiOperation({ summary: 'Create an order' })
  createProduct(@Body() payload: CreateOrderDTO) {
    console.log('payload: ', payload);
    return this.ordersService.create(payload);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Order updated' })
  @ApiOperation({ summary: 'Update an order by id' })
  updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateOrderDTO,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Order deleted' })
  @ApiOperation({ summary: 'Delete an order by id' })
  deleteBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.delete(id);
  }
}
