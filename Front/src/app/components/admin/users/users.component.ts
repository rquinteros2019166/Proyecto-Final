import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public tableUsers: Array<User>;
  public modelUser: User = new User("", "", "", "", 0, "", "", "", "");
  public modelUpdateUser: User = new User("", "", "", "", 0, "", "", "", "");

  file: any;
  imageShow: string | ArrayBuffer;

  constructor(
    private _userService: UserService
  ) {
    this.obtenerLista();
  }

  ngOnInit(): void {
  }

  obtenerLista(){
    this._userService.getUsers().subscribe(response => {
      var array = [];
      response.data.forEach(element => {
        var tableUsers: User = new User(
            element._id, 
            element.nickUser,
            element.fullNameUser,
            element.emailUser,
            element.phoneUser,
            element.addressUser,
            "",
            element.imageUser,
            element.buysUser
          );
        array.push(tableUsers);
      });

      this.tableUsers = array;
    }, error => {
      console.log(error);
    });
  }

  registrar(){
    var txt = String(this.imageShow).split("base64,");
    this.modelUser.imageUser = txt[1];
    this._userService.register(this.modelUser).subscribe(response => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })

      this.obtenerLista();
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

  get(id){
    var encontrado = false;
    for (let i = 0; i < this.tableUsers.length && encontrado == false; i++) {
      if(this.tableUsers[i]._id == id){
        this.modelUpdateUser = this.tableUsers[i];
      }
    }
  }

  editar(){
    if(String(this.imageShow).length > 0){
      var txt = String(this.imageShow).split("base64,");
      this.modelUpdateUser.imageUser = txt[1];
    }else{
      this.modelUpdateUser.imageUser = this.modelUpdateUser.imageUser;
    }
    this._userService.editar(this.modelUpdateUser).subscribe(response => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })

      this.modelUpdateUser = new User(
          response.data._id, 
          response.data.nickUser,
          response.data.fullNameUser,
          response.data.emailUser,
          response.data.phoneUser,
          response.data.addressUser,
          "",
          response.data.imageUser,
          response.data.buysUser
      );

      this.obtenerLista();
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

  eliminar(){
    this._userService.eliminar(this.modelUpdateUser._id).subscribe(response => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })

      this.obtenerLista();
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
    this.modelUser = new User("", "", "", "", 0, "", "", "", "");
    this.modelUpdateUser = new User("", "", "", "", 0, "", "", "", "");
  }

}
