import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Events } from 'src/app/models/eventos.models';
import { EventService } from 'src/app/service/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventsadmin',
  templateUrl: './eventsadmin.component.html',
  styleUrls: ['./eventsadmin.component.scss']
})
export class EventsadminComponent implements OnInit {
  public eventModel: Events = {
    _id: "",
    nameEvent: "",
    descriptionEvent: "",
    statusEvent: "",
    typeEvent: "",
    dateEvent: "",
    userEvent: ""
  };

  public eventUpdateModel: Events = {
    _id: "",
    nameEvent: "",
    descriptionEvent: "",
    statusEvent: "",
    typeEvent: "",
    dateEvent: "",
    userEvent: ""
  };

  public tableEvents: Array<Events>;

  //new Date(Date.now()).toISOString().substr(0, 16)

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
    private _eventsService: EventService,
  ) { 
    this.obtenerLista();
  }

  ngOnInit(
    
  ): void {
  }

  get(id){
    var encontrado = false;
    for (let i = 0; i < this.tableEvents.length && encontrado == false; i++) {
      if(this.tableEvents[i]._id == id){
        this.eventUpdateModel = this.tableEvents[i];
      }
    }

    console.log(this.eventUpdateModel);
  }

  obtenerLista(){
    this._eventsService.list().subscribe(response => {
      var array = [];
      response.data.forEach(element => {
        var tablePosts = {
          _id: element._id,
          nameEvent: element.nameEvent,
          descriptionEvent: element.descriptionEvent,
          statusEvent: element.statusEvent,
          typeEvent: element.typeEvent,
          dateEvent: new Date(element.dateEvent).toISOString().substr(0, 16),
        }
        array.push(tablePosts);
      });

      this.tableEvents = array;
    }, error => {
      console.log(error);
    });
  }

  limpiar(){
    this.imageShow = null;
    this.eventModel = {
      _id: "",
      nameEvent: "",
      descriptionEvent: "",
      statusEvent: "",
      typeEvent: "",
      dateEvent: "",
      userEvent: ""
    };

    this.eventUpdateModel = {
      _id: "",
      nameEvent: "",
      descriptionEvent: "",
      statusEvent: "",
      typeEvent: "",
      dateEvent: "",
      userEvent: ""
    };
  }

  editar(){
    this._eventsService.editar(this.eventUpdateModel).subscribe(response => {
      Swal.fire({
        position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
      })

      this.eventUpdateModel = response.data;

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
    this._eventsService.eliminar(this.eventUpdateModel).subscribe(response => {
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

}


