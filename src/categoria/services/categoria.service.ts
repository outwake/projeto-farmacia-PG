import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { FaixaEtaria } from "../../enums/faixa-etaria.enum";
import { Tarja } from "../../enums/tarja.enum";
import { CreateCategoriaDto } from "../dto/createcategoria.dto";
import { TipoReceita } from "../../enums/tipo-receita.enum";



@Injectable()
export class CategoriaService{


    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ){}

    //Listar tudo
    async findAll():Promise <Categoria[]>{
        return this.categoriaRepository.find({relations:{
                produto:true
            }});
    }

    //Procurar por Id
    async findById(id: number): Promise<Categoria>{
        const categoria = await this.categoriaRepository.findOne({
            where:{
                id
            },
            relations:{
                produto:true
            }
            
        })
        if(!categoria)
            throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND)

        return categoria;
    }

    //Procurar por nome
    async findAllByNome(nome: string): Promise<Categoria[]>{
        return this.categoriaRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations:{
                produto:true
            }
        })
    }
    
    //Procurar por faixa etaria
    async findByFaixaEtaria(faixa_etaria: FaixaEtaria): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where:{faixa_etaria},
            relations:{
                produto:true
            }
        })
    }

    //Procurar por Tarja
    async findByTarja(tarja: Tarja): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where: {tarja},
            relations:{
                produto:true
            }
            
        })
    }

    //Procurar por Tipo de receita
    async findByReceita(tipo_receita: TipoReceita): Promise<Categoria[]> {
    return this.categoriaRepository.find({
        where: { tipo_receita },
        relations:{
                produto:true
            }
    });
    }

    //Criar Categoria
    async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(dto);
    return await this.categoriaRepository.save(categoria);
    }


    //Atualizar Categoria
     async update(id: number, dto: CreateCategoriaDto): Promise<Categoria> {
     await this.findById(id); 
     await this.categoriaRepository.update(id, dto);
     return this.findById(id);
   }

    async delete (id: number): Promise<DeleteResult>{
        await this.findById(id);

        return this.categoriaRepository.delete(id);
    }

}