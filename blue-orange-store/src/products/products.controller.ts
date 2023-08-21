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
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from './dto/product.dto';
// services
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Products found' })
  @ApiOperation({ summary: 'Products list' })
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
  @ApiQuery({
    name: 'minPrice',
    type: Number,
    description: 'A parameter optional',
    required: false,
  })
  @ApiQuery({
    name: 'maxPrice',
    type: Number,
    description: 'A parameter optional',
    required: false,
  })
  getProducts(@Query() params: FilterProductsDTO) {
    return this.productService.findAll(params);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Product found by id' })
  @ApiOperation({ summary: 'Get a product by id' })
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Product created' })
  @ApiOperation({ summary: 'Create a product' })
  createProduct(@Body() payload: CreateProductDTO) {
    console.log('payload: ', payload);
    return this.productService.create(payload);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiOperation({ summary: 'Update a product by id' })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiOperation({ summary: 'Delete a product by id' })
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.delete(id);
  }

  // products - categories

  @Patch('/:id/category/:categoryId')
  @ApiResponse({ status: 200, description: 'Category product added' })
  @ApiOperation({ summary: 'Add a product category by id' })
  addCategoryByProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    return this.productService.addCategoryByProduct(id, categoryId);
  }

  @Delete('/:id/category/:categoryId')
  @ApiResponse({ status: 200, description: 'Category product deleted' })
  @ApiOperation({ summary: 'Delete a product category by id' })
  deleteCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
