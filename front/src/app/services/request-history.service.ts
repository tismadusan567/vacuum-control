import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestHistoryService {

  private readonly requestLogs: RequestLog[] = []

  constructor() { }

  addLog(log: RequestLog): void {
    this.requestLogs.push(log);
  }

  getLogs(): RequestLog[] {
    return this.requestLogs;
  }
}

export class RequestLog {
  constructor(
    readonly date: Date,
    readonly type: string,
    readonly url: string
    ) {}
}
