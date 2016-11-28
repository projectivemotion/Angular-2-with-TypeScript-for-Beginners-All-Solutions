import {Component} from '@angular/core';
import {CoursesService} from './courses.service';

@Component({
    selector: 'course',
    template: `<h2>Course Component Title</h2>
        Search Courses: <input type="text" autoGrow />
        <ul><li *ngFor="let course of courses">{{ course }}</li></ul>
    `
})

export class CourseComponent {
    courses : string[];

    constructor(coursesService : CoursesService){
        this.courses = coursesService.getCourses();
    }
}