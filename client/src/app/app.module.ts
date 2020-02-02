import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';

import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';

//redux import
import { NgRedux, NgReduxModule } from "ng2-redux";
import { Reducer } from './redux/reducer';
import { AppState } from './redux/appState';


@NgModule({
  declarations: [
    LayoutComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    ProductDetailsComponent,
    OrderComponent,
    OrderDoneComponent,
    AdminComponent
  ],
  imports: [
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never"}),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(redux: NgRedux<AppState>) {
    redux.configureStore(Reducer.reduce, new AppState());
  }
 }
