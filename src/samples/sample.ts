// import { ConsoleLogWriter, LoggerFactory, LoggerManager } from 'dotup-ts-logger';
// import { ReactiveBus } from '../ReactiveBus';
// import { Message1, Message2 } from './SampleMessages';

// export class Startup {

//   private bus: ReactiveBus;

//   // tslint:disable-next-line: max-func-body-length
//   async testMessageBus() {

//     console.log(new Date());
//     await this.delay(1000);
//     console.log(new Date());

//     const pubsub = new ReactiveBus();
//     pubsub.subscribe('abc.#.ghi', msg => {
//       console.log({ _id: 1, counter: pubsub.messageCounter, msg: msg });
//     });
//     pubsub.subscribe('abc.#.ghi', async msg => {
//       console.log('delayed');
//       await this.delay(1000);
//       console.log({ _id: 2, counter: pubsub.messageCounter, msg: msg });
//     });
//     pubsub.subscribe('abc.#.ghi', msg => {
//       console.log({ _id: 3, counter: pubsub.messageCounter, msg: msg });
//     });

//     // pubsub.asObservable('abc.def.ghi').delay(5000).subscribe(data => {
//     //   console.log('4');
//     //   console.log("oha" + data);
//     // });

//     //  pubsub.publish('false pub1', 'abc');
//     //  pubsub.publish('false pub2', 'abc.def');
//     //  pubsub.publish('true pub3', 'abc.def.ghi');
//     //  pubsub.publish('true pub4', 'abc.def.123.ghi');

//     console.log('pub 1');
//     pubsub.publish('false pub1', 'abc');
//     console.log('pub 2');
//     pubsub.publish('false pub2', 'abc.def');
//     console.log('pub 3');
//     pubsub.publish('true pub3', 'abc.def.ghi');
//     console.log('pub 4');
//     pubsub.publish('true pub4', 'abc.def.123.ghi');

//     await this.delay(5000);

//     return;

//     // const channel1 = "abc";
//     // const channel2 = "abc.def";
//     // const channel3 = "abc.*.ghi";
//     // const channel4 = "abc.#.ghi";
//     // const channel5 = "abc.def.*";
//     // const channel6 = "abc.def.#";

//     // const isOk11 = pubsub.topicMatches('abc', channel1);
//     // const isOk12 = pubsub.topicMatches('abc.def', channel1);
//     // const isOk13 = pubsub.topicMatches('abc.def.ghi', channel1);
//     // const isOk14 = pubsub.topicMatches('aabc', channel1);

//     // const isOk21 = pubsub.topicMatches('abc', channel2);
//     // const isOk22 = pubsub.topicMatches('abc.1def', channel2);
//     // const isOk23 = pubsub.topicMatches('abc.1def.ghi', channel2);
//     // const isOk24 = pubsub.topicMatches('aabc', channel2);

//     // const isOk31 = pubsub.topicMatches('abc', channel3);
//     // const isOk32 = pubsub.topicMatches('abc.def', channel3);
//     // const isOk33 = pubsub.topicMatches('abc.def.ghi', channel3);
//     // const isOk34 = pubsub.topicMatches('abc.a.ghi', channel3);
//     // const isOk35 = pubsub.topicMatches('abc.a.b.ghi', channel3);
//     // const isOk36 = pubsub.topicMatches('aabc', channel3);
//     // const isOk37 = pubsub.topicMatches('abc.def.ghi.jkl', channel3);

//     // const isOk41 = pubsub.topicMatches('abc', channel4);
//     // const isOk42 = pubsub.topicMatches('abc.def', channel4);
//     // const isOk43 = pubsub.topicMatches('abc.def.ghi', channel4);
//     // const isOk44 = pubsub.topicMatches('abc.a.ghi', channel4);
//     // const isOk45 = pubsub.topicMatches('abc.a.b.ghi', channel4);
//     // const isOk46 = pubsub.topicMatches('aabc', channel4);
//     // const isOk47 = pubsub.topicMatches('abc.def.ghi.jkl', channel4);

//     // const isOk51 = pubsub.topicMatches('abc', channel5);
//     // const isOk52 = pubsub.topicMatches('abc.def', channel5);
//     // const isOk53 = pubsub.topicMatches('abc.def.ghi', channel5);
//     // const isOk54 = pubsub.topicMatches('abc.def.ghi.jkl', channel5);
//     // const isOk55 = pubsub.topicMatches('aabc', channel5);

//     // const isOk61 = pubsub.topicMatches('abc', channel6);
//     // const isOk62 = pubsub.topicMatches('abc.def', channel6);
//     // const isOk63 = pubsub.topicMatches('abc.def.ghi', channel6);
//     // const isOk64 = pubsub.topicMatches('abc.def.ghi.jkl', channel6);
//     // const isOk65 = pubsub.topicMatches('aabc', channel6);

//     const f = LoggerFactory;
//     const m = new LoggerManager();
//     m.AttachLogWriter(new ConsoleLogWriter());
//     this.bus = new ReactiveBus();

//     // this.bus.subscribeKey('aa', data => {
//     //   //      const x = data.payload;
//     //   console.log(`aa 1 - ${data}`);
//     // });

//     this.bus.subscribe(Message1, async data => {
//       //      const x = data.payload;
//       console.log(`1 as Message1 - ${data.payload}`);
//     });

//     this.bus.asObservable(Message2)
//       .subscribe(o => {
//         console.log(`2: ${o.payload.value}`);
//       });

//     await this.bus.publishAsync(new Message1('CHA1', 'OHA'));
//     // this.bus.publishKey('aa', 1);
//     const m2 = this.bus.publishAsync(new Message2('value.toString()'));
//     await m2;
//     console.log('message2 done');

//     const all = Promise.all([
//       this.send1(),
//       this.send2()
//     ])
//       .catch(error => console.log(error));
//     console.log('all pusblished');
//     await all;
//     console.log('all done');
//     // interval(1000).subscribe(value => {
//     //   this.bus.publishKey('aa', value);
//     //   this.bus.publish(new Message2(value.toString()));
//     // });
//     console.log('programm finished');
//   }

//   async send1() {
//     await this.delay(3000);
//     await this.bus.publishAsync(new Message1('111', '111'));
//     console.log('send1 done');
//   }

//   async send2() {
//     await this.delay(10);
//     await this.bus.publishAsync(new Message1('111', '112'));
//     console.log('send2 done');
//   }

//   async delay(ms: number): Promise<void> {
//     // tslint:disable-next-line: no-string-based-set-timeout
//     return new Promise<void>(resolve => setTimeout(resolve, ms));
//   }

// }

// const startup = new Startup();
// // tslint:disable-next-line: no-floating-promises
// startup.testMessageBus();
