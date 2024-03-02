const sum = require('./sum.js');

test('Adds 2 + 3 to equal to 5', () => {
  expect(sum(2, 3)).toEqual(5);
});
