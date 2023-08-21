import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import {
  CreateOrderDTO,
  FilterOrderDTO,
  UpdateOrderDTO,
} from './dto/order.dto';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  async findAll(params?: FilterOrderDTO) {
    // options
    const options: FindManyOptions<Order> = {};

    if (params) {
      // pagination
      const { limit, offset } = params;
      options.take = limit;
      options.skip = offset;
    } else {
      options.take = 10;
      options.skip = 0;
    }

    // relations
    options.relations = [
      'products',
      'products.product',
      'products.product.brand',
      'products.product.categories',
      'user',
    ];

    // select
    options.select = {
      id: true,
      status: true,
      products: {
        id: true,
        product: {
          id: true,
          name: true,
          brand: {
            id: true,
            name: true,
          },
          categories: {
            id: true,
            name: true,
          },
          price: true,
        },
      },
      user: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    };

    const orders = await this.orderRepo.find(options);

    if (orders.length == 0) {
      throw new NotFoundException('orders not found');
    }

    return {
      message: 'orders found',
      data: orders,
    };
  }

  async findOne(id: string) {
    const orderFound = await this.orderRepo.findOne({
      relations: ['products'],
      where: { id: id },
    });

    if (!orderFound) {
      throw new NotFoundException('order not found');
    }

    return {
      message: 'order found',
      data: orderFound,
    };
  }

  async create(data: CreateOrderDTO) {
    const newOrder = new Order();

    // user
    if (data.userId) {
      const user = await this.userRepo.findOne({ where: { id: data.userId } });
      newOrder.user = user;
      newOrder.status = data.status;
    }

    return {
      message: 'order added',
      data: await this.orderRepo.save(newOrder),
    };
  }

  async update(id: string, data: UpdateOrderDTO) {
    const order = await this.orderRepo.findOneBy({ id });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    // user
    if (data.userId) {
      const user = await this.userRepo.findOne({ where: { id: data.userId } });
      order.user = user;
    }

    this.orderRepo.merge(order, data);

    return {
      message: 'order updated',
      data: await this.orderRepo.save(order),
    };
  }

  async delete(id: string) {
    const order = await this.orderRepo.findOneBy({ id });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return {
      message: 'order deleted',
      data: await this.orderRepo.delete(order.id),
    };
  }
}
