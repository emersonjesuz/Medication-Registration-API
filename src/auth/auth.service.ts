import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // OnModuleInit is used to create an admin user if it doesn't exist
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

  //  performs user login and returns access token
  async login(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }

    return {
      access_token: this.jwtService.sign(
        { email: user.email },
        {
          expiresIn: '1d',
          secret: process.env.JWT_SECRET,
        },
      ),
      user,
    };
  }
}
