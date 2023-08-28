import { PrismaService } from "./PrismaService";
import { BusDataModel } from "../models/BusModel";
import { prismaAddBus, prismaDeleteBus, prismaFindBusById, prismaFindBusByNumber, prismaGetAllBuses, prismaUpdateBus } from "../db/bus";
import { Bus } from "@prisma/client";
import { Inject, Injectable } from "@tsed/di";
import { $log } from "@tsed/logger";
import { Conflict, NotFound } from "@tsed/exceptions";

@Injectable()
export class BusService {
    

    @Inject()
    protected prisma: PrismaService

    async registerNewBus(
        registerBusModel: BusDataModel
    ): Promise<{bus: Bus}> {
        try {
            const busExist = await prismaFindBusByNumber(this.prisma, registerBusModel.number)
            if(busExist){
                throw new Conflict(`Bus with number ${registerBusModel.number} already exist`)
            }
            const bus = await prismaAddBus(this.prisma, registerBusModel)
            return {bus};
        } catch (error) {
            $log.error(error);
            throw error
          }
    }


    async getAllBuses(): Promise<Bus[]> {
      return await prismaGetAllBuses(this.prisma);
    }

    async deleteBus(busID: string) {
      $log.info(`Deleting bus with id ${busID}`);
      const busExist = await this.getBusById(busID);
      if(!busExist){
        throw new NotFound(`Bus with id ${busID} not found`);
      }
      return await prismaDeleteBus(this.prisma, busID);
    }

    async getBusById(busID: string) {
      return await prismaFindBusById(this.prisma, busID);
    }

    async updateBus(busID: string, registerBusModel: BusDataModel) {
      $log.info(`Updating bus with id ${busID}`);
      const busExist = await this.getBusById(busID);
      if(!busExist){
        throw new NotFound(`Bus with id ${busID} not found`);
      }
      return await prismaUpdateBus(this.prisma, busID, registerBusModel);
    }
}