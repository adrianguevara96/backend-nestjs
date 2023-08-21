import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrderProductsService } from './order-products.service';
import {
  CreateOrderProductDTO,
  UpdateOrderProductDTO,
  FilterOrderProductDTO,
} from './dto/order-products.dto';

@ApiTags('OrderxProducts')
@Controller('orders-products')
export class OrderProductsController {
  constructor(private orderProductsService: OrderProductsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Order products found' })
  @ApiOperation({ summary: 'Order products list' })
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
  getOrdersProducts(@Query() params: FilterOrderProductDTO) {
    return this.orderProductsService.findAll(params);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Order products found by id' })
  @ApiOperation({ summary: 'Get an order by id' })
  getOrderProducts(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderProductsService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Order products created' })
  @ApiOperation({ summary: 'Create an order' })
  createOrderProduct(@Body() payload: CreateOrderProductDTO) {
    console.log('payload: ', payload);
    return this.orderProductsService.create(payload);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Order product updated' })
  @ApiOperation({ summary: 'Update an order product by id' })
  updateOrderProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateOrderProductDTO,
  ) {
    return this.orderProductsService.update(id, payload);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Order product deleted' })
  @ApiOperation({ summary: 'Delete an order product by id' })
  deleteBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderProductsService.delete(id);
  }
}
