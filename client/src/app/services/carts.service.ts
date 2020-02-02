import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionType } from '../redux/actionType';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(
    private redux: NgRedux<AppState>,
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) { }


  public async initialCart() {
    const _id = this.redux.getState().currentUser._id;
    await this.httpClient.get<Cart | undefined>(`http://localhost:3000/api/carts/${_id}`)
      .subscribe(async (hasActiveCart: Cart | undefined) => {
        if (hasActiveCart && hasActiveCart.isActive) {
            const cart: Cart = hasActiveCart;
            this.redux.getState().currentCart = cart;
            return;
        }
        await this.httpClient.post(`http://localhost:3000/api/carts`, {
          user: _id,
          isActive: true,
          overallPrice: 0
        }).subscribe((cart: Cart | any) => this.redux.getState().currentCart = cart);
      });
  }

  public updateCurrentCart(){
    this.httpClient.put("http://localhost:3000/api/carts", this.redux.getState().currentCart)
    .subscribe(res => res);
  }
}
