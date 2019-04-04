// tslint:disable: newline-per-chained-call
import { ConsoleLogWriter, ILogger, LoggerFactory, LoggerManager, LogLevel } from 'dotup-ts-logger';
import { Subscription } from 'rxjs';
import { BusMessage, ReactiveBus, TopicMatcher } from '../src/index';
import { Message1 } from '../src/samples/SampleMessages';

describe('TypeBus', () => {

  let logger: ILogger;

  beforeAll(() => {
    const f = LoggerFactory;
    const m = new LoggerManager();
    const cl = new ConsoleLogWriter();
    cl.LogLevel = LogLevel.Debug;
    m.AttachLogWriter(cl);
    logger = f.createLogger('TypeBus test');

  });

  it('should create an instance', () => {
    const bus = new ReactiveBus(new TopicMatcher('/'));
    expect(bus).toBeTruthy();
  });

  it('should return subscription', () => {
    const bus = new ReactiveBus(new TopicMatcher('/'));
    const result = bus.subscribe(ReactiveBus, data => { });
    expect(result instanceof Subscription).toBeTruthy();
    result.unsubscribe();
  });

  it('should receive message 1', async () => {
    const bus = new ReactiveBus(new TopicMatcher('/'));
    const result = bus.subscribe(Message1, msg => {
      expect(msg instanceof BusMessage).toBeTruthy();
      expect(msg.payload instanceof Message1).toBeTruthy();
    });
    const m1 = new Message1('CH', 'PAY');
    await bus.publishAsync(m1);
    result.unsubscribe();
  });

  it('should receive as observable', async () => {
    const bus = new ReactiveBus(new TopicMatcher('/'));
    const observable = bus.asObservable(Message1);
    const subscription = observable.subscribe(data => {
      const msg = new BusMessage<Message1>('Message1');
      msg.payload = new Message1('CH', 'PAY');
      expect(data).toEqual(msg);
    });
    const m1 = new Message1('CH', 'PAY');
    await bus.publishAsync(m1);
    subscription.unsubscribe();
  });

});
