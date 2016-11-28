import {Injectable} from '@angular/core';

@Injectable()
export class AuthorsService {
    getAuthors () : string[] {
        return ["ServiceAuthor1", "ServiceAuthor2", "ServiceAuthor3"];
    }
}