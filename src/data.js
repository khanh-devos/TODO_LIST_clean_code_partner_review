export const setData = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getData = () => (JSON.parse(localStorage.getItem('tasks')) || [
  {
    index: 1,
    description: 'washing the dishes',
    completed: false,
  },
  {
    index: 2,
    description: 'finish TO DO LIST project',
    completed: false,
  },
  {
    index: 3,
    description: 'implement Drag-Drop feature',
    completed: false,
  },
]);

export const deleteArrOfIndex = (arrOfIndex) => {
  const tasks = getData().filter((e) => !arrOfIndex.includes(e.index.toString()))
    .map((e, i) => ({ ...e, index: i + 1 }));
  setData(tasks);
};

export const editTask = (e) => {
  const tasks = getData();
  const editedTask = tasks.filter((item) => item.index === Number(e.target.name))[0];

  if (e.target.type === 'checkbox') {
    editedTask.completed = e.target.checked;
  }

  if (e.target.type === 'text') {
    editedTask.description = e.target.value;
  }

  tasks[editedTask.index - 1] = editedTask;
  setData(tasks);
};

export const exhangeData = (liId1, liId2) => {
  const tasks = getData();
  const [idx1, idx2] = [Number(liId1.split('-')[1]), Number(liId2.split('-')[1])];
  const [task1, task2] = [tasks[idx1 - 1], tasks[idx2 - 1]];

  task1.index = idx2;
  task2.index = idx1;
  tasks[idx1 - 1] = task2;
  tasks[idx2 - 1] = task1;
  setData(tasks);
};