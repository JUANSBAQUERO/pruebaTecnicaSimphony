/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../dtos/auth/login.dto';
import { RegisterUserDto } from '../../dtos/auth/register.dto';
import { LoginResponseDto } from '../../dtos/auth/loginResponse.dto';
import { UserRole } from '../../Entities/User.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: '123456',
      };
      const result: LoginResponseDto = {
        accessToken: 'token123',
        role: UserRole.USER,
      };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
    });

    it('should throw a 404 error for invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      mockAuthService.login.mockRejectedValue(
        new Error('Usuario o contraseña incorrectos'),
      );

      await expect(authController.login(loginDto)).rejects.toThrow(
        'Usuario o contraseña incorrectos',
      );
    });
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const registerUserDto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      };

      mockAuthService.register.mockResolvedValue(undefined);

      await expect(
        authController.create(registerUserDto),
      ).resolves.toBeUndefined();
    });

    it('should throw a 409 error if the user already exists', async () => {
      const registerUserDto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      };

      mockAuthService.register.mockRejectedValue(
        new Error('El usuario ya existe'),
      );

      await expect(authController.create(registerUserDto)).rejects.toThrow(
        'El usuario ya existe',
      );
    });
  });
});
