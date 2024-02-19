import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { LiftService } from './lift.service';


@Controller('lift')
export class LiftController {
  constructor(private liftservice: LiftService) {}

  //Update Lift Movement
  @Put('move/:floor')
  update(@Param('floor', ParseIntPipe) floor: number) {
    return this.liftservice.update(floor);
  }

  //Get all lifts
  @Get('alllifts')
  getlifts() {
    return this.liftservice.getlifts();
  }
  
  //Update lift state to idle after it reach its destination
  @Put('updatestate/:id')
  updatestate(@Param('id', ParseIntPipe) id: number) {
    return this.liftservice.updatestate(id);
  }

  //Create lifts initially
  @Post('create')
  create(@Body() { data }: any) {
    return this.liftservice.createLifts(data.lift);
  }


  //Handle maintenance
  @Put('maintenance')
  maintenance(@Body() { data }: any) {
    return this.liftservice.maintenance(
      data?.values.id,
      data?.values?.maintenance,
    );
  }
}
