import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule} from '@angular/http';

import {UserService} from './user.service';
import {GithubUserService} from './githubuser.service';
import { AppComponent }   from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [GithubUserService]
})
export class AppModule { }
