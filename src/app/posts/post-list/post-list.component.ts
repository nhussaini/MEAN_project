import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   {title: 'fist post', content: 'this is the fist post\'s content'},
  //   {title: 'second post', content: 'this is the second post\'s content'},
  //   {title: 'second post', content: 'this is the second post\'s content'}
  // ];
  @Input() posts: Post[] = [];

  constructor(public postsService: PostsService) {

  }
}
