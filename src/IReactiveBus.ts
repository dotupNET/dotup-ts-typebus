/*
 * File generated by Interface generator (dotup.dotup-vscode-interface-generator)
 * Date: 2019-04-04 08:38:05
*/
import { ILogger, LoggerFactory } from 'dotup-ts-logger';
import { Observable, Subject, Subscription } from 'rxjs';
// tslint:disable-next-line: no-submodule-imports
import { filter } from 'rxjs/operators';
import { BusMessage } from './BusMessage';
import { IBusMessage } from './IBusMessage';
import { IReactiveBus } from './IReactiveBus';

export interface IReactiveBus {
  publish<T>(message: IBusMessage<T>): void;
  publish<T>(message: T, topic: string): void;
  publishAsync<T>(message: IBusMessage<T>): Promise<void>;
  publishAsync<T>(message: T, topic?: string): Promise<void>;
  // tslint:disable-next-line: no-any
  subscribe<T>(topic: (new (...args: any[]) => T) | string, handler: (message: IBusMessage<T>) => void): Subscription;
  // tslint:disable-next-line: no-any
  subscribeAsync<T>(topic: (new (...args: any[]) => T) | string, handler: (message: IBusMessage<T>) => Promise<void>): Subscription;
  // tslint:disable-next-line: no-any
  asObservable<T>(topic: (new (...args: any[]) => T) | string): Observable<IBusMessage<T>>;
}
