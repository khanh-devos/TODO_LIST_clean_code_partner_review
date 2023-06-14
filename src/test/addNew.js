// const { getData, setData } = require("../data");
import * as data from '../data.js'


const addNew = (description) => {
//   e.preventDefault();
  const tasks = data.getData();
  const newTask = {
    index: tasks.length + 1,
    // description: e.target.elements[0].value,
    description: description,
    completed: false,
  };

  if (newTask.description.length > 0) {
    tasks.push(newTask);
    data.setData(tasks);
    // this.refreshTasks();
    // e.target.reset();
  }

  const newData = data.getData()
  return newData[newData.length - 1].description
}

module.exports = addNew;