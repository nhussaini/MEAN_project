import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // allows typescript to find it.

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent
    //
  ],
  imports: [
    BrowserModule,
    FormsModule // now angular is aware of form features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
