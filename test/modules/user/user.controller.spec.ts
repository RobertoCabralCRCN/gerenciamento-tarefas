import { UserController } from '@modules/user/user.controller';
import { UserService } from '@modules/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const createUserDto = { username: 'testuser', password: 'testpassword' };
    const createdUser = { id: '1', ...createUserDto };

    jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

    const result = await controller.create(createUserDto);

    expect(result).toEqual(createdUser);
    expect(userService.create).toHaveBeenCalledWith(
      createUserDto.username,
      createUserDto.password,
    );
  });

  it('should throw an error when user already exists', async () => {
    const createUserDto = { username: 'existingUser', password: 'password123' };

    jest
      .spyOn(userService, 'create')
      .mockRejectedValue(new Error('User Already Exists'));

    await expect(controller.create(createUserDto)).rejects.toThrow(
      'User Already Exists',
    );
  });
});
