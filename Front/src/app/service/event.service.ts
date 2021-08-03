import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Events } from '../models/eventos.models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public rute: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identity;
  public dataEvent;
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
  }

  listEvent():Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', localStorage.getItem("token"));
    return this._http.get(this.rute + 'user/events', { headers: headersToken})
  }

  registerEvents(event: Events, id: String){
      let params = JSON.stringify(event);
      let headersToken = this.headersVariable.set('Authorization', localStorage.getItem("token"))
      return this._http.post(this.rute + 'user/'+id+'/event/register', params,{ headers: headersToken})
  }

  getEventId(id: String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', localStorage.getItem("token"))
    return this._http.get(this.rute + 'user/'+id+'/events',{ headers: headersToken})
  }

  getDataEvent(){
    var data2 = JSON.parse(localStorage.getItem('dataEvent'));
      if (data2 != 'undefined'){
        this.dataEvent = data2;
      }else {
        this.dataEvent = null;
      }
      return this.dataEvent;
  }

}

