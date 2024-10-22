import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'El email debe ser un correo electrónico válido.' })
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'mi_contraseña_secreta',
  })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  password: string;
}
