import {  BodyParams, Logger, PathParams } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Delete, Get, Groups, Patch, Post, Returns, Summary } from "@tsed/schema";
import { BusDataModel } from "../../models/BusModel";
import { BusService } from "../../services/BusService";
import { NotFound } from "@tsed/exceptions";
import { UserType } from "@prisma/client";
import { AuthRoles } from "../../decorators/authRoles";
import { BasicAuth } from "../../decorators/basicAuth";


@BasicAuth()
@Controller('/bus')
export class BusController{
    constructor(
        private logger: Logger,
        protected busService: BusService
    ){}

    @Get('/')
    @Summary("Get all buses")
    @AuthRoles(UserType.ADMIN, UserType.STAFF)
    async getAllBusDetails() {
        this.logger.info("Get all buses details");
        const buses = await this.busService.getAllBuses();
        return buses;
    }

    @Get("/:busID")
    @Summary("Get bus by id")
    @Returns(200, BusDataModel)
    @Returns(404).Description("Not found")
    @AuthRoles(UserType.ADMIN, UserType.STAFF)
    async getBusById(
        @PathParams("busID") busID: string
    ) {
        this.logger.info("Get bus by id");
        const bus = await this.busService.getBusById(busID);
        if (!bus) {
            throw new NotFound(`Bus with id ${busID} not found`);
        }
        return bus;
    }


    @Post('/')
    @Summary("Register new bus")
    @Returns(201)
    @Returns(409).Description("Bus already exist")
    @AuthRoles(UserType.ADMIN, UserType.STAFF)
    async registerNewBus(
        @BodyParams() @Groups("creation") registerBusModel: BusDataModel
    ) {
        this.logger.info("Register new bus");
        const bus = await this.busService.registerNewBus(registerBusModel);
        return bus;
    }

    @Patch('/:busID')
    @Summary("Update bus")
    @Returns(201)
    @Returns(404).Description("Bus not found")
    @AuthRoles(UserType.ADMIN, UserType.STAFF)
    async updateBus(
        @PathParams("busID") busID: string,
        @BodyParams() @Groups("update") registerBusModel: BusDataModel
    ) {
        this.logger.info("Update new bus");
        const bus = await this.busService.updateBus(busID, registerBusModel);
        return bus;
    }

    @Delete('/:busID')
    @Summary("Delete new bus")
    @Returns(204)
    @Returns(404).Description("Bus not found")
    @AuthRoles(UserType.ADMIN, UserType.STAFF)
    async deleteBus(
        @PathParams("busID") busID: string
    ) {
        this.logger.info("Delete new bus");
        const bus = await this.busService.deleteBus(busID);
        return {
            message: `Bus with id ${bus.busNumber} deleted successfully`
        };
    }
}