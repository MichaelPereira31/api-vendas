import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repository/ProductsRepository";

import { Product } from "../typeorm/entity/Product";
import AppError from "../../../errors/AppError";

interface IRequest{
    name:string;
    price:number;
    quantity:number;
}

class CreateProductService{
    public async execute({name,price,quantity}: IRequest):Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);
        const productExist = await productsRepository.findByName(name);

        if(productExist){
            throw new AppError('There is already ane product with this name');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity
        });

        await productsRepository.save(product);

        return product
    }
}

export default CreateProductService;