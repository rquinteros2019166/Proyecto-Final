import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {GLOBAL} from './global.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public rute: String;
  public token;
  public identity;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
   }

   login(user, getToken = null):Observable<any>{
     let params = JSON.stringify(user);
     return this._http.post(this.rute+'user/register',params,{headers: this.headersVariable})

   }
}
