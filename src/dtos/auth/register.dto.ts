import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Pruebas Desarrollo',
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacía.' })
  @IsString()
  name: string;

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
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    },
  )
  password: string;
}
