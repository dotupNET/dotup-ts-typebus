export class Message1 {
  // private _channel: string;
  // private _data: any;

  constructor(public readonly channel: string, public readonly payload: string) { }

}

export class Message2 {
  // private _channel: string;
  // private _data: any;

  constructor(public readonly value: string) { }

}