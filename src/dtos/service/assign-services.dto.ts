import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AssignServicesDto {
  @ApiProperty({
    description: 'IDs de los servicios a asignar al usuario.',
    example: [
      'd7a5f6d7-1b5e-4b56-9c0b-82d55f9e25da',
      'cbbd7af8-2b6d-4418-ae6e-0cfc1b287bc6',
    ],
  })
  @IsArray()
  @IsNotEmpty({ message: 'La lista de IDs no puede estar vacía.' })
  @IsUUID('4', { each: true })
  serviceIds: string[];
}
