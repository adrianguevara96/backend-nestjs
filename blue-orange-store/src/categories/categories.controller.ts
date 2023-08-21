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
  CreateCategoryDTO,
  UpdateCategoryDTO,
  FilterCategoriesDTO,
} from './dto/category.dto';
// services
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Categories found' })
  @ApiOperation({ summary: 'Categories list' })
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
  getBrands(@Query() params: FilterCategoriesDTO) {
    return this.categoriesService.findAll(params);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Category found by id' })
  @ApiOperation({ summary: 'Get a category by id' })
  @HttpCode(HttpStatus.ACCEPTED)
  getBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Category created' })
  @ApiOperation({ summary: 'Create a category' })
  createProduct(@Body() payload: CreateCategoryDTO) {
    console.log('payload: ', payload);
    return this.categoriesService.create(payload);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Category updated' })
  @ApiOperation({ summary: 'Update a category by id' })
  updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Category deleted' })
  @ApiOperation({ summary: 'Delete a category by id' })
  deleteBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
