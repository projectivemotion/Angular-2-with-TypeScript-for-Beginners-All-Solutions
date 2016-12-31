import {Http} from '@angular/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin'

import {UserService} from './user.service'
import {User} from './user';


@Injectable()
export class GithubUserService extends UserService 
{
    private _baseUrl = "https://api.github.com/users/";

    constructor(private _http : Http){
        super();
    }

    getUserInfo (login) : Observable<User> {
        return this._http.get(this._baseUrl+login).map(res => res.json());
    }

    getUserFollowers (login) : Observable<User[]> {
        return this._http.get(this._baseUrl+login+'/followers')
            .map(res => res.json());
    }

}