import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IKeyMessage } from './IKeyMessage';
import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { IBus } from './IBus';

export class TypeBus implements IBus{
  private subjectBus: Subject<any>;
  private logger: ILogger;
  // private chanels: Channel;

  constructor() {
    this.logger = new LoggerFactory().CreateLogger('TypeBus')
    this.logger.call('constructor');
    this.subjectBus = new Subject<any>();
  }

  async publishAsync<T>(message: T): Promise<void> {
    let x = 0;
    // const channel = (<any>message.constructor).name;
    this.logger.debug(`message <${(<any>message.constructor).name}> published`);
    return new Promise<void>((resolve, reject) => {
      try {
        this.subjectBus.next(message);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async publishKey<T>(key: string, message: T): Promise<void> {
    // const channel = (<any>message.constructor).name;
    return new Promise<void>((resolve, reject) => {
      try {
        this.subjectBus.next({ key: key, message: message });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  subscribe<T>(messageType: { new(...args: any[]): T }, handler: (data: T) => void): Subscription {
    const channel = (<any>messageType).name;
    this.logger.debug(`new subscrition for ${channel}`, 'subscribe');
    const result = this.subjectBus.pipe(
      filter(m => {
        const mtype = (<any>m.constructor).name;
        return mtype === channel;
      })
    );
    return result.subscribe(data => handler(data));
  }

  subscribeKey<T>(messageType: string, handler: (data: T) => void): Subscription {
    this.logger.debug(`new subscrition for key ${messageType}`, 'subscribeKey');
    const result = this.subjectBus.pipe(
      filter(value => {
        const asKeyMessage = value as IKeyMessage<T>;
        if (asKeyMessage === null) {
          return false;
        }

        return asKeyMessage.key === messageType;
      }),
      map(m => (m as IKeyMessage<T>).message)
    );
    return result.subscribe(data => handler(data));
  }

  asObservable<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const typeName = (<any>messageType).name;
    const result = this.subjectBus.pipe<T>(
      filter(m => (<any>m.constructor).name === typeName)
    );
    return result;
  }
}
