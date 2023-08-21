import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderProductsController } from './order-products.controller';
import { OrderProductsService } from './order-products.service';
import { Order } from './../orders/order.entity';
import { Product } from './../products/product.entity';
import { OrderProducts } from './order-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProducts, Product, Order])],
  controllers: [OrderProductsController],
  providers: [OrderProductsService],
  exports: [OrderProductsService],
})
export class OrderProductsModule {}
