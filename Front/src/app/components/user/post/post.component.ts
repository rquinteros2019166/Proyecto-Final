import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

   public user: any = {rolUser: "DEFAULT"};
   public postModel: Post;

  constructor(
    private _postService: PostService,
    private _routerLink: ActivatedRoute
  ) { 
      let identidad;
      if(identidad = localStorage.getItem('identity')){
        this.user = JSON.parse(localStorage.getItem('identity'));
      }
      this._postService.get(this._routerLink.snapshot.params['idPost']).subscribe(res => {
        this.postModel = res.data;
      }, err => {
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

}
