import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppState } from '../redux/appState';
import { NgRedux } from 'ng2-redux';
import { Router } from '@angular/router';
import { User } from '../models/user';
import functions from '../../assets/functions';
import { CartsService } from './carts.service';
import { ActionType } from '../redux/actionType';
import { Cart } from '../models/cart';
import { OrdersService } from './orders.service';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from '../models/product';
import { CategoriesService } from './categories.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cartService: CartsService,
    private httpClient: HttpClient,
    private redux: NgRedux<AppState>,
    private router: Router,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  public async initialRedux(user: any) {
    this.redux.getState().currentUser = user.currentUser;
    this.redux.getState().loggedIn = true;
    this.redux.getState().isAdmin = user.isAdmin;
    this.redux.getState().searchOn = false;
    this.redux.getState().loading = false;
    this.redux.getState().totalOrders;
    await this.ordersService.getOrdersHistory(user.currentUser._id)
    .subscribe((orders: Order[]) => this.redux.getState().ordersHistory = orders);

    await this.productsService.getAllProducts()
    .subscribe((allProducts: Product[]) => {
      this.redux.getState().allProducts = allProducts;
      this.redux.getState().productsToShow = allProducts;
    });
    await this.ordersService.getTotalOrders()
    .subscribe((count: number) => this.redux.getState().totalOrders = count);
    await this.categoriesService.getAllCategories()
    .subscribe((allCategories: Category[]) => this.redux.getState().categories = allCategories);
  }

  public loginCookie(): void {
    if(document.cookie == "") return;
    this.httpClient
      .get<User>('http://localhost:3000/api/auth/cookie', {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-type', 'application/json')
      })
      .subscribe(async (user: any) => {
        await this.initialRedux(user);
        this.cartService.initialCart();
        this.router.navigate([`${this.router.routerState.snapshot.url}`]);
      },
        err => {
          this.redux.getState().currentUser = new User();
          this.router.navigate(['/login']);
          // console.log(err);
        });
  }

  // Registration
  public addUser(user: User): void {
    this.httpClient
      .post<User>('http://localhost:3000/api/auth/register', user, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
      .subscribe((user: User): void => {
        alert("Welcome To Your First Shopping Experience!. \n Please visit your profile page and update your default address.");
        this.initialRedux(user);
        this.cartService.initialCart();
        this.router.navigate(['/home']);
      },
        err => alert(err.error));
  }

  // Logging Out
  public logout(user: User): void {
    this.httpClient
      .post<User>(`http://localhost:3000/api/auth/logout`, user, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
        const action = { type: ActionType.newCart, payload: new Cart() };
        this.redux.dispatch(action);
        this.redux.getState().currentUser = new User();
        this.redux.getState().loggedIn = false;
        this.redux.getState().foundProducts = [];
        this.redux.getState().loading = false;
        this.redux.getState().isAdmin = false;
        document.cookie += '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "";
        this.router.navigate(['/login']);
      },
        err => alert(err.error.message));
  }

  public loginUser(user: User): Observable<User | string> {
    return this.httpClient
      .post<User | string>('http://localhost:3000/api/auth/login', user, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('content-type', 'application/json')
      });
  }
}
