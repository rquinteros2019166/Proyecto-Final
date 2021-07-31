import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public rute: String;
  public token;
  public identity;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
  }

  list(): Observable<any>{
    let headersVariable = this.headersVariable.set("Authorization", localStorage.getItem('token'));
    return this._http.get(this.rute + 'user/posts', { headers: headersVariable })
  }

  register(post:Post): Observable<any>{
    let params = JSON.stringify(post);
    let headersVariable = this.headersVariable.set("Authorization", localStorage.getItem('token'));
    return this._http.post(this.rute + 'user/post/register', params, { headers: headersVariable })
  }

  editar(post:Post): Observable<any>{
    let params = JSON.stringify(post);
    let headersVariable = this.headersVariable.set("Authorization", localStorage.getItem('token'));
    return this._http.put(this.rute + 'user/post/'+post._id, params, { headers: headersVariable })
  }

  eliminar(id: String): Observable<any>{
    let headersVariable = this.headersVariable.set("Authorization", localStorage.getItem('token'));
    return this._http.delete(this.rute + 'user/post/'+id, { headers: headersVariable })
  }
}
