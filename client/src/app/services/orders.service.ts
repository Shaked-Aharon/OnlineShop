import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { CartsService } from './carts.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private cartsService: CartsService,
    private router: Router,
  ) { }

  public addOrder(order){
    return this.http.post("http://localhost:3000/api/orders", order)
      .subscribe(() => {
        this.http.put("http://localhost:3000/api/carts/close", {cart_id: order.cart})
          .subscribe(() => {
            this.cartsService.initialCart();
            this.router.navigate(["/order-done"]);
          });
      });
  }

  public getOrdersHistory(_id) {
    return this.http.get<Order[]>(`http://localhost:3000/api/orders/${_id}`);
  }

  public getTotalOrders(){
    return this.http.get("http://localhost:3000/api/orders/total");
  }
}
