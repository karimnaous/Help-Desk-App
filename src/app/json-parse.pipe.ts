import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'jsonParse'})
  export class jsonParse implements PipeTransform  {
    transform(value: string): Object[] {
      return JSON.parse(value);
  }
    }