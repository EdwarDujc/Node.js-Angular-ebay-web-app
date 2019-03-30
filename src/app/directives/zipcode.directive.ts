import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { zipcodeValidator } from './zipcode.validator';

@Directive({
  selector: '[checkZipcode]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ZipcodeDirective, multi: true }
  ]
})
export class ZipcodeDirective implements Validator {
  private validator = zipcodeValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }
}
