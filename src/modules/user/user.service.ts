import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users = [];

  async create(username: string, password: string) {
    const userExists = this.users.some((user) => user.username === username);
    if (userExists) {
      throw new Error('User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: (this.users.length + 1).toString(),
      username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    console.log('Created User:', newUser);
    return newUser;
  }

  async findOne(username: string) {
    console.log(`Searching for user: ${username}`);
    return this.users.find((user) => user.username === username);
  }
}
