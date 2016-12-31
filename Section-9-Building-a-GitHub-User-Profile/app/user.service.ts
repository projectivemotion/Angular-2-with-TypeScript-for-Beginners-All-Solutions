/**
 * Project: Angular-2-with-TypeScript-for-Beginners-All-Solutions
 *
 * @author Amado Martinez <http://amadomartinez.mx>
 */
import {User} from './user';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of';

export class UserService {

    getUserInfo (login : string) : Observable<User> {
        return Observable.of({"login": "Amado"});
    }

    getUserFollowers (login : string) : Observable<User[]> {
        return Observable.of([
            {"login": "random1"},
            {"login": "random2"},
            {"login": "random3"}
        ]);
    }

    getUserFollowerInfo (login) : Observable<User> {
        return Observable.forkJoin(
                this.getUserInfo(login)
            ,
                this.getUserFollowers(login
            )).map(
                joined => {
                    joined[0].followers = joined[1];
                    return joined[0];
                }
            );
    }
}