import { Address } from './address';
export class User {
    public constructor(
        public _id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public username?: string,
        public password?: string,
        public address?: Address
    ) {}
}