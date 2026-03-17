import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FaixaEtaria } from "../../enums/faixa-etaria.enum";
import { Tarja } from "../../enums/tarja.enum";
import { TipoReceita } from "../../enums/tipo-receita.enum";



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
    descricao: string;

    //CRIAÇÃO FAIXA ETARIA
    @Column({
    type: 'enum',
    enum: FaixaEtaria,
    default: FaixaEtaria.TODOS,
    })
    faixa_etaria: FaixaEtaria;

    //CRIAÇÃO DA TARJA
    @Column({type: 'enum', enum: Tarja, nullable: true,})
    tarja: Tarja;

    //Ativo
    @Column({ default: true })
    ativo: boolean;

    //Controlado
    @Column({ default: false })
    controlado: boolean;

    //Tipo de receita
    @Column({ type: 'enum', enum: TipoReceita, nullable: true,})
    tipo_receita: TipoReceita;

    //Relacionamento com Produto
 
}