import {
  deleteArrOfIndex, editTask, exhangeData, getData, setData,
} from './data.js';
import createNewElement from './newElement.js';

class Task {
  constructor() {
    document.querySelector('#refresh-btn').addEventListener('click', this.refreshTasks);
    this.draggedLiId = null;
  }

  buildForm1 = () => {
    const form = createNewElement({
      type: 'form',
      id: 'form1',
      className: '',
      content: `
        <input id="form1-input1" name="newTask" type="text"   placeholder="Add to your list..."
        />

        <button type='submit' id='form1-btn'><span id="form1-span" class="material-symbols-outlined">
        subdirectory_arrow_left
        </span></button>
        
      `,
      events: {
        submit: this.addNew,
      },
    });

    document.querySelector('main').appendChild(form);
  }

  buildForm2 = () => {
    const btn = createNewElement({
      type: 'button',
      id: 'form2-btn',
      content: 'Clear all completed',
    });

    const form = createNewElement({
      type: 'form',
      id: 'form2',
      events: {
        submit: this.deleteTasks,
        input: editTask,
      },
    });

    form.append(btn);
    document.querySelector('main').appendChild(form);
  }

  liTemplate = (task) => {
    const span1 = createNewElement({
      type: 'span',
      id: `span1-${task.index}`,
      className: 'material-symbols-outlined',
      content: 'more_vert',
      events: { click: this.enableEdit },
    });

    const span2 = createNewElement({
      type: 'span',
      id: `span2-${task.index}`,
      className: 'material-symbols-outlined span-none',
      content: 'delete',
      events: { click: this.deleteSingleTask },
    });

    const li = createNewElement({
      type: 'li',
      id: `li-${task.index}`,
      className: 'form2-ul-li',
      content: `<input class="form2-input" type="checkbox" name="${task.index}" ${task.completed ? 'checked' : ''}/>
      <input class="form2-input" type="text" value="${task.description}" name="${task.index}" disabled/>
      <hr>
      `,
      events: {
        drag: this.drag,
        dragover: this.dragover,
      },
    });

    li.draggable = 'true';
    li.appendChild(span1);
    li.appendChild(span2);
    return li;
  }

  defineLi = (e) => {
    let li;
    if (e.target.nodeName === 'LI') li = e.target;
    if (e.target.parentNode.nodeName === 'LI') li = e.target.parentNode;

    return li;
  }

  drag = (e) => {
    e.preventDefault();
    this.draggedLiId = e.target.id;
  }

  dragover = (e) => {
    e.preventDefault();
  }

  drop = (e) => {
    e.preventDefault();
    const draggedLi = this.draggedLiId ? document.querySelector(`#${this.draggedLiId}`) : null;
    const draggOverE = this.defineLi(e);
    const ul = document.querySelector('#ul-tasks');

    if (draggedLi && draggOverE.id !== draggedLi.id) {
      ul.insertBefore(draggedLi, draggOverE);
      exhangeData(draggedLi.id, draggOverE.id);
      this.refreshTasks();
    }
  }

  refreshTasks = () => {
    document.querySelector('#ul-tasks').innerHTML = '';
    this.showTasks();
  }

  showTasks = () => {
    const ul = createNewElement({
      type: 'ul',
      id: 'ul-tasks',
      className: 'form2-ul',
      events: {
        drop: this.drop,
      },
    });

    getData().forEach((e) => {
      ul.appendChild(this.liTemplate(e));
    });

    document.querySelector('#form2').insertAdjacentElement('afterbegin', ul);
  }

  addNew = (e) => {
    e.preventDefault();
    const tasks = getData();
    const newTask = {
      index: tasks.length + 1,
      description: e.target.elements[0].value,
      completed: false,
    };

    if (newTask.description.length > 0) {
      tasks.push(newTask);
      setData(tasks);
      this.refreshTasks();
      e.target.reset();
    }
  }

  deleteTasks = (e) => {
    e.preventDefault();
    const checks = document.querySelectorAll('input[type="checkbox"]');
    const checkeds = [];
    checks.forEach((e) => {
      if (e.checked) checkeds.push(e.name);
    });

    if (checkeds.length > 0) {
      deleteArrOfIndex(checkeds);
    }
    this.refreshTasks();
  }

  deleteSingleTask = (e) => {
    const arrIndex = new Array(e.target.id.split('-')[1]);
    deleteArrOfIndex(arrIndex);
    this.refreshTasks();
  }

  enableEdit = (e) => {
    const span1 = document.querySelector(`#${e.target.id}`);
    span1.classList.add('span-none');

    const index = e.target.id.split('-')[1];
    const span2 = document.querySelector(`#span2-${index}`);
    span2.classList.remove('span-none');

    const input = document.querySelector(`#li-${index} input[type="text"]`);
    input.disabled = false;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

export default Task;
