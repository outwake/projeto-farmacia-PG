import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";
import { CreateCategoriaDto } from "../dto/createcategoria.dto";
import { FaixaEtaria } from "../../enums/faixa-etaria.enum";
import { Tarja } from "../../enums/tarja.enum";
import { TipoReceita } from "../../enums/tipo-receita.enum";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";



@ApiTags('Categoria')
@UseGuards(JwtAuthGuard)
@Controller("/categorias")
@ApiBearerAuth()

export class CategoriaController{

    constructor(
        private readonly categoriaService: CategoriaService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }


    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findAllByDescricao(@Param('nome') nome: string): Promise<Categoria[]>{
        return this.categoriaService.findAllByNome(nome);
    }

     // Buscar por tipo de faixa etaria
    @Get('/faixaetaria/:faixaetaria')
    @HttpCode(HttpStatus.OK)
    findByFaixaEtaria(@Param('faixaetaria') faixaEtaria: FaixaEtaria) {
    return this.categoriaService.findByFaixaEtaria(faixaEtaria);
    }

    //Buscar por Tarja
    @Get('/tarja/:tarja')
    @HttpCode(HttpStatus.OK)
    findByTarja(@Param('tarja') tarja: Tarja) {
    return this.categoriaService.findByTarja(tarja);
    }

    //Buscar por Tipo de Receita
    @Get('/receita/:receita')
    @HttpCode(HttpStatus.OK)
    findByReceita(@Param('receita') receita: TipoReceita) {
    return this.categoriaService.findByReceita(receita);
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(dto);
    }


    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCategoriaDto) {
    return this.categoriaService.update(id, dto);
    }
    

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id);
    }



}