import { CollectionOf, Example, Groups, Required } from "@tsed/schema";


export class BusDataModel {

    @Example("110ec58a-a0f2-4ac4-8393-c866d813b8d1")
    @Groups("!creation","delete","!update")
    busID?: string

    @Example("T1124","!delete")
    @Required()
    @Groups("creation","!update")
    number: string

    @Required()
    @Groups("creation","update")
    capacity: number

    @Groups("!creation","!delete","!update")
    createdAt?: Date;

    @Groups("!creation","!delete","!update")
    updatedAt?: Date;
    
}

export class BusGetAllResponseModel {

    @Required()
    @CollectionOf(BusDataModel)
    busses: BusDataModel[]
}