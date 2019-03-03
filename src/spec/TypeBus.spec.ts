import { TypeBus } from "../TypeBus";
import { Subscription } from "rxjs";
import { Message1, Message2 } from "./SampleMessages";
import { LoggerManager, LoggerFactory, ConsoleLogWriter, ILogger, LogLevel } from "dotup-ts-logger";

describe('TypeBus', () => {

  let logger: ILogger;

  beforeAll(() => {
    const f = new LoggerFactory();
    const m = new LoggerManager();
    const cl = new ConsoleLogWriter();
    cl.logLevel = LogLevel.Debug;
    m.AttachLogWriter(cl);
    logger = f.CreateLogger('TypeBus test')

  });

  it('should create an instance', () => {
    const bus = new TypeBus();
    expect(bus).toBeTruthy();
  });


  it('should return subscription', () => {
    const bus = new TypeBus();
    const result = bus.subscribe(TypeBus, data => { });
    expect(result instanceof Subscription).toBeTruthy();
    result.unsubscribe();
  });

  it('should receive message 1', async () => {
    const bus = new TypeBus();
    const result = bus.subscribe(Message1, data => {
      expect(data instanceof Message1).toBeTruthy();
    });
    const m1 = new Message1("CH", "PAY");
    await bus.publish(m1);
    result.unsubscribe();
  });

  it('should receive by key', async () => {
    const bus = new TypeBus();
    const result = bus.subscribeKey("BONGO", data => {
      expect(data).toEqual("JO");
    });
    const m1 = new Message1("CH", "PAY");
    await bus.publishKey("BONGO", "JO");
    result.unsubscribe();
  });

  it('should receive as observable', async () => {
    const bus = new TypeBus();
    const observable = bus.asObservable(Message1);
    const subscription = observable.subscribe(data => {
      expect(data).toEqual(new Message1("CH", "PAY"));
    });
    const m1 = new Message1("CH", "PAY");
    await bus.publish(m1);
    subscription.unsubscribe();
  });

});
