import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

@Directive({
    selector: '[requireSpecialCharacter]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: RequireSpecialCharacterDirective,
        multi: true
    }]
})
export class RequireSpecialCharacterDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return requireSpecialCharacterValidator()(control)
    }
}

const requireSpecialCharacterValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const spCharRegEx: RegExp = new RegExp('[/\`\\\\|\!\@\#\$\%\^\&\*\(\)\,\.\?\"\'\:\;\{\}\[\]\|\<\>]', 'm')
        const spCharFound: boolean = spCharRegEx.test(control.value)
        return !spCharFound ? { specialCharacterNotFound: { value: control.value } } : null
    }
}
