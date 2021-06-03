import {
    AbstractControl,
    NG_VALIDATORS,
    NgModel,
    ValidationErrors,
    Validator,
    ValidatorFn
} from '@angular/forms'
import { Directive, Input } from '@angular/core'

@Directive({
    selector: '[requirePasswordMatch]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: RequirePasswordMatchDirective,
        multi: true
    }]
})
export class RequirePasswordMatchDirective implements Validator {

    @Input('requirePasswordMatch')
    public passwordInputs: NgModel[]

    /**
     * Validation Function
     */
    public validate(control: AbstractControl): ValidationErrors | null {
        return requirePasswordMatchValidator(this.passwordInputs)(control)
    }
}

const requirePasswordMatchValidator = (passwordInputs: NgModel[]): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let stringsMatch: boolean = true
        if (control && passwordInputs?.length >= 2) {
            const passwordFields: string[] = passwordInputs.map((passwordInput: NgModel) => passwordInput.value)
            let testString: string = passwordFields[0]
            for (let i = 1; i < passwordFields.length; i++) {
                const currentString: string = passwordFields[i]
                if (currentString != testString) {
                    stringsMatch = false
                    break
                }
            }
        }
        return !stringsMatch ? { doesNotMatch: { value: control.value } } : null
    }
}
