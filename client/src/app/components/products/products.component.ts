import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { CartsService } from 'src/app/services/carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  public searchInput;

  constructor(
    public redux: NgRedux<AppState>,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartsService: CartsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.onInitAsync();
  }

  public handleCheckOut(){
    if(this.redux.getState().currentCart.cartProducts.length == 0){
      alert("Please pick at least 1 product")
      return;
    }
    this.router.navigate(['/order'])
  }

  public async onInitAsync() {
    if (this.redux.getState().allProducts.length === 0) {
      this.redux.getState().loading = true;
      await this.productsService.getAllProducts().subscribe((allProducts: Product[]) => {
        this.redux.getState().allProducts = allProducts;
        this.redux.getState().productsToShow = allProducts;
        this.redux.getState().loading = false;
      });
    }
  }

  public changeCategory(e, category) {
    if (category) {
      this.redux.getState().productsToShow = this.redux.getState().allProducts.filter(p => p.category == category._id);
      return;
    }
    this.redux.getState().productsToShow = this.redux.getState().allProducts;
    return;
  }

  public searchProductByName() {
    this.redux.getState().productsToShow = this.redux.getState().allProducts.filter(p => p.name.toUpperCase().indexOf(this.searchInput.toUpperCase()) != -1)
  }

  public deleteFromCart(cp) {
    let indexOfCP = this.redux.getState().currentCart.cartProducts.indexOf(cp);
    this.redux.getState().currentCart.overallPrice -= this.redux.getState().currentCart.cartProducts[indexOfCP].totalPrice;
    this.redux.getState().currentCart.cartProducts.splice(indexOfCP, 1);
    this.cartsService.updateCurrentCart();
  }
}
