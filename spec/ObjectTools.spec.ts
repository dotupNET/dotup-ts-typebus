import { ObjectTools } from '../src/ObjectTools';

class BaseClass {
  basprop: string;
  async Stop() {

  }
}

class MyClass extends BaseClass {

  private x: string = 'x';

  async B() {
    console.log(this);
  }
  async A() {
    console.log(this);
  }

  async C() {
    console.log(this);
  }
}

describe('ObjectTools', () => {

  it('GetMethodNames', () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetMethodNames(myClass, 'C');

    expect(names.length)
      .toBe(3);

    expect(names[1])
      .toBe('A');

  });

  it('GetOwnMethodNames', () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetOwnMethodNames(myClass, 'B');

    expect(names.length)
      .toBe(2);

    expect(names[0])
      .toBe('A');

    expect(names[1])
      .toBe('C');

  });

});
