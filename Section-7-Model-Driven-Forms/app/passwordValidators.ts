import {FormControl, FormGroup} from '@angular/forms'

export class PasswordValidators {
    static match(control: FormGroup){
        // console.log("matching..");
        var isValid = control.get('newpw').value == control.get('newpwcheck').value;
        // var isValid = true;
        return isValid ? null : {match: true};
    }

    static verifyPassAsync(control : FormControl){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(control.value);
                // verify password
                var valid = control.value == 'amado123';
                if(valid)
                    resolve(null);  // indicates success
                else
                    resolve({verifyPasswordAsync: true}); // indicates failure
            }, 2000)
        });
    }
}