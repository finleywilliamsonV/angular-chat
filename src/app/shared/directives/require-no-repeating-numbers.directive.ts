import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

@Directive({
    selector: '[requireNoRepeatingNumbers]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: RequireNoRepeatingNumbersDirective,
        multi: true
    }]
})
export class RequireNoRepeatingNumbersDirective implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return requireNoRepeatingNumbersValidator()(control)
    }
}

const requireNoRepeatingNumbersValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const repeatingNumbersRegEx: RegExp = new RegExp('(\\d)\\1{3}', 'm')
        const repeatingNumbersFound: boolean = repeatingNumbersRegEx.test(control.value)
        return repeatingNumbersFound ? { repeatingNumbersFound: { value: control.value } } : null
    }
}
