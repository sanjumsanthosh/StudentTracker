import { Injectable, OnDestroy, OnInit } from "@tsed/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnInit, OnDestroy {
    async $onInit(): Promise<void> {
        await this.$connect();
    }

    async $onDestroy(): Promise<void> {
        await this.$disconnect();
    }
}