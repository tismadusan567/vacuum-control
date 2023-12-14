import { RequestLogPipe } from './request-log.pipe';

describe('RequestLogPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestLogPipe();
    expect(pipe).toBeTruthy();
  });
});
