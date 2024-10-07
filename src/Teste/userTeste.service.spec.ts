import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../service/prisma/prisma.service";
import { UsuarioService } from "../service/usuario/usuario.service";

describe('UsuarioService', () => {
    let userService: UsuarioService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuarioService,
                {
                    provide: PrismaService,
                    useValue: {
                        usuario: {
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                        $connect: jest.fn(),
                        $disconnect: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UsuarioService>(UsuarioService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('getAll', () => {
        it('Pegar todos os usuários', async () => {
            const mockUsers = [{ id: 1, nome: 'allan', email: 'allan@gmail.com' }];

            jest.spyOn(prismaService.usuario, 'findMany').mockResolvedValue(mockUsers);

            const result = await userService.getAll();

            expect(result).toEqual(mockUsers);
        });
    });

    describe('getById', () => {
        it('Pegar usuário pelo id', async () => {
            const mockUser = { id: 1, nome: 'allan', email: 'allan@gmail.com' };

            jest.spyOn(prismaService.usuario, 'findUnique').mockResolvedValue(mockUser);

            const result = await userService.getById(1);

            expect(result).toEqual(mockUser);
        });

        it('Retornar NotFoundException caso usuário não exista', async () => {
            jest.spyOn(prismaService.usuario, 'findUnique').mockResolvedValue(null);

            await expect(userService.getById(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('Post', () => {
        it('Criar um usuário', async () => {
            const mockUser = { id: 1, nome: 'allan', email: 'allan@gmail.com' };

            jest.spyOn(prismaService.usuario, 'create').mockResolvedValue(mockUser);

            const result = await userService.create(mockUser);

            expect(result).toEqual(mockUser);
        });

        it('Se usuário for inválido, retornar BadRequestException', async () => {
            const invalidUser = { nome: '', email: '' };

            await expect(userService.create(invalidUser)).rejects.toThrow(BadRequestException);
        });
    });

    
    describe('Put', () => {
        it('Atualizar um usuário', async () => {
            const mockUser = { id: 1, nome: 'allan', email: 'allan@gmail.com' };

            jest.spyOn(prismaService.usuario, 'findUnique').mockResolvedValue(mockUser);
            jest.spyOn(prismaService.usuario, 'update').mockResolvedValue(mockUser);

            const result = await userService.update(mockUser.id, mockUser);

            expect(result).toEqual(mockUser);
        });

        it('deve lançar NotFoundException se o usuário não existir', async () => {
            const mockUser = { id: 1, nome: 'allan', email: 'allan@gmail.com' };

            jest.spyOn(prismaService.usuario, 'findUnique').mockResolvedValue(null);

            await expect(userService.update(mockUser.id, mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('Delete', () => {
        it('remover um usuário', async () => {
            const mockUser = { id: 1, nome: 'allan', email: 'allan@gmail.com' };

            jest.spyOn(prismaService.usuario, 'findUnique').mockResolvedValue(mockUser);
            jest.spyOn(prismaService.usuario, 'delete').mockResolvedValue(mockUser);

            const result = await userService.delete(1);

            expect(result).toEqual(mockUser);
        });

        it('Retornar NotFoundException caso usuário não exista', async () => {
            jest.spyOn(prismaService.usuario, 'findUnique').mockResolvedValue(null);

            await expect(userService.delete(1)).rejects.toThrow(NotFoundException);
        });
    });
});
