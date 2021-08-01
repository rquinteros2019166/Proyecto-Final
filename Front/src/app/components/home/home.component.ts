import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: any = {rolUser: "DEFAULT"};

  constructor(
    private _router: Router
  ) {
    let identidad;
    if(identidad = localStorage.getItem('identity')){
      this.user = JSON.parse(localStorage.getItem('identity'));
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this._router.navigate(['/home'])
    }
  }

}
