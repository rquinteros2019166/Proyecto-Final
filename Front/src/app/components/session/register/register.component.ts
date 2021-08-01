import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {
  public userModel: User;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private urlRouter: ActivatedRoute
  ) {
    this.userModel = new User("", "", "", 0, "", "", "")
  }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this._router.navigate(['/home'])
    }
  }

 register(){
    console.log(this.userModel)
    this._userService.register(this.userModel).subscribe(
      response=>{
        console.log(response)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El usuario se creo correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("identity", JSON.stringify(response.data));

          let direccion = this.urlRouter.snapshot.params['tipo'];

          if(direccion){
            this._router.navigate(['/client/events/'+direccion])
          }else{
            this._router.navigate(['/home'])
          }
        });
        
      },
      error =>{
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
}
