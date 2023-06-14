const addNew = require('./addNew')

test('test', () => {
  expect(addNew('123')).toBe('123')
})