import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventsadmin',
  templateUrl: './eventsadmin.component.html',
  styleUrls: ['./eventsadmin.component.scss']
})
export class EventsadminComponent implements OnInit {
  public postModel: Post = {
    _id: "",
    titlePost: "",
    imagePost: "",
    descriptionPost: "",
    datePost: new Date(Date.now()).toISOString().substr(0, 16),
    tagsPost: "",
    adminPost: ""
  };

  public postUpdateModel: Post = {
    _id: "",
    titlePost: "",
    imagePost: "",
    descriptionPost: "",
    datePost: new Date(Date.now()).toISOString().substr(0, 16),
    tagsPost: "",
    adminPost: ""
  };

  public tablePosts: Array<Post>;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Descripcion',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Verdana',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'monospace', name: 'Monospace'},
      {class: 'verdana', name: 'Verdana'},
      {class: 'andale', name: 'Andale'},
      {class: 'apple', name: 'Apple'}
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  file: any;
  imageShow: string | ArrayBuffer;

  constructor(
    private _postService: PostService,
  ) { 
    this.obtenerLista();
  }

  ngOnInit(
    
  ): void {
  }

  get(id){
    var encontrado = false;
    console.log();
    for (let i = 0; i < this.tablePosts.length && encontrado == false; i++) {
      if(this.tablePosts[i]._id == id){
        this.postUpdateModel = this.tablePosts[i];
      }
    }
  }

  obtenerLista(){
    this._postService.list().subscribe(response => {
      var array = [];
      response.data.forEach(element => {
        var tablePosts = {
          _id: element._id,
          titlePost: element.titlePost,
          imagePost: element.imagePost,
          descriptionPost: element.descriptionPost,
          datePost: new Date(element.datePost).toISOString().substr(0, 16),
          tagsPost: element.tagsPost,
          adminPost: element.adminPost
        }
        array.push(tablePosts);
      });

      this.tablePosts = array;
    }, error => {
      console.log(error);
    });
  }

  limpiar(){
    this.imageShow = null;
    this.postModel = {
      _id: "",
      titlePost: "",
      imagePost: "",
      descriptionPost: "",
      datePost: new Date(Date.now()).toISOString().substr(0, 16),
      tagsPost: "",
      adminPost: ""
    };

    this.postUpdateModel = {
      _id: "",
      titlePost: "",
      imagePost: "",
      descriptionPost: "",
      datePost: new Date(Date.now()).toISOString().substr(0, 16),
      tagsPost: "",
      adminPost: ""
    };
  }

  registrar(){
    var txt = String(this.imageShow).split("base64,");
    this.postModel.imagePost = txt[1];
    this._postService.register(this.postModel).subscribe(response => {
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

  editar(){
    if(String(this.imageShow).length > 0){
      var txt = String(this.imageShow).split("base64,");
      this.postUpdateModel.imagePost = txt[1];
    }else{
      this.postUpdateModel.imagePost = this.postUpdateModel.imagePost;
    }
    this._postService.editar(this.postUpdateModel).subscribe(response => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })

      this.postUpdateModel = response.data;

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
    this._postService.eliminar(this.postUpdateModel._id).subscribe(response => {
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

}


