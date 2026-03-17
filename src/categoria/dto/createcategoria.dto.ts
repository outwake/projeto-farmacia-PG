import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength,} from 'class-validator';
import { FaixaEtaria } from '../../enums/faixa-etaria.enum';
import { Tarja } from '../../enums/tarja.enum';
import { TipoReceita } from '../../enums/tipo-receita.enum';


export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  descricao?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  @IsBoolean()
  @IsOptional()
  controlado?: boolean;

  @IsEnum(TipoReceita)
  @IsOptional()
  tipo_receita?: TipoReceita;

  @IsEnum(FaixaEtaria)
  @IsOptional()
  faixa_etaria?: FaixaEtaria;

  @IsEnum(Tarja)
  @IsOptional()
  tarja?: Tarja;
}