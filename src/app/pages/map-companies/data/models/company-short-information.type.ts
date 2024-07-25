import {ICompanyBase} from "../../../../core/models";

export type ICompanyShortInformation = Pick<ICompanyBase, 'latitude' | 'longitude' | 'business_name' | 'type' | 'phone_number' | 'id'>
