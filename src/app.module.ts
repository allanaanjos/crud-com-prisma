import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { UsuarioService } from './service/usuario/usuario.service';
import { UsuarioController } from './controller/usuario/usuario.controller';
import { PrismaService } from './service/prisma/prisma.service';

@Module({
  imports: [PrismaModule, UsuarioModule],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService, PrismaService],
})
export class AppModule {}
