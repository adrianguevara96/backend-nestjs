import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: { Repository },
        },
        // TeamsService,
        // {
        //   provide: 'TeamRepository',
        //   useValue: { Repository },
        // },
        // UsersTeamsService,
        // {
        //   provide: 'UserTeamsRepository',
        //   useValue: { Repository },
        // },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return a user promise (using SpyOn)', () => {
    const user: User = {
      id: 'c5c3311b-fb2b-4b81-a896-afcea76f46ae',
      email: 'spyon@test.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: '',
      hashPassword: () => void {},
      name: '',
      lastName: '',
      role: '',
      status: '',
      orders: [],
    };

    const userPromise = new Promise((resolve) => {
      resolve(user);
    });

    jest.spyOn(service, 'findOne').mockImplementation(async () => user);

    const userGet = controller.getUser('c5c3311b-fb2b-4b81-a896-afcea76f46ae');

    expect(userGet).toEqual(userPromise);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('UsersController & UsersService', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserValue: User = {
    id: 'c5c3311b-fb2b-4b81-a896-afcea76f46ee',
    email: 'spyon2@test.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '',
    hashPassword: () => void {},
    name: '',
    lastName: '',
    role: '',
    status: '',
    orders: [],
  };
  const mockUserPromise = new Promise((resolve) => {
    resolve(mockUserValue);
  });
  const mockUsersService = {
    findOne: () => mockUserPromise,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: { Repository },
        },
        // UsersTeamsService,
        // {
        //   provide: 'UserTeamsRepository',
        //   useValue: { Repository },
        // },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return a user promise (using SpyOn)', () => {
    const user: User = {
      id: 'c5c3311b-fb2b-4b81-a896-afcea76f46ae',
      email: 'spyon@test.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: '',
      hashPassword: () => void {},
      name: '',
      lastName: '',
      role: '',
      status: '',
      orders: [],
    };

    const userPromise = new Promise((resolve) => {
      resolve(user);
    });

    jest.spyOn(service, 'findOne').mockImplementation(async () => user);

    const userGet = controller.getUser('c5c3311b-fb2b-4b81-a896-afcea76f46ae');

    expect(userGet).toEqual(userPromise);
  });

  it('should return a user promise (using service mocking)', () => {
    const userGet = controller.getUser('c5c3311b-fb2b-4b81-a896-afcea76f46ae');

    expect(userGet).toEqual(mockUserPromise);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
