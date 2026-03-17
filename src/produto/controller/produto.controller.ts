import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Produto')
@UseGuards(JwtAuthGuard)
@Controller("/produtos")
@ApiBearerAuth()

export class ProdutoController{

    constructor(
        private readonly produtoService: ProdutoService
    ){}

///////////////////////////////////////////////////////////////////////////////////////
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }


    // GET TITULO
    @Get('titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param('titulo')titulo: string):Promise<Produto[]>{
        return this.produtoService.findAllByTitulo(titulo);
    }

    //EXTRA 1: GET PREÇO MAIOR
    @Get('preco/maior/:preco')
    @HttpCode(HttpStatus.OK)
    findAllByPrecoMaior(@Param('preco', ParseIntPipe) preco: number):Promise<Produto[]>{
        return this.produtoService.FindAllByPrecoMaior(preco);
    }

    //EXTRA 2: GET PREÇO MENOR
    @Get('preco/menor/:preco')
    @HttpCode(HttpStatus.OK)
    findAllByPrecoMenor(@Param('preco', ParseIntPipe) preco: number):Promise<Produto[]>{
        return this.produtoService.FindAllByPrecoMenor(preco);
    }

    
    // EXTRA 3: QUANTIDADE MAIOR QUE OU MENOR QUE
    @Get("/quantidade")
    findByQuantidade( @Query("maior") maior?: string,@Query("menor") menor?: string){
    return this.produtoService.findAllByQuant(
        maior ? Number(maior) : undefined,
        menor ? Number(menor) : undefined
    )
    }


    // GET ID
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////
    //POST CREATED
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }

    //PUT UPDATE
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }
    
    //DELETE 
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }
}