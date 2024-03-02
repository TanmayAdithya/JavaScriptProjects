const fizzbuzz = require('./fizzbuzz');

describe('fizzbuzz', () => {
  it('Should be a function', () => {
    expect(typeof fizzbuzz).toEqual('function');
  });

  it('Should return number', () => {
    expect(fizzbuzz(1)).toEqual(1);
    expect(fizzbuzz(13)).toEqual(13);
    expect(fizzbuzz(11)).toEqual(11);
  });
});
