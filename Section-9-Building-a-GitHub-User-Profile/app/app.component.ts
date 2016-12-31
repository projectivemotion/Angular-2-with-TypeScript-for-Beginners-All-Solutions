import { Component } from '@angular/core';
import { OnInit, Injectable } from '@angular/core';

import {User} from './user';
import {UserService} from './user.service';
import {GithubUserService} from './githubuser.service';

@Component({
  selector: 'my-app',
  templateUrl: 'views/app.view.html',
  styles: [`
    .avatar { width: 100; height: 100; 
                border-radius: 100%;}
    `]
})
@Injectable()
export class AppComponent implements OnInit { 
  user : User;
  isLoading : false;

  constructor (private _userService : GithubUserService){
  }

  ngOnInit (){
    this.loadUserInfo("projectivemotion");
  }

  loadUserInfo (login : string){
    this.user = null;
    this._userService.getUserFollowerInfo(login).subscribe(userInfo => this.user = userInfo);
  }
}
