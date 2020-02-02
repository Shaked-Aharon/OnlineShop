import { Product } from '../models/product';
import { Category } from '../models/../models/category';
import { Cart } from '../models/cart';
import { User } from '../models/user';
import { Order } from '../models/order';

export class AppState {
    // Products Sector
    public allProducts: Product[] = [];
    public productsToShow: Product[];
    public categories: Category[] = [];
    public foundProducts: Product[] = [];
    // Users Sector
    public currentUser: User | undefined;
    public loggedIn: boolean = this.currentUser ? true : false;
    public isAdmin: boolean = false;
    public ordersHistory: Order[] = [];
    public currentCart: Cart;
    // Various Sector
    public searchOn: boolean = false;
    public cities: any = [];
    public loading: boolean = false;
    public totalOrders: number = 0;
}