import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindManyOptions, Between } from 'typeorm';

// entities
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';
import { Brand } from 'src/brands/brand.entity';
// dto
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  async findAll(params?: FilterProductsDTO) {
    // options
    const options: FindManyOptions<Product> = {};

    if (params) {
      // pagination
      const { limit, offset } = params;
      options.take = limit;
      options.skip = offset;

      // range price
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        options.where = {
          price: Between(minPrice, maxPrice),
        };
      }
    }

    options.relations = ['brand', 'categories'];
    options.select = {
      brand: {
        id: true,
        name: true,
      },
      categories: {
        id: true,
        name: true,
      },
    };

    //method
    const products = await this.productRepo.find(options);

    if (products.length == 0) {
      throw new NotFoundException('products not found');
    }

    return {
      message: 'products found',
      data: products,
    };
  }

  async findOne(id: string) {
    const productFound = await this.productRepo.findOne({
      relations: ['brand', 'categories'],
      where: { id: id },
    });

    if (!productFound) {
      throw new NotFoundException('product not found');
    }

    return {
      product: 'product found',
      data: productFound,
    };
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    // console.log("new user in create: ", newProduct);

    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }

    // categories
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }

    return {
      message: 'product added',
      data: await this.productRepo.save(newProduct),
    };
  }

  async update(id: string, data: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id });
    // console.log("product in update: ", product);

    if (!product) {
      throw new NotFoundException('product not found');
    }

    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      product.brand = brand;
    }

    // categories
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, data);

    return {
      message: 'product updated',
      data: await this.productRepo.save(product),
    };
  }

  async delete(id: string) {
    const product = await this.productRepo.findOneBy({ id });
    // console.log("product in delete: ", product);

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return {
      message: 'product deleted',
      data: await this.productRepo.delete(product.id),
    };
  }

  async removeCategoryByProduct(productId: string, categoryId: string) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return {
      message: 'category deleted',
      data: await this.productRepo.save(product),
    };
  }

  async addCategoryByProduct(productId: string, categoryId: string) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }

    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('category not found');
    }

    if (!product.categories.find((item) => item.id == categoryId)) {
      product.categories.push(category);
    } else {
      throw new ConflictException('category already exists');
    }

    return {
      message: `category added in product ${product.name}`,
      data: await this.productRepo.save(product),
    };
  }
}
