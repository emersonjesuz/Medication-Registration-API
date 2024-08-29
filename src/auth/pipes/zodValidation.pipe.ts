import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  async transform(value: any) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      // getting the message property
      const message = error.errors[0].message;

      throw new BadRequestException({
        message,
      });
    }
  }
}
