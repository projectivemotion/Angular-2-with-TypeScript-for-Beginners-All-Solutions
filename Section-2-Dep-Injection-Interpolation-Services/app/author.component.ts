import {Component} from '@angular/core';
import {AuthorsService} from './authors.service';

@Component({
    selector: 'author',
    template: `<h2>Authors Component Title</h2>
    Search Authors <input autoGrow type="text" />
    <ul><li *ngFor="let author of authors"> {{ author }}</li></ul>
    `
})
export class AuthorComponent {
    authors : string[];

    constructor(authorsService : AuthorsService)
    {
        this.authors = authorsService.getAuthors();
        this.authors.push("ComponentAuthor1");
    }
}