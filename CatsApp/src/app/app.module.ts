import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { CatDetailComponent } from './cat-detail/cat-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    CatEditComponent,
    CatDetailComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
