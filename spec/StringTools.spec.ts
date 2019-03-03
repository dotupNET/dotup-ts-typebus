// tslint:disable:no-any
import { StringTools } from '../src/StringTools';

describe('StringTools', () => {

  it('should replace two placeholder', () => {
    const template = 'Spieler {0} heißt {1}';
    const objectTemplate = 'Spieler {PlayerNumber} heißt {Spieler}';

    let result = StringTools.format(template, '1', 'Peter');

    expect(result)
      .toBe('Spieler 1 heißt Peter');

    result = StringTools.format(template, 1, 'Peter');

    expect(result)
      .toBe('Spieler 1 heißt Peter');

    result = StringTools.format(objectTemplate, { Spieler: 'Peter', PlayerNumber: 1 });

    expect(result)
      .toBe('Spieler 1 heißt Peter');

  });

});
