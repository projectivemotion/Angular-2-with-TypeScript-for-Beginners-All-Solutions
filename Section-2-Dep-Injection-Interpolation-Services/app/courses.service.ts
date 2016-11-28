import {Injectable} from '@angular/core';

@Injectable()
export class CoursesService {
    getCourses () : string [] {
        return ["ServiceCourse1", "ServiceCourse2", "ServiceCourse3"];
    }
}