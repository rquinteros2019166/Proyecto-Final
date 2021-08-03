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
  
  NameUser: string;

  public user: any = {rolUser: "DEFAULT"};
  
  file: any;
  imageShow: string | ArrayBuffer;

  constructor(
    private _userService: UserService
  ) {
    let identidad;
      if(identidad = localStorage.getItem('identity')){
        this.user = JSON.parse(localStorage.getItem('identity'));
        this.user.passwordUser = "";
      }

  }

  ngOnInit(): void {
  }
  editar(){
    if(String(this.imageShow).length > 0){
      var txt = String(this.imageShow).split("base64,");
      this.user.imageUser = txt[1];
    }else{
      this.user.imageUser = this.user.imageUser;
    }
    this._userService.editar(this.user).subscribe(response => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })

      this.user = response.data;
      this.user.passwordUser = "";

      localStorage.setItem("identity", JSON.stringify(response.data));
    }, error => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
      })
    });
  }


  

  onFileChanged(event) {
    this.file = event.target.files[0]
    var reader = new FileReader();
    this.imageShow = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
     this.imageShow = (<FileReader>event.target).result;
   }
  }

  limpiar(){
    this.imageShow = null;
    this.user = new User("", "", "", "", 0, "", "", "", "", "");
  }
}
