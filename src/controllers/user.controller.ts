import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { RolesGuard } from '../guards/roles.gueard';
import { UserRole } from '../entities/User.entity';
import { Roles } from '../decorators/roles.decorators';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssignServicesDto } from '../dtos/service/assign-services.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar usuarios.',
    description:
      'Este endpoint permite listar todos los usuarios (Solo para usuarios administradores).',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios recuperada con éxito.',
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':idUser')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar usuario por ID.',
    description:
      'Este endpoint permite listar la información relacionada a un usuario por su ID.',
  })
  @ApiResponse({ status: 200, description: 'Usuario recuperado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findOne(@Param('idUser') id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Crear usuarios.',
    description:
      'Este endpoint permite crear usuarios (Solo para usuario administradores).',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post(':idUser/services')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Asigna varios servicios a un usuario.',
    description:
      'Este endpoint permite asignar múltiples servicios a un usuario utilizando sus IDs. (Solo para usuarios administadores)>',
  })
  @ApiResponse({
    status: 201,
    description: 'Servicios asignados al usuario con éxito.',
  })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({
    status: 404,
    description: 'Usuario o servicios no encontrados.',
  })
  async assignServicesToUser(
    @Param('idUser') id: string,
    @Body() assignServicesDto: AssignServicesDto,
  ) {
    return this.userService.assignServicesToUser(id, assignServicesDto);
  }

  @Delete(':idUser')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar usuarios.',
    description:
      'Este endpoint permite eliminar un usuario con sus servicios (Solo para usuarios administradores).',
  })
  @ApiResponse({ status: 204, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async delete(@Param('idUser') id: string) {
    return this.userService.delete(id);
  }
}
