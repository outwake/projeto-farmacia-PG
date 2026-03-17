import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";



@Injectable()

export class ProdutoService{


    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ){}

    //PROCURAR TODOS
    async findAll(): Promise<Produto[]>{
        return this.produtoRepository.find({
            relations:{
                categoria: true
            }

        });
    }

    //PROCURAR POR ID
    async findById(id: number): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria: true
            }
        })

        if(!produto)
         throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)     
        return produto;       
    }

    //PROCURAR POR TITULO
    async findAllByTitulo(titulo: string): Promise<Produto[]>{
        return this.produtoRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)//Ilike é para ignorar maiusculo e minusculo
            },
              relations:{
                categoria: true
            }
        })
    }

    // VALOR MAIOR QUE 500
    async FindAllByPrecoMaior(preco: number): Promise<Produto[]>{
        const maior = await this.produtoRepository.find({
           where:{ 
            preco: MoreThan(preco)}, //Para valores acima de preco
            relations:{
                categoria: true
            },
            order: {
            preco: "ASC"
        }
        })

        if(!maior.length)
         throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)     
        return maior; 
    }

    //VALOR MENOR QUE 500
    async FindAllByPrecoMenor(preco: number): Promise<Produto[]>{
        const menor = await this.produtoRepository.find({
            
            where: {
                preco: LessThan(preco)}, //Para valores abaixo de preco
            relations:{
                categoria: true
            },    
            order: {
            preco: "DESC"
        }
        })

        if(!menor.length)
         throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)     
        return menor; 
    }

    //QUANTIDADE MAIOR E MENOR
    async findAllByQuant(maior?: number, menor?: number): Promise<Produto[]> {

    if(maior){
        return this.produtoRepository.find({
            where: { quant: MoreThan(Number(maior)) },
            relations: { categoria: true }
        })
    }

    if(menor){
        return this.produtoRepository.find({
            where: { quant: LessThan(Number(menor)) },
            relations: { categoria: true }
        })
    }

    return this.produtoRepository.find({
        relations: { categoria: true}
    })
    }
        
    //CRIAR PRODUTO
    async create(produto: Produto): Promise<Produto>{
     return await this.produtoRepository.save(produto);
    }

    //ATUALIZAR PRODUTO
    async update(produto: Produto): Promise<Produto>{
        if (!produto.id || produto.id<= 0)
           throw new HttpException("O Id do produto é inválido!!", HttpStatus.BAD_REQUEST);

        await this.findById(produto.id);

        return await this.produtoRepository.save(produto);
    }

    // DELETAR PRODUTO
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id);

        return this.produtoRepository.delete(id);
    }

}