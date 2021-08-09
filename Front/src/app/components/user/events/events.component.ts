import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/models/eventos.models';
import { EventService } from 'src/app/service/event.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public token: String;
  public modelEvent: Events;
  public user: any;
  tableEvents: any[];
  events: any[] = [];
  public viewEvent:any = {
      _id: "",
      nameEvent: "",
      descriptionEvent: "",
      typeEvent: "",
      dateEvent: new Date(Date.now()).toISOString().substr(0, 16)
  };

  constructor(
    public  _eventService: EventService,
    public _userService: UserService,
    public _router: Router,

  ) {

    this.user = JSON.parse(localStorage.getItem("identity"));
    this.token = this._userService.getToken();
    this.modelEvent = new Events('','','','','','','')
    this.obtenerEvent();

  }


  ngOnInit(): void {
  }

  get(id){
    var encontrado = false;
    for (let i = 0; i < this.tableEvents.length && encontrado == false; i++) {
      if(this.tableEvents[i]._id == id){
        this.viewEvent = this.tableEvents[i];
      }
    }
  }

addEvent(){
  this._eventService.registerEvents(this.modelEvent, this.user._id)
  .subscribe(
      response=>{
        console.log(response)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se creo correctamente el evento',
            showConfirmButton: false,
            timer: 1500
        })
        this._router.navigate(['/events'])

        this.obtenerEvent();
      },
      error=>{
        console.log(<any>error)

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
  )
}

limpiar(){
  this.modelEvent = {
    _id: "",
   nameEvent: "",
   descriptionEvent: "",
   statusEvent: "",
   typeEvent: "",
   dateEvent: new Date(Date.now()).toISOString().substr(0, 16),
   userEvent: ""
  };


}

obtenerEvent(){
  let useriD = JSON.parse(localStorage.getItem('identity'))._id;
  this._eventService.getEventId(useriD).subscribe(response =>{
    var array =[];
   
    response.data.forEach(element =>{
      var tableEvents = {
        _id: element._id,
        nameEvent: element.nameEvent,
        descriptionEvent: element.descriptionEvent,
        typeEvent: element.typeEvent,
        dateEvent: new Date(element.dateEvent).toISOString().substr(0, 16)
      }
      array.push(tableEvents);
    });

    this.tableEvents = array; 
  }, error => {
    console.log(error);
  });
}



}
