/**
 * @jest-environment jsdom
*/
import * as fs from './part2.js';

describe('part2', () => {
  it('editTask type checkbox', () => {
    expect(fs.editTask({
      index: 2,
      checked: true,
      type: 'checkbox',
    })).toMatchObject({
      index: 2,
      description: 'task2',
      completed: true,
    });
  });

  it('editTask type text', () => {
    expect(fs.editTask({
      type: 'text',
      index: 1,
      value: 'task2 changed',
    })).toMatchObject({
      index: 1,
      description: 'task2 changed',
      completed: false,
    });
  });
});