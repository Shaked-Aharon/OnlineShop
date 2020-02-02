import { User } from './user';
import { Address } from './address';
import { Cart } from './cart';
export class Order {
    public constructor(
        public _id?: string,
        public user?: User | string,
        public cart?: Cart | string,
        public address?: Address,
        public totalPrice?: Number,
        public dateToDeliver?: string,
        public orderedAt?: Date,
        public cc?: {
            number: string,
            expiration: string,
            cvv: string
        }) {
    }
}