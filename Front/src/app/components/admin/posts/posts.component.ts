import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public postModel: Post;

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

  constructor(
    private _eRef: ElementRef
  ) { 
    this.postModel = new Post("", "", "", new Date, "", "");
  }

  ngOnInit(
    
  ): void {
  }

}
