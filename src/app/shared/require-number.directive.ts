import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

@Directive({
    selector: '[requireNumber]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: RequireNumberDirective,
        multi: true
    }]
})
export class RequireNumberDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return requireNumberValidator()(control)
    }
}

const requireNumberValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const numRegEx: RegExp = new RegExp('\\d', 'm')
        const numberFound: boolean = numRegEx.test(control.value)
        return !numberFound ? { numberNotFound: { value: control.value } } : null
    }
}
