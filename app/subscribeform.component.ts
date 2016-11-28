import {Component} from '@angular/core'

@Component({
    selector: 'subscribeform',
    templateUrl: 'views/subscribeform.template.html',
    styles:[`
        .ng-invalid.ng-touched { border-color: red; }
    `]
})
export class SubscribeFormComponent {
    isSubmitted = false;

    frequencyOptions = [
        {value: '', text: ''},
        {value: 'daily', text: 'Daily'},
        {value: 'weekly', text: 'Weekly'},
        {value: 'monthly', text: 'Monthly'},
        {value: 'yearly', text: 'Yearly'}
    ];

    submit(f){
        this.isSubmitted = true;
    }
}