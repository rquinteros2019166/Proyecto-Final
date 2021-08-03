import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GLOBAL } from './global.service';
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


  login(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = getToken
    }
    let params = JSON.stringify(user);
    return this._http.post(this.rute + 'user/login', params, { headers: this.headersVariable })
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headersToken;
    if(localStorage.getItem("token")){
      headersToken = this.headersVariable.set('Authorization', localStorage.getItem("token"))
    }else{
      headersToken = this.headersVariable;
    }
    return this._http.post(this.rute + 'user/register', params, { headers: headersToken })
  }

  getToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != 'undefined') {
      this.token = token2;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));
    if (identity2 != 'undefined') {
      this.identity = identity2;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  editar(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.rute + 'user/'+user._id, params, { headers: headersToken })
  }

  getUsers(): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.get(this.rute + 'users', { headers: headersToken })
  }

  eliminar(id: String): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.rute + 'user/' + id, { headers: headersToken })
  }
}



