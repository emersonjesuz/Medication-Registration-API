import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MedicationsModule } from './medications/medications.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestdb'), // Conexão MongoDB
    AuthModule,
    MedicationsModule,
  ],
})
export class AppModule {}
