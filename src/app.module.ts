import { Module } from '@nestjs/common';
import { BookmarkModule } from './lift/lift.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
     BookmarkModule, PrismaModule,
  ConfigModule.forRoot({
    isGlobal:true
  })],
})
export class AppModule {}
