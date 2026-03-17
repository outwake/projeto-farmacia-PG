import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../../util/numericTransformer";
import { Categoria } from "../../categoria/entities/categoria.entity";



@Entity({name: "tb_produtos"})

export class Produto{

    @PrimaryGeneratedColumn()
    id:number;

    //CRIAÇÃO DO TITULO
    @Transform(({value}: TransformFnParams)=> value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    //CRIAÇÃO DO VALOR
    @IsNotEmpty()
    @IsPositive()
    @IsNumber({maxDecimalPlaces: 2 })
    @Column({type: "decimal", precision: 8, scale: 2, transformer: new NumericTransformer()})
    preco: number;

    
    //Quantidade
    @Column({ type: "int", nullable: false })
    quant: number;


    //FOTOS
    @Column()
    foto:string;


    //Relacionamento com Categoria
    @ManyToOne(()=> Categoria, (categoria)=> categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

}