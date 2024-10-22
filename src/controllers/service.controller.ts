import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dtos/service/create-service.dto';
import { UserRole } from '../Entities/User.entity';
import { PaginationDto } from '../dtos/general/pagination.dto';
import { RolesGuard } from '../guards/roles.gueard';
import { Roles } from '../decorators/roles.decorators';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar servicios.',
    description:
      'Este endpoint permite listar servicios según el rol del usuario.',
  })
  @ApiResponse({ status: 200, description: 'Listar servicios con éxito.' })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    return this.serviceService.findAllByUserIdAndRole(
      userId,
      page,
      limit,
      userRole as UserRole,
    );
  }

  @Get(':idUser/services')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar servicios por id de usuario.',
    description:
      'Este endpoint permite listar servicios según el rol del usuario (Solo para usuarios administradores).',
  })
  @ApiResponse({ status: 200, description: 'Listar servicios con éxito.' })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async findAllByIdUser(
    @Param('idUser') id: string,
    @Query() paginationDto: PaginationDto,
    @Req() req: Request,
  ) {
    const userRole = req.user?.role;

    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    return this.serviceService.findAllByUserIdAndRole(
      id,
      page,
      limit,
      userRole as UserRole,
    );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear un nuevo servicio.',
    description:
      'Este endpoint permite crear un servicio y asignarlo al usuario que lo creó.',
  })
  @ApiResponse({ status: 201, description: 'Servicio creado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.userId;
    return this.serviceService.create(createServiceDto, userId);
  }

  @Delete(':idService')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar servicios.',
    description: 'Este endpoint permite eliminar un servicio.',
  })
  @ApiResponse({ status: 200, description: 'Servicio eliminado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async delete(@Param('idService') id: string) {
    return this.serviceService.delete(id);
  }
}
