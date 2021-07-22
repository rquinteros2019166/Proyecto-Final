import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public userModel: User;
  public token;
  public identity;
  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.userModel = new User("","","",0,"","","")
   }
  ngOnInit(): void {
  }

  getToken(): void{
    this._userService.login(this.userModel, 'true').subscribe(
      response =>{
        this.token = response.token
        localStorage.setItem('token', this.token)
      }
    )

  }
}
