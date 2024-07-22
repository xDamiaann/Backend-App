import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value: any[], chunkSize: number): any[][] {
    if (!value || chunkSize <= 0) {
      return value;
    }

    const result: any[][] = [];
    for (let i = 0; i < value.length; i += chunkSize) {
      result.push(value.slice(i, i + chunkSize));
    }
    return result;
  }
}