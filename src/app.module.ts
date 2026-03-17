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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_projeto_farmacia',
    entities:[Categoria, Produto, Usuario],
    synchronize: true,
  }),
   CategoriaModule, ProdutoModule, UsuarioModule, AuthModule ],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
