import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/DTOs/user.dto';

@Injectable()
export class UsuarioService {

    constructor(private service: PrismaService) { }

    async getAll(): Promise<User[]> {
        return await this.service.usuario.findMany();
    }

    async getById(id: number): Promise<User> {
        let user = await this.service.usuario.findUnique({ where: { id: id } })

        if (!user)
            throw new NotFoundException("Id não encontrado")

        return user
    }

    async Post(data: UserDto): Promise<User> {
        if (data === null || !data.nome || !data.email) {
            throw new BadRequestException("Usuário inválido");
        }

        return await this.service.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,

            },
        })
    }

    async update(id: number, data: UserDto): Promise<User> {
        let user = await this.service.usuario.findUnique({ where: { id: id } })

        if (!user)
            throw new NotFoundException("Usuario não encontrado")

        return await this.service.usuario.update({
            where: { id: id },
            data: {
                nome: data.nome,
                email: data.email
            }
        })
    }

    async Delete(id: number): Promise<User> {
        let data = await this.service.usuario.findUnique({ where: { id: id } })

        if (!data)
            throw new NotFoundException("Id não encontrado")

        return await this.service.usuario.delete({ where: { id: id } })
    }
}
