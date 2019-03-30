import { ValidatorFn, AbstractControl } from '@angular/forms';

export function zipcodeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const pattern = /^\d{5}$/;
      const validZipcode = !pattern.test(control.value);
      const validZipcode2 = (control.value || '').trim().length === 0;
      // console.log('control.value: ', control.value);
      // console.log('whitespace: ', validZipcode2);
      // console.log('regex: ', validZipcode);
      return validZipcode ? {invalid_zipcode: 'The zip code is restricted to only 5 digits.'} : null;
    };
}
