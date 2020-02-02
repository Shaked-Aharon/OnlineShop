import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public redux: NgRedux<AppState>,
    private authService: AuthService,
    private ordersService: OrdersService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) { }

  async ngOnInit() {
    await this.authService.loginCookie();
    this.homePageDataFetch();
  }

  private async homePageDataFetch(){
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

}
