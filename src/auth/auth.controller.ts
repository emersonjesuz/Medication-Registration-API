import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../pipes/zodValidation.pipe';
import { createUserSchema } from './zodSchemas/createUser.schemas';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body(new ZodValidationPipe(createUserSchema)) body: any,
    @Res() res: Response,
  ) {
    const { email, password } = body;

    // get user by email
    const { access_token, user } = await this.authService.login(email);

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

    res.status(200).json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  }
}
