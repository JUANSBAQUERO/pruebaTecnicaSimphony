import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'El dato debe ser un número entero.' })
  @Min(1)
  page?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt({ message: 'El dato debe ser un número entero.' })
  @Min(1)
  limit?: number;
}
