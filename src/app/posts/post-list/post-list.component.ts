import { Component } from '@angular/core';

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
  posts = [];
}
