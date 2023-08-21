import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { Brand } from './brand.entity';
import {
  CreateBrandDTO,
  FilterBrandsDTO,
  UpdateBrandDTO,
} from './dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async findAll(params?: FilterBrandsDTO) {
    // options
    const options: FindManyOptions<Brand> = {};

    if (params) {
      // pagination
      const { limit, offset } = params;
      options.take = limit;
      options.skip = offset;
    } else {
      options.take = 10;
      options.skip = 0;
    }

    const brands = await this.brandRepo.find(options);

    if (brands.length == 0) {
      throw new NotFoundException('brands not found');
    }

    return {
      message: 'brands found',
      data: brands,
    };
  }

  async findOne(id: string) {
    const brandFound = await this.brandRepo.findOne({
      relations: ['products'],
      where: { id: id },
    });

    if (!brandFound) {
      throw new NotFoundException('brand not found');
    }

    return {
      message: 'brand found',
      data: brandFound,
    };
  }

  async create(data: CreateBrandDTO) {
    const newBrand = this.brandRepo.create(data);
    // console.log("new user in create: ", newProduct);

    return {
      message: 'brand added',
      data: await this.brandRepo.save(newBrand),
    };
  }

  async update(id: string, data: UpdateBrandDTO) {
    const brand = await this.brandRepo.findOneBy({ id });

    // console.log("product in update: ", product);

    if (!brand) {
      throw new NotFoundException('brand not found');
    }

    this.brandRepo.merge(brand, data);

    return {
      message: 'brand updated',
      data: await this.brandRepo.save(brand),
    };
  }

  async delete(id: string) {
    const brand = await this.brandRepo.findOneBy({ id });
    // console.log("product in delete: ", product);

    if (!brand) {
      throw new NotFoundException('brand not found');
    }

    return {
      message: 'brand deleted',
      data: await this.brandRepo.delete(brand.id),
    };
  }
}
