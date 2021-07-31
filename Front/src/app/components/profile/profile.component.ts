import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userModel: User
  constructor() {
    this.userModel = new User("","","",0,"","","");
   }

  ngOnInit(): void {
  
  }

  profile(){
    

  }

}
