import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// controller
import { ProductsController } from './products.controller';
import { BrandsController } from 'src/brands/brands.controller';

// service
import { ProductsService } from './products.service';
import { BrandsService } from 'src/brands/brands.service';

// entity
import { Product } from './product.entity';
import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductsController, BrandsController],
  providers: [ProductsService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
