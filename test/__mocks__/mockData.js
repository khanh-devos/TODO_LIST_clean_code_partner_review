export default class Data {
  constructor() {
    this.data = [
      {
        index: 1,
        description: 'task1',
        completed: false,
      },
      {
        index: 2,
        description: 'task2',
        completed: false,
      },
      {
        index: 3,
        description: 'task3',
        completed: false,
      },
    ];
  }

  getData() {
    return this.data;
  }

  setData(tasks) {
    this.data = tasks;
  }

  deleteArrOfIndex(arrOfIndex) {
    const tasks = this.getData()
      .filter((e) => !arrOfIndex.includes(e.index.toString()))
      .map((e, i) => ({ ...e, index: i + 1 }));
    this.setData(tasks);
  }
}
