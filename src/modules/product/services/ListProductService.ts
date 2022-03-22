import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entity/Product";
import { ProductRepository } from "../typeorm/repository/ProductsRepository";



 class ListProductService {
     public async execute():Promise<Product[]>{
         const productsRepository = getCustomRepository(ProductRepository);

         const products = await productsRepository.find();

         return products;
     }
 }

 export default ListProductService