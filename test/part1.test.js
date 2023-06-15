import * as funcs from './part1.js';

describe('part 1', () => {
  test('addNew', () => {
    expect(funcs.addNew('task4')).toStrictEqual({
      index: 4,
      description: 'task4',
      completed: false,
    });

    expect(() => funcs.addNew('')).toThrow(/task cannot be an empty string/);
  });

  test('deleteTasks', () => {
    expect(funcs.deleteTasks(
      [
        {
          checked: true,
          name: '1',
        },
        {
          checked: true,
          name: '2',
        },
        {
          checked: false,
          name: '3',
        },
      ],
    )).toStrictEqual(
      [
        {
          index: 1,
          description: 'task3',
          completed: false,
        },
      ],
    );
  });

  test('deleteSingleTask', () => {
    const index = 2;
    expect(funcs.deleteSingleTask(index)).toStrictEqual(
      [
        {
          index: 1,
          description: 'task1',
          completed: false,
        },
        {
          index: 2,
          description: 'task3',
          completed: false,
        },
      ],
    );
  });
});