import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceService } from '../services/service.service';

@Injectable()
export class ServiceSeeder {
  constructor(
    private readonly serviceService: ServiceService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      console.log('No hay usuarios disponibles para asignar a los servicios.');
      return;
    }

    const services = [
      {
        name: 'Servicio de Tecnología',
        description: 'Descripción del servicio de tecnología',
        cost: 100,
        category: 'Tecnología',
        userId: users[0].id,
      },
      {
        name: 'Servicio de Salud',
        description: 'Descripción del servicio de salud',
        cost: 200,
        category: 'Salud',
        userId: users[1].id,
      },
      {
        name: 'Servicio de Hogar',
        description: 'Descripción del servicio de hogar',
        cost: 300,
        category: 'Hogar',
        userId: users[2].id,
      },
      {
        name: 'Servicio de Educación',
        description: 'Descripción del servicio de educación',
        cost: 400,
        category: 'Educación',
        userId: users[0].id,
      },
      {
        name: 'Servicio de Consultoría',
        description: 'Descripción del servicio de consultoría',
        cost: 500,
        category: 'Consultoría',
        userId: users[1].id,
      },
    ];

    for (const service of services) {
      await this.serviceService.create(service, service.userId);
    }
  }
}
