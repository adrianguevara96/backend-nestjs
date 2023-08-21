import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// controller
import { OrdersController } from './orders.controller';
// service
import { OrdersService } from './orders.service';
// entity
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Order } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
