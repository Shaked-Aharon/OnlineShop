import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Address } from 'src/app/models/address';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public months = new Array(12);
  public years = [];
  public address: Address = this.redux.getState().currentUser.address;
  public currentDate = new Date();
  public order: Order = new Order();
  public deliverDate;
  public deliverTime;
  public ccMM = "";
  public ccYY = "";
  public ccNumber = "";
  public ccCVV = "";
  public err: string[];

  constructor(
    public redux: NgRedux<AppState>,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.fillYears();
  }

  public fillYears() {
    let year = new Date().getFullYear();
    this.years.push(year);
    for (let i = 1; i < 12; i++) {
      this.years.push(year + i);
    }
  }

  public processOrder() {
    this.order.address = this.address;
    this.order.dateToDeliver = `${this.deliverDate} ${this.deliverTime}`;
    this.order.user = this.redux.getState().currentUser._id;
    this.order.cart = this.redux.getState().currentCart._id;
    this.order.cc = {
      number:this.ccNumber,
      cvv: this.ccCVV,
      expiration: this.ccMM + "/" + this.ccYY
    };
    this.order.orderedAt = new Date();
    this.order.totalPrice = this.redux.getState().currentCart.overallPrice;
    this.ordersService.addOrder(this.order);
    this.redux.getState().totalOrders = this.redux.getState().totalOrders + 1; 
  }

  public formValidate(){
    this.err = [];
    if(this.address.city.length == 0) {this.err.push("City is requierd");}
    if(this.address.street.length == 0) {this.err.push("Street is requierd");}
    if(!this.address.house) {this.err.push("House number is requierd");}
    if(this.deliverDate == undefined || this.deliverDate == "" || this.deliverTime == undefined || this.deliverTime == ""){this.err.push("Must Enter Date and Time to deliver");}
    if(this.ccCVV.length != 3){this.err.push("CVV Must be 3 digit");}
    if(this.ccMM == "" || this.ccYY == ""){this.err.push("CC experation date is requierd");}
    if(this.ccNumber.length < 7){this.err.push("CC number is requierd (at least 7 digit)");}

    if(this.err.length == 0){
      this.processOrder();
    }
  }
}
