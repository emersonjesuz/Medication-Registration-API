import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Medication {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  label: string;

  @Prop({ unique: true })
  code: string;

  @Prop({ default: false })
  isGeneric: boolean;

  @Prop({ default: false })
  isReciep: boolean;

  @Prop({ required: true })
  price: number;
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);
