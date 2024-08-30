import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Medication } from '../schemas/medication.schema';
import { Model } from 'mongoose';

interface IMedication {
  name: string;
  label: string;
  code: string;
  price: number;
  isGeneric?: boolean;
  isReciep?: boolean;
}
@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication.name)
    private medicationModel: Model<Medication>,
  ) {}

  //   add medication to database
  async create(medication: IMedication) {
    return new this.medicationModel({ ...medication }).save();
  }

  //   get medication by code from database
  async get(code: string) {
    return await this.medicationModel.findOne({ code });
  }

  //   get all medications from database
  async getAll() {
    return await this.medicationModel.find();
  }

  //   delete medication from database
  async delete(code: string) {
    return await this.medicationModel.deleteOne({ code });
  }

  //   update medication in database
  async update(code: string, medication: Omit<IMedication, 'code'>) {
    return await this.medicationModel.updateOne({ code }, { ...medication });
  }
}
