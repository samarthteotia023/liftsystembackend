import { Injectable, ParseIntPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";




@Injectable()
export class LiftService{

  constructor(private prisma: PrismaService){
   
  }
//Get all the lifts
  async getlifts(){
    return await this.prisma.lift.findMany({
        orderBy:{
            id:'asc'
        }
    })
  }
  
//Create Lifts initially   
  async createLifts(no_of_lifts: number) {
    console.log(no_of_lifts);
    let lifts: object[] = [];
  
    for (let index = 0; index < no_of_lifts; index++) {
      const newLift = await this.prisma.lift.create({
        data: {
          currentfloor: 0
        }
      });
      lifts.push(newLift);
      console.log(index);
    }
  
    return {lifts} ;
  }

//Move lifts
  async update(floor) {
    let bestLift = null;
    let minDistance = Number.MAX_SAFE_INTEGER;
    let alreadyExists = false;
  
    const lifts: any = await this.prisma.lift.findMany({
        orderBy:{
            currentfloor:'desc'
        }
    });
  
 //check if lift is already on the floor
    lifts.forEach(lift => {
      if (floor === lift.currentfloor) {
        alreadyExists = true;
      }
    });
  //check minimum distance of lifts which are in idle state amnd not in maintenance
    if (!alreadyExists) {
      lifts.forEach(lift => {
        if (!lift.maintenance && lift.state=="idle") {
          const distance = Math.abs(lift.currentfloor - floor);
          if (distance < minDistance) {
            minDistance = distance;
            
            bestLift = lift;
          }
        }
      });
    }
  //update the lift current floor and state with shortest distance
    if (bestLift) {
    bestLift=  await this.prisma.lift.update({
        where: { id: bestLift.id },
        data: {
          state: 'moving',
          currentfloor: floor
        }
      });
     
  //return all lifts 
      const updatedlift= await this.prisma.lift.findMany({
        orderBy:{
            id:'asc'

      }})
      return {updatedlift,minDistance,bestLift}

    } else {
      
      return { message: 'All lifts are currently busy or under maintenance, please wait'};
      
    }
  }
//Update the lift status after it reach its destination
  async updatestate(id:number){
   const lift = await this.prisma.lift.update({
        where: { id:id },
        data:{
            state:"idle"
        }
    })
    return lift
  }
//Handle the Maintenance of the lift
  async maintenance(id:any,data:any){
    const lifts: any = await this.prisma.lift.update({
        where: { id:id },
        data:{
            maintenance:!data,
            currentfloor:0,
            state:"idle"
        }
      })
 
 return lifts
    
  }

 


}

