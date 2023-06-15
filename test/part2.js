import Data from './__mocks__/mockData.js';

export const editTask = ({
  index, checked, value, type,
}) => {
  const data = new Data();
  const tasks = data.getData();
  const editedTask = tasks.filter((item) => item.index === Number(index))[0];

  if (type === 'checkbox') {
    editedTask.completed = checked;
  }

  if (type === 'text') {
    editedTask.description = value;
  }

  tasks[editedTask.index - 1] = editedTask;
  data.setData(tasks);

  return data.getData()[editedTask.index - 1];
};

export const deleteTasks = () => {
  const checks = document.querySelectorAll('input[type="checkbox"]');

  const checkeds = [];
  checks.forEach((e) => {
    if (e.checked) checkeds.push(e.name);
  });

  return checkeds;
};