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

  constructor(
    public  _eventService: EventService,
    public _userService: UserService,
    public _router: Router
  ) {

    this.token = this._userService.getToken();
    this.modelEvent = new Events('','','','','',)

  }

  ngOnInit(): void {
  }

addEvent(){
  this._eventService.registerEvents(this.modelEvent, this.token)
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
        this._router.navigate(['/home'])
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
   nameEvent: "",
   descriptionEvent: "",
   statusEvent: "",
   typeEvent: "",
   dateEvent: new Date(Date.now()).toISOString().substr(0, 16)
  };
}

}
