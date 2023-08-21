import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// app
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';

//environtments
import { environments } from './environments';
import { OrderProductsModule } from './order-products/order-products.module';

import config from './config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.develop.env',
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    OrdersModule,
    OrderProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
