import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public postsModel: Array<Post>;

  constructor(
    private _postService: PostService
  ) { 
    this._postService.list().subscribe(res=>{
      this.postsModel = res.data;
    }, err=>console.log(err));
  }

  ngOnInit(): void {
  }

}
