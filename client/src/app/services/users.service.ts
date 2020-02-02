import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private redux: NgRedux<AppState>
  ) { }

  public updateUser(user){
    this.http.put("http://localhost:3000/api/users", user)
      .subscribe(result => {
        console.log(result);
        this.redux.getState().currentUser = user;
      });
  }
}
