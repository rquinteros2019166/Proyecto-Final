import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public rute: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identity;
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
  }

  listEvent():Observable<any>{
    return this._http.get(this.rute+'listevents')
  }

  registerEvents(event: Event, token): Observable<any>{

  }

  getEvents(): Observable<any> {
    return this._http.get(this.rute + 'user/get', { headers: this.headersVariable })
  }

}

