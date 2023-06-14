const addNew = require('./addNew.js');

test('test', () => {
  expect(addNew('123')).toBe('123');
});