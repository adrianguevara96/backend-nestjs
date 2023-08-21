import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { OrderProducts } from './order-products.entity';
import {
  CreateOrderProductDTO,
  FilterOrderProductDTO,
  UpdateOrderProductDTO,
} from './dto/order-products.dto';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProducts)
    private orderProductsRepo: Repository<OrderProducts>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(params?: FilterOrderProductDTO) {
    // options
    const options: FindManyOptions<OrderProducts> = {};

    if (params) {
      // pagination
      const { limit, offset } = params;
      options.take = limit;
      options.skip = offset;
    } else {
      options.take = 10;
      options.skip = 0;
    }

    options.relations = ['order', 'order.user', 'product'];

    options.select = {
      product: {
        id: true,
        name: true,
      },
      order: {
        id: true,
        user: {
          id: true,
          name: true,
          lastName: true,
          email: true,
        },
      },
    };

    const ordersProducts = await this.orderProductsRepo.find(options);

    if (ordersProducts.length == 0) {
      throw new NotFoundException('orders products not found');
    }

    return {
      message: 'orders products found',
      data: ordersProducts,
    };
  }

  async findOne(id: string) {
    const orderProductsFound = await this.orderProductsRepo.findOne({
      relations: ['order', 'product'],
      where: { id: id },
    });

    if (!orderProductsFound) {
      throw new NotFoundException('order products not found');
    }

    return {
      message: 'order products found',
      data: orderProductsFound,
    };
  }

  async create(data: CreateOrderProductDTO) {
    const order = await this.orderRepo.findOne({ where: { id: data.orderId } });
    if (!order) {
      throw new NotFoundException('order not found');
    }

    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }

    const newOrderProducts = new OrderProducts();
    newOrderProducts.order = order;
    newOrderProducts.product = product;
    newOrderProducts.quantity = data.quantity;

    return {
      message: `product added in order ${data.orderId}`,
      data: await this.orderProductsRepo.save(newOrderProducts),
    };
  }

  async update(id: string, changes: UpdateOrderProductDTO) {
    const orderProducts = await this.orderProductsRepo.findOne({
      where: { id: id },
    });
    if (!orderProducts) {
      throw new NotFoundException('order products not found');
    }

    if (changes.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: changes.orderId },
      });
      if (!order) {
        throw new NotFoundException('order not found');
      }

      orderProducts.order = order;
    }

    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { id: changes.productId },
      });
      if (!product) {
        throw new NotFoundException('product not found');
      }

      orderProducts.product = product;
    }

    if (changes.quantity) {
      orderProducts.quantity = changes.quantity;
    }

    return {
      message: `order products updated`,
      data: await this.orderProductsRepo.save(orderProducts),
    };
  }

  async delete(id: string) {
    const orderProducts = await this.orderProductsRepo.findOne({
      where: { id: id },
    });
    if (!orderProducts) {
      throw new NotFoundException('order products not found');
    }

    await this.orderProductsRepo.delete(orderProducts.id);

    return {
      message: `order products ${orderProducts.id} deleted`,
    };
  }
}
