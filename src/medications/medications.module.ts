import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicationSchema } from '../schemas/medication.schema';
import { MedicationsController } from './medeications.controller';
import { MedicationsService } from './medications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Medication', schema: MedicationSchema },
    ]),
  ],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [],
})
export class MedicationsModule {}
