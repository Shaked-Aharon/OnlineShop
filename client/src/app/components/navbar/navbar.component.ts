import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public redux: NgRedux<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public handleLogOut(){
    this.authService.logout(this.redux.getState().currentUser);
  }

}
