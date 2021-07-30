import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      let identidad = JSON.parse(localStorage.getItem("identity"));

      if(identidad.rolUser == "CLIENT"){
        this._router.navigate(['/client'])
      }
    }else{
      this._router.navigate(['/login'])
    }
  }

}
