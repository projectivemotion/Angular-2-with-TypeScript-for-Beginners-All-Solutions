import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpFormComponent} from './signUpForm.component'
import { AppComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [ AppComponent, SignUpFormComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
