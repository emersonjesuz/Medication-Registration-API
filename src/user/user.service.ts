// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(name: string, email: string, age: number): Promise<User> {
    const newUser = new this.userModel({ name, email, age });
    return newUser.save();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
