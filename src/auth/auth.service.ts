import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    const user = await this.userModel.findOne({ email: 'admin@email.com' });
    if (!user) {
      const saltOrRounds = 10;
      const password = 'admin';
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      await this.userModel.create({
        name: 'admin',
        email: 'admin@email.com',
        password: hashedPassword,
      });
    }
  }

  async login(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }

    return user;
  }
}
