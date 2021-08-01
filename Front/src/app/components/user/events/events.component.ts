import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/models/eventos.models';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public token: String;
  public modelEvent: Events;

  constructor(
    public _userService: UserService,
    public _router: Router
  ) {

    this.token = this._userService.getToken();
    this.modelEvent = new Events('','','','','',)

  }

  ngOnInit(): void {
  }


}
