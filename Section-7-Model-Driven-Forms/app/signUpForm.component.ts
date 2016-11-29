import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { PasswordValidators } from './passwordValidators'

@Component({
  selector: 'signupform',
  templateUrl: 'views/signUpForm.template.html',
  styles: [` .ng-touched.ng-invalid { border-color: #f00; }`]
})
export class SignUpFormComponent { 
    form : FormGroup;
    isSuccess = false;
    onSubmit(){
        this.isSuccess = true;        
    }
    // test(){
    //         console.log(arguments);
    // }
    constructor(fb: FormBuilder){
        this.form = fb.group({
            oldpw: ['', 
                    Validators.required,
                    PasswordValidators.verifyPassAsync
                ],
                newpwgroup: fb.group({
            newpw: ['', 
                    Validators.compose([Validators.minLength(5), Validators.required])
            ],
            newpwcheck: ['', 
                    Validators.required
            ]}, { validator: PasswordValidators.match } )
        });
    }
}
