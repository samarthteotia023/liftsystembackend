import { Module } from '@nestjs/common';
import { LiftService } from './lift.service';
import { LiftController } from './lift.controller';

@Module({
    providers:[LiftService],
    controllers:[LiftController]
})
export class BookmarkModule {}
