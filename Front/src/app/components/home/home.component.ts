import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      let identidad = JSON.parse(localStorage.getItem("identity"));

      if(identidad.rolUser == "ADMIN"){
        this._router.navigate(['/admin'])
      }else if(identidad.rolUser == "CLIENT"){
        this._router.navigate(['/client'])
      }
    }
  }

}
