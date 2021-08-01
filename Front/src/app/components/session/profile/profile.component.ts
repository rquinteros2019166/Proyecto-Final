import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model'
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public userModel: User;
  
  constructor( private userService: UserService){
   }

  ngOnInit(): void {
    
  }

  getUserId(id){
    this.userService.getUser(id).subscribe(
      response =>{
        this.userModel = response.userFound;
      }
    )
  }

  profileEdit(){
    this.userService.editUser(this.userModel,this.userModel).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El usuario se edito correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('User',JSON.stringify(this.userModel))
        
      },
      error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo editar',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(this.userModel)

      }
    )
  }

  
}

