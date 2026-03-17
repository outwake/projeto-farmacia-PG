import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
	useClass: ProdService,
  imports: [ConfigModule],
}),
   CategoriaModule, ProdutoModule, UsuarioModule, AuthModule ],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
