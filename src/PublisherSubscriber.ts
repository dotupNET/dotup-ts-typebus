import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { IBus } from './IBus';

class TopicMessage<T> {
  topic: string;
  message: T;
  timestamp = new Date();
 // id = new Uuid
}

export class PublisherSubscriber implements IBus {
  private subjectBus: Subject<any>;
  private logger: ILogger;
  // private chanels: Channel;

  messageCounter: number = 0;

  constructor() {
    this.logger = new LoggerFactory().CreateLogger('PublisherSubscriber')
    this.logger.call('constructor');
    this.subjectBus = new Subject<any>();
  }

  publish<T>(message: T, topic: string | null = null): void {
    const msg = new TopicMessage();
    msg.topic = topic || (<any>message.constructor).name;
    msg.message = message;
    this.messageCounter++;
    this.subjectBus.next(msg);
    this.logger.debug(`message <${msg.topic}> published`);
  }

  async publishAsync<T>(message: T, topic: string | null = null): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.publish(message, topic);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  subscribe<T>(topic: { new(...args: any[]): T } | string, handler: (data: T) => void): Subscription {
    const result = this.asObservable(topic);
    return result.subscribe(data => handler(data));
  }

  subscribeAsync<T>(topic: { new(...args: any[]): T } | string, handler: (data: T) => Promise<void>): Subscription {
    const result = this.asObservable(topic);
    return result.subscribe(data => handler(data));
  }

  asObservable<T>(topic: { new(...args: any[]): T } | string): Observable<T> {
    const t: string = typeof (topic) === 'string' ? topic : (<any>topic).name;
    this.logger.debug(`new subscrition for ${topic}`, 'subscribe');
    const result = this.subjectBus.pipe(
      filter(m => {
        const msg = m as TopicMessage<T>;
        return this.topicMatches(msg.topic, t);
      })
    );
    return result;
  }

  topicMatches(value: string, topic: string): boolean {
    if (value === topic) {
      return true;
    }
    var regexString = '^' + topic.replace(/\*/g, '([^.]+)').replace(/#/g, '([^.]+\.?)+') + '$';
    return value.search(regexString) !== -1;
  };

}
