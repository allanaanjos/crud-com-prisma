import { IsEmail,    IsNotEmpty,  IsString, MinLength } from "class-validator"
export class UserDto{

    @IsString()
    @IsNotEmpty({ message: "Nome é Obrigatório"})
    @MinLength(3, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    nome: string
    
    @IsNotEmpty({message: "Email é obrigatório"})
    @IsEmail({}, { message: "Email invalído"})
    email: string
}