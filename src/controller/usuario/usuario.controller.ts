import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from 'src/DTOs/user.dto';
import { User } from 'src/entities/user.entity';
import { UsuarioService } from 'src/service/usuario/usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor(private userService: UsuarioService) { }

    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<User> {
        if (id === 0)
            throw new BadRequestException("Id Invalído")

        return await this.userService.getById(id);
    }

    @Post('criar')
    async Post(@Body() data: UserDto): Promise<User> {
        if (data === null)
            throw new BadRequestException("Usuário invalido")

        return await this.userService.Post(data);
    }

    @Put('atualizar/:id')
    async Put(@Param('id') id: number, @Body() data: UserDto): Promise<User> {
        if(id === 0)
            throw new BadRequestException("Id Invalído")

       return await this.userService.update(id, data);
    }

    @Delete('remover/:id')
    async remover(@Param('id')id: number): Promise<User>{
        if(id === 0)
            throw new BadRequestException("Id invalído")

        return await this.userService.Delete(id)
    }
}
