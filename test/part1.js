import * as d from './__mocks__/mockData.js';

export const addNew = (description) => {
  const tasks = d.Data1.getData();
  const newTask = {
    index: tasks.length + 1,
    description,
    completed: false,
  };

  if (newTask.description.length > 0) {
    tasks.push(newTask);
    d.Data1.setData(tasks);
  }

  if (newTask.description.length > 0) {
    const check = d.Data1.getData();
    return check[check.length - 1];
  }
  throw new Error('task cannot be an empty string');
};

export const deleteTasks = (checks) => {
  // const checks = document.querySelectorAll('input[type="checkbox"]');

  const checkeds = [];
  checks.forEach((e) => {
    if (e.checked) checkeds.push(e.name);
  });

  if (checkeds.length > 0) {
    d.Data2.deleteArrOfIndex(checkeds);
  }

  // for testing
  if (checkeds.length > 0) {
    const checkTasks = d.Data2.getData();
    return checkTasks;
  }
  throw new Error('no task completed');
};

export const deleteSingleTask = (index) => {
  const arrIndex = new Array(index.toString());
  d.Data3.deleteArrOfIndex(arrIndex);

  // check
  return d.Data3.getData();
};
