import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capToVar'
})
export class CapToVarPipe implements PipeTransform {

  transform(value: string): string {
    // if(!value) return value
    const plaintext = value.toLowerCase().replace('/', ' ').replace(' & ', ' ').replace(', ', ' ');
    return plaintext.split(' ').join('_');
  }

}
