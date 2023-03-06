import { createElement } from "../function/dom.js";

/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class TodoList {
  /** @type {Todo[]} */
  #todos = [];

  /** @param {Todo[]} todos */
  constructor(todos) {
    this.#todos = todos;
    const list = document.querySelector(".list-group");
    for (let todo of todos) {
      const task = new TodoListItem(todo);
      task.appendTo(list);
    }
  }
}

class TodoListItem {
  #element;

  /** @type {Todo} */
  constructor(todo) {
    const id = `todo-${todo.id}`;
    const li = createElement("li", {
      class: "todo list-group-item d-flex",
    });
    const checkbox = createElement("input", {
      type: "checkbox",
      class: "form-check-input",
      id,
      checked: todo.completed ? "" : null,
    });
    const label = createElement("label", {
      class: "ms-2 form-check-label",
      for: id,
    });
    label.innerText = todo.title;
    const button = createElement("button", {
      class: "ms-auto btn btn-danger btn-sm",
    });
    button.innerHTML = `<i class="bi-trash"> </i>`;

    li.append(checkbox);
    li.append(label);
    li.append(button);

    button.addEventListener("click", (event) => this.remove(event));

    this.#element = li;
  }

  /** @param {HTMLElement} element */
  appendTo(element) {
    element.append(this.#element);
  }

  /** @param {PointerEvent} event */
  remove(event) {
    event.preventDefault();
    this.#element.remove();
  }
}
