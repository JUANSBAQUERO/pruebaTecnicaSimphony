import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { LoginDto } from '../dtos/auth/login.dto';
import { LoginResponseDto } from '../dtos/auth/loginResponse.dto';
import { RegisterUserDto } from '../dtos/auth/register.dto';
import { User } from '../entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      email: foundUser.email,
      sub: foundUser.id,
      role: foundUser.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      role: foundUser.role,
    };
  }

  async register(userData: RegisterUserDto): Promise<User> {
    return await this.userService.register(userData);
  }
}
