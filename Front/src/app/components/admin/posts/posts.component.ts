import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/service/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public postModel: Post = new Post("", "", "", new Date(), "");

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
  }

  ngOnInit(
    
  ): void {
  }

  registrar(){
    this.postModel.imagePost = this.imageShow;
    this._postService.register(this.postModel).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
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
