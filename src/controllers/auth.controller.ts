import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/auth/login.dto';
import { LoginResponseDto } from '../dtos/auth/loginResponse.dto';
import { RegisterUserDto } from '../dtos/auth/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Este endpoint permite a los usuarios autenticarse con su email y contraseña, devolviendo un token JWT si las credenciales son correctas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario loggeado con éxito',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o contraseña incorrectos',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya existe',
  })
  @ApiResponse({
    status: 500,
    description:
      'Hubo un error al intenter verificar los datos, Por favor intentelo mas tarde',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuarios.',
    description: 'Este endpoint permite registrar usuarios en la plataforma.',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token invalido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
