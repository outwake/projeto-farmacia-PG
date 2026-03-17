import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FaixaEtaria } from "../../enums/faixa-etaria.enum";
import { Tarja } from "../../enums/tarja.enum";
import { TipoReceita } from "../../enums/tipo-receita.enum";
import { Produto } from "../../produto/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: "tb_categorias"})

export class Categoria{
    @PrimaryGeneratedColumn()
    id:number;


    //Crição do Nome
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string;

    //CRIAÇÃO DA DESCRIAÇÃO DA CATEGORIA
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()  
    descricao: string;

    //CRIAÇÃO FAIXA ETARIA
    @Column({type: 'enum', enum: FaixaEtaria,default: FaixaEtaria.TODOS,})
    @ApiProperty()  
    faixa_etaria: FaixaEtaria;

    //CRIAÇÃO DA TARJA
    @Column({type: 'enum', enum: Tarja, nullable: true,})
    @ApiProperty()  
    tarja: Tarja;

    //Ativo
    @Column({ default: true })
    @ApiProperty()  
    ativo: boolean;

    //Controlado
    @Column({ default: false })
    @ApiProperty()  
    controlado: boolean;

    //Tipo de receita
    @Column({ type: 'enum', enum: TipoReceita, nullable: true,})
    @ApiProperty()  
    tipo_receita: TipoReceita;

    //Relacionamento com Produto
    @ApiProperty()  
    @OneToMany(()=> Produto,(produto)=> produto.categoria)
    produto: Produto[];
 
}