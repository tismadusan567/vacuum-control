import { Pipe, PipeTransform } from '@angular/core';
import { RequestLog } from './services/request-history.service';

@Pipe({
  name: 'requestLog'
})
export class RequestLogPipe implements PipeTransform {

  transform(value: RequestLog): string {
    return `[${value.date.toString()}] ${value.type} ${value.url}`;
  }

}
