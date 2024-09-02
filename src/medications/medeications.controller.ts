import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { ZodValidationPipe } from '../pipes/zodValidation.pipe';
import { createMedicationSchema } from './zodSchemas/createMedication.schemas';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('medications')
@UseGuards(JwtGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  //   add new medication
  @Post()
  async createMedication(
    @Body(new ZodValidationPipe(createMedicationSchema))
    { name, label, code, isGeneric, isReciep, price },
  ) {
    const getMedication = await this.medicationsService.get(code);
    if (getMedication) {
      throw new BadRequestException('Medication already exists');
    }

    return await this.medicationsService.create({
      name,
      label,
      code,
      price,
      isGeneric,
      isReciep,
    });
  }

  //   get medication by code
  @Get(':code')
  async getMedications(@Param('code') code: string) {
    const get = await this.medicationsService.get(code);

    if (!get) {
      throw new NotFoundException({ message: 'Medication not found' });
    }

    return get;
  }

  //   get all medications
  @Get()
  async getAllMedications() {
    return await this.medicationsService.getAll();
  }

  //   update medication by code
  @Put(':code')
  async updateMedications(
    @Param('code') code: string,
    @Body(new ZodValidationPipe(createMedicationSchema))
    { name, label, isGeneric, isReciep, price },
  ) {
    const get = await this.medicationsService.get(code);
    if (!get) {
      throw new NotFoundException({ message: 'Medication not found' });
    }

    const update = await this.medicationsService.update(code, {
      name,
      label,
      isGeneric,
      isReciep,
      price,
    });

    return {
      name,
      label,
      isGeneric,
      isReciep,
      price,
      code,
    };
  }

  //   delete medication by code
  @Delete(':code')
  async deleteMedications(@Param('code') code: string) {
    const get = await this.medicationsService.get(code);
    if (!get) {
      throw new NotFoundException({ message: 'Medication not found' });
    }
    await this.medicationsService.delete(code);

    return {
      message: 'Medication deleted successfully',
    };
  }
}
