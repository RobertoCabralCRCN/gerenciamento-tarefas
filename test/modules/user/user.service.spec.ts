import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../src/modules/user/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with a hashed password', async () => {
    const username = 'testuser';
    const password = 'testpassword';

    const newUser = await service.create(username, password);

    expect(newUser).toHaveProperty('id');
    expect(newUser.username).toBe(username);
    expect(await bcrypt.compare(password, newUser.password)).toBe(true);
  });

  it('should throw an error when trying to create a duplicate user', async () => {
    const username = 'duplicateUser';
    const password = 'password123';

    await service.create(username, password);

    await expect(service.create(username, password)).rejects.toThrow(
      'User Already Exists',
    );
  });

  it('should find a user by username', async () => {
    const username = 'existingUser';
    const password = 'password123';

    const createdUser = await service.create(username, password);
    const foundUser = await service.findOne(username);

    expect(foundUser).toEqual(createdUser);
  });

  it('should return undefined when searching for a non-existent user', async () => {
    const foundUser = await service.findOne('nonExistentUser');
    expect(foundUser).toBeUndefined();
  });
});
