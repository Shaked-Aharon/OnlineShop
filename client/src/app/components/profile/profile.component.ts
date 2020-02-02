import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Address } from 'src/app/models/address';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser: User = new User();
  public err: string[] = [];

  constructor(
    public redux: NgRedux<AppState>,
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if(this.redux.getState().currentUser == undefined){
      this.router.navigate(["/home"]);
    }
      this.currentUser = this.redux.getState().currentUser;
  }

  public saveProfileChanges(){
    this.err = [];
    if(this.currentUser.address.city.length == 0) {this.err.push("City is requierd");}
    if(this.currentUser.address.street.length == 0) {this.err.push("Street is requierd");}
    if(!this.currentUser.address.house) {this.err.push("House number is requierd");}
    if(this.err.length == 0){
      this.usersService.updateUser(this.currentUser);
    }
  }
}
