import { ILogger, LoggerFactory } from 'dotup-ts-logger';
import { Observable, Subject, Subscription } from 'rxjs';
// tslint:disable-next-line: no-submodule-imports
import { filter, map } from 'rxjs/operators';
import { IBus } from './IBus';
import { IKeyMessage } from './IKeyMessage';

export class TypeBus implements IBus {
  // tslint:disable-next-line: no-any
  private readonly subjectBus: Subject<any>;
  private readonly logger: ILogger;
  // private chanels: Channel;

  constructor() {
    this.logger = LoggerFactory.createLogger('TypeBus');
    this.logger.CallInfo('constructor');
    // tslint:disable-next-line: no-any
    this.subjectBus = new Subject<any>();
  }

  async publishAsync<T>(message: T): Promise<void> {
    // const channel = (<any>message.constructor).name;
    // tslint:disable-next-line: no-any
    this.logger.Debug(`message <${(<any>message.constructor).name}> published`);

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

  // tslint:disable-next-line: no-any
  subscribe<T>(messageType: new (...args: any[]) => T, handler: (data: T) => void): Subscription {
    // tslint:disable-next-line: no-any
    const channel = messageType.constructor.name;
    this.logger.Debug(`new subscrition for ${channel}`, 'subscribe');
    const result = this.subjectBus.pipe(
      filter(m => {
        // tslint:disable-next-line: no-unsafe-any
        const mtype = m.constructor.name;

        return mtype === channel;
      })
    );

    return result.subscribe(handler);
  }

  subscribeKey<T>(messageType: string, handler: (data: T) => void): Subscription {
    this.logger.Debug(`new subscrition for key ${messageType}`, 'subscribeKey');
    const result = this.subjectBus.pipe(
      filter(value => {
        const asKeyMessage = <IKeyMessage<T>>value;
        if (asKeyMessage === null) {
          return false;
        }

        return asKeyMessage.key === messageType;
      }),
      map(m => (<IKeyMessage<T>>m).message)
    );

    return result.subscribe(handler);
  }

  // tslint:disable-next-line: no-any
  asObservable<T>(messageType: new (...args: any[]) => T): Observable<T> {
    // tslint:disable-next-line: no-any : no-unsafe-any
    const typeName = (<any>messageType).constructor.name;

    return this.subjectBus.pipe<T>(
      filter<T>(m => m.constructor.name === typeName)
    );
  }
}
