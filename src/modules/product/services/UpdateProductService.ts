import { getCustomRepository } from "typeorm";
import AppError from "../../../errors/AppError";
import { Product } from "../typeorm/entity/Product";
import { ProductRepository } from "../typeorm/repository/ProductsRepository";

import DeleteProductService from "./DeleteProductService";
interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  class UpdateProductService {
    public async execute({
      id,
      name,
      price,
      quantity,
    }: IRequest): Promise<Product> {
      const productsRepository = getCustomRepository(ProductRepository);
  
      const product = await productsRepository.findOne(id);
  
      if (!product) {
        throw new AppError('Product not found.');
      }
  
      const productExists = await productsRepository.findByName(name);
  
      if (productExists) {
        throw new AppError('There is already one product with this name');
      }
  
      // const redisCache = new RedisCache();
  
      //await redisCache.invalidate('api-vendas-PRODUCT_LIST');
  
      product.name = name;
      product.price = price;
      product.quantity = quantity;
  
      await productsRepository.save(product);
  
      return product;
    }
  }
  
  export default UpdateProductService;