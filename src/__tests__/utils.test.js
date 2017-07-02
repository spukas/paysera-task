import readFile from '../utils';

describe('readFile', () => {
  it('returns a promise', () => {
    expect.assertions(1);
    const data = readFile('./input.json');
    expect(data).toBeInstanceOf(Promise);
  });
});
