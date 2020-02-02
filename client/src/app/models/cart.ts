import { Product } from './product';
import { HttpClient } from '@angular/common/http';
export class Cart {

    private http: HttpClient;

    public constructor(
        public user?: string,
        public isActive: boolean = true,
        public date?: Date,
        public _id?: string,
        public cartProducts: {
            _id?: string,
            productName?: string,
            quantity?: number,
            totalPrice?: number
        }[] = [],
        public overallPrice: number = 0) {
    }

    public close() {
        this.http.put("http://localhost:3000/api/carts/close", {
            user: this.user
        });
    }
}