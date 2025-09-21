import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) { }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const payload = {
      name: createProductDto.name,
      price: createProductDto.price,
      inStock: createProductDto.inStock ?? true, // fallback to true if not provided
    };
    const product = this.productsRepo.create(payload);
    return this.productsRepo.save(product);
  }

  async findAll(): Promise<Product[] | string> {
    const result = await this.productsRepo.find();

    if (result.length > 0) {
      return result;
    } else {
      return 'No product available yet';
    }
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepo.findOneBy({ id });
  }

  async update(id: number, updateDto: Partial<CreateProductDto>): Promise<Product | null> {
    await this.productsRepo.update(id, updateDto);
    return this.productsRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<string> {
    let productExist = await this.productsRepo.findOneBy({ id });
    if (productExist) {
      let result = await this.productsRepo.delete(id);
      if (result.affected && result.affected > 0) {
        return 'Product deleted successfully';
      } else {
        throw new Error(`Product with id ${id} not found`);
      }
    }
    return 'Product not found';

  }
}
