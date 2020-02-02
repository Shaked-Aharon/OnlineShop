import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;
  public quantity: number = 1;
  public indexOfItem;
  public overAllPrice: number;

  constructor(
    private redux: NgRedux<AppState>,
    private cartsService: CartsService
  ) { }

  ngOnInit() {
  }

  public addToCart() {
    if(this.quantity < 1){
      alert("Quantity must be 1 or more");
      return;
    }
    this.indexOfItem = this.redux.getState().currentCart.cartProducts.indexOf(this.checkIfExistInCart());
    if (this.indexOfItem != -1) {
      this.redux.getState().currentCart.cartProducts[this.indexOfItem].quantity += this.quantity;
      this.redux.getState().currentCart.cartProducts[this.indexOfItem].totalPrice = this.redux.getState().currentCart.cartProducts[this.indexOfItem].quantity * this.product.price;
    } else {
      this.redux.getState().currentCart.cartProducts.push({
        _id: this.product._id,
        productName: this.product.name,
        quantity: this.quantity,
        totalPrice: this.quantity * this.product.price
      });
    }
    this.updateCartOverAllPrice();
    this.cartsService.updateCurrentCart();
  }

  public checkIfExistInCart() {
    return this.redux.getState().currentCart.cartProducts.find(cp => cp._id === this.product._id)
  }

  public updateCartOverAllPrice() {
    this.overAllPrice = 0;
    this.redux.getState().currentCart.cartProducts.map(cp => this.overAllPrice += cp.totalPrice);
    this.redux.getState().currentCart.overallPrice = this.overAllPrice;
  }
}
