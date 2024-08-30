import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../pipes/zodValidation.pipe';
import { createUserSchema } from './zodSchemas/createUser.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body(new ZodValidationPipe(createUserSchema)) body: any) {
    const { email, password } = body;

    // get user by email
    const user = await this.authService.login(email);

    // verify if user exists
    if (!user) {
      throw new NotFoundException({
        message: 'user not found',
      });
    }

    // verify if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException({
        message: 'invalid email or password',
      });
    }

    return user;
  }
}
