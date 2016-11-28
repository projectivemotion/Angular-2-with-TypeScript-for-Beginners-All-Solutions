import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import {SubscribeFormComponent} from './subscribeform.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, SubscribeFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
