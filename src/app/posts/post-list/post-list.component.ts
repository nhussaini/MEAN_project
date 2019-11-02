import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'fist post', content: 'this is the fist post\'s content'},
  //   {title: 'second post', content: 'this is the second post\'s content'},
  //   {title: 'second post', content: 'this is the second post\'s content'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() { // It is recommended to do basic initialization task in ngOnInit
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
   ngOnDestroy() {
     this.postsSub.unsubscribe();
   }
}
