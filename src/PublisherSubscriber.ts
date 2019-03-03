import { ILogger, LoggerFactory } from 'dotup-ts-logger';
import { Observable, Subject, Subscription } from 'rxjs';
// tslint:disable-next-line: no-submodule-imports
import { filter } from 'rxjs/operators';
import { IBus } from './IBus';

class TopicMessage<T> {
  topic: string;
  message: T;
  timestamp = new Date();
  // id = new Uuid
}

export class PublisherSubscriber implements IBus {
  // tslint:disable-next-line: no-any
  private readonly subjectBus: Subject<any>;
  private readonly logger: ILogger;
  // private chanels: Channel;

  messageCounter: number = 0;

  constructor() {
    this.logger = LoggerFactory.createLogger('PublisherSubscriber');
    this.logger.CallInfo('constructor');
    // tslint:disable-next-line: no-any
    this.subjectBus = new Subject<any>();
  }

  publish<T>(message: T, topic?: string): void {
    const msg = new TopicMessage();
    if (topic === undefined) {
      msg.topic = message.constructor.name;
    } else {
      msg.topic = topic;

    }
    msg.message = message;
    this.messageCounter += 1;
    this.subjectBus.next(msg);
    this.logger.Debug(`message <${msg.topic}> published`);
  }

  async publishAsync<T>(message: T, topic?: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.publish(message, topic);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // tslint:disable-next-line: no-any
  subscribe<T>(topic: (new (...args: any[]) => T) | string, handler: (data: T) => void): Subscription {
    const result = this.asObservable(topic);

    return result.subscribe(handler);
  }

  // tslint:disable-next-line: no-any
  subscribeAsync<T>(topic: (new (...args: any[]) => T) | string, handler: (data: T) => Promise<void>): Subscription {
    const result = this.asObservable(topic);

    return result.subscribe(handler);
  }

  // tslint:disable-next-line: no-any
  asObservable<T>(topic: (new (...args: any[]) => T) | string): Observable<T> {
    // tslint:disable-next-line: no-any : no-unsafe-any
    const t: string = typeof (topic) === 'string' ? topic : (<any>topic).constructor.name;
    this.logger.Debug(`new subscrition for ${topic}`, 'subscribe');

    return this.subjectBus
      .pipe(
        filter(m => {
          const msg = <TopicMessage<T>>m;

          return this.topicMatches(msg.topic, t);
        })
      );

  }

  topicMatches(value: string, topic: string): boolean {
    if (value === topic) {
      return true;
    }
    // tslint:disable-next-line: prefer-template
    const regexString = '^' + topic.replace(/\*/g, '([^.]+)')
      .replace(/#/g, '([^.]+\.?)+') + '$';

    return value.search(regexString) !== -1;
  }

}
