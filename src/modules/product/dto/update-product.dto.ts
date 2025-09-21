import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({ example: 'Laptop', description: 'Product name' })
    name: string;
    @ApiProperty({ example: 1200, description: 'Product Price' })
    price: number;
    @ApiProperty({ example: true, description: 'In Stock' })
    inStock?: boolean;
}
