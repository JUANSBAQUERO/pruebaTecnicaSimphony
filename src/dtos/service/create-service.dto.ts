import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'El nombre del servicio',
    example: 'Enel',
  })
  @IsString({ message: 'El dato debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede ser vacio' })
  name: string;

  @ApiProperty({
    description: 'El descripción del servicio',
    example: 'Este servicio es para pagos de energia',
  })
  @IsString({ message: 'El dato debe ser un string' })
  description: string;

  @ApiProperty({
    description: 'El precio $ del servicio',
    example: '10000.00',
  })
  @IsDecimal()
  @IsNotEmpty({ message: 'El costo no puede ser vacio.' })
  cost: number;

  @ApiProperty({
    description: 'Categoria del servicio',
    example: 'Luz',
  })
  @IsString({ message: 'El dato debe ser un string' })
  @IsNotEmpty({ message: 'La categoria no puede ser vacio.' })
  category: string;
}
