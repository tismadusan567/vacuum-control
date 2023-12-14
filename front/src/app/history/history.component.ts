import { Component } from '@angular/core';
import { RequestHistoryService, RequestLog } from '../services/request-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  constructor(private historyService: RequestHistoryService) {}

  getLogs(): RequestLog[] {
    return this.historyService.getLogs();
  }
}
