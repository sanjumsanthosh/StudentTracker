import { Bus } from "@prisma/client";
import { BusDataModel } from "../../models/BusModel";
import { PrismaService } from "../../services/PrismaService";

export function prismaAddBus(prisma: PrismaService, busModel: BusDataModel): Promise<Bus> {
    
    return prisma.bus.create({
        data: {
            busNumber: busModel.number,
            capacity: busModel.capacity
        }
    })
}

export function prismaUpdateBus(prisma: PrismaService, busID:string, busModel: BusDataModel): Promise<Bus> {

    return prisma.bus.update({
        where:{
            id: busID
        },
        data: {
            capacity: busModel.capacity,
            updatedAt: new Date()
        }
    })
}


export function prismaGetAllBuses(prisma: PrismaService): Promise<Bus[]> {
    return prisma.bus.findMany();
}

export function prismaDeleteBus(prisma: PrismaService, busId: string) {
    return prisma.bus.delete({
        where:{
            id: busId
        },
        
    })
}

export function prismaFindBusById(prisma: PrismaService, busId: string) {
    return prisma.bus.findUnique({
        where:{
            id: busId
        },
        
    })
}

export function prismaFindBusByNumber(prisma: PrismaService, busNumber: string) {
    return prisma.bus.findFirst({
        where:{
            busNumber: busNumber
        },
        
    })
}