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
  CreateBrandDTO,
  FilterBrandsDTO,
  UpdateBrandDTO,
} from './dto/brand.dto';
// services
import { BrandsService } from './brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Brands found' })
  @ApiOperation({ summary: 'Brands list' })
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
  getBrands(@Query() params: FilterBrandsDTO) {
    return this.brandService.findAll(params);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Brand found by id' })
  @ApiOperation({ summary: 'Get a brand by id' })
  @HttpCode(HttpStatus.ACCEPTED)
  getBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Brand created' })
  @ApiOperation({ summary: 'Create a brand' })
  createProduct(@Body() payload: CreateBrandDTO) {
    console.log('payload: ', payload);
    return this.brandService.create(payload);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Brand updated' })
  @ApiOperation({ summary: 'Update a brand by id' })
  updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateBrandDTO,
  ) {
    return this.brandService.update(id, payload);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Brand deleted' })
  @ApiOperation({ summary: 'Delete a brand by id' })
  deleteBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.delete(id);
  }
}
