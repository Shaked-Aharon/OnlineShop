import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginErr: string = "";
  public user: User = new User();

  constructor(
    public authService: AuthService,
    private redux: NgRedux<AppState>,
    private router: Router,
    private cartService: CartsService,
  ) { }

  ngOnInit() {
  }

  public handleLogin() {
    if (this.validateForm()) {
      this.authService.loginUser(this.user)
        .subscribe((response: User | string): void => {
          if (typeof response == "string") {
            this.loginErr = response;
            return;
          }
          this.authService.initialRedux(response);
          this.cartService.initialCart();
          this.router.navigate([`/home`]);
        });
    }
  }

  public validateForm() {
    if (this.user.username == undefined || this.user.password == undefined) {
      this.loginErr = "You Must Fill Both Username and Password";
      return false;
    }
    return true;
  }

}
