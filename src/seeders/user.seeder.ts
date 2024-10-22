import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(private readonly userService: UserService) {}

  async seed() {
    const users = [
      {
        name: 'User 1',
        email: 'user1@example.com',
        password: 'K8v$zW@f!P1l3^tH',
        role: 'user',
      },
      {
        name: 'User 2',
        email: 'user2@example.com',
        password: 'PmN3!pR8&jQ7*zF2@t',
        role: 'user',
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'J5#dB!rQ9@x2^sV4$',
        role: 'admin',
      },
    ];

    for (const user of users) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      await this.userService.register({
        ...user,
        password: hashedPassword,
      });
    }

    console.log('Usuarios sembrados exitosamente');
  }
}
