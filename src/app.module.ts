import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ProductController } from './modules/product/product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',  // this file will be created
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,  // ❌ migrations handle schema changes
      migrations: ['dist/migrations/*{.ts,.js}'],
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
