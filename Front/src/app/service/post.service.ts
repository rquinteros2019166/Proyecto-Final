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
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
  }

  register(post:Post): Observable<any>{
    let params = JSON.stringify(post);
    let headersVariable = this.headersVariable.set("Authorization", localStorage.getItem('token'));
    return this._http.post(this.rute + 'user/post/register', params, { headers: headersVariable })
  }

  edit(post:Post, id: String): Observable<any>{
    let params = JSON.stringify(post);
    let headersVariable = this.headersVariable.set("Authorization", localStorage.getItem('token'));
    return this._http.put(this.rute + 'user/posts/'+id, params, { headers: headersVariable })
  }
}
