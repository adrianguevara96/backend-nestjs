import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { Category } from './category.entity';
import {
  CreateCategoryDTO,
  FilterCategoriesDTO,
  UpdateCategoryDTO,
} from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(params?: FilterCategoriesDTO) {
    // options
    const options: FindManyOptions<Category> = {};

    if (params) {
      // pagination
      const { limit, offset } = params;
      options.take = limit;
      options.skip = offset;
    } else {
      options.take = 10;
      options.skip = 0;
    }
    const categories = await this.categoryRepo.find(options);

    if (categories.length == 0) {
      throw new NotFoundException('categories not found');
    }

    return {
      message: 'categories found',
      data: categories,
    };
  }

  async findOne(id: string) {
    const categoryFound = await this.categoryRepo.findOne({
      relations: ['products'],
      where: { id: id },
    });

    if (!categoryFound) {
      throw new NotFoundException('category not found');
    }

    return {
      message: 'category found',
      data: categoryFound,
    };
  }

  async create(data: CreateCategoryDTO) {
    const newCategory = this.categoryRepo.create(data);

    return {
      message: 'category added',
      data: await this.categoryRepo.save(newCategory),
    };
  }

  async update(id: string, data: UpdateCategoryDTO) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    this.categoryRepo.merge(category, data);

    return {
      message: 'category updated',
      data: await this.categoryRepo.save(category),
    };
  }

  async delete(id: string) {
    const brand = await this.categoryRepo.findOneBy({ id });

    if (!brand) {
      throw new NotFoundException('category not found');
    }

    return {
      message: 'category deleted',
      data: await this.categoryRepo.delete(brand.id),
    };
  }
}
