import { getCustomRepository } from "typeorm";
import { Product } from "../../entity/Product";
import AppError from "../../errors/AppError";
import { ProductRepository } from "../../repositories/ProductRepository";


interface IRquest{
    id:string;
}

class DeleteProductService{
    public async execute({id}:IRquest):Promise<void>{
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id); 
        
        if(!product){
            throw new AppError('Product not found');
        }

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;