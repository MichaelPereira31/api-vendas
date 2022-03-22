import { getCustomRepository } from "typeorm";
import AppError from "../../../errors/AppError";
import { Product } from "../typeorm/entity/Product";
import { ProductRepository } from "../typeorm/repository/ProductsRepository";



 interface IRequest{
     id:string;
 }

 class ShowProductService{
     public async execute({id}:IRequest): Promise<Product | undefined> {
         const productsRepository  = getCustomRepository(ProductRepository);

         const product = await productsRepository.findOne(id);

         if(!product){
             throw new AppError("Product not found");
         }

         return product;
     }
 }

 export default ShowProductService;