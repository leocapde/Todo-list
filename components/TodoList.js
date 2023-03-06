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

  /** @type {HTMLUListElement} */
  #listElement = [];

  /** @param {Todo[]} todos */
  constructor(todos) {
    this.#todos = todos;
    this.#listElement = document.querySelector(".list-group");
    for (let todo of todos) {
      const task = new TodoListItem(todo);
      task.prependTo(this.#listElement);
    }
    document
      .querySelector("#todo-form")
      .addEventListener("submit", (event) => this.onSubmit(event));
  }

  /** @param {SubmitEvent} event */
  onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const title = new FormData(form).get("new-task").toString().trim();
    if (title === "") {
      return;
    }
    const todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    const item = new TodoListItem(todo);
    item.prependTo(this.#listElement);
    form.reset();
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
  prependTo(element) {
    element.prepend(this.#element);
  }

  /** @param {PointerEvent} event */
  remove(event) {
    event.preventDefault();
    this.#element.remove();
  }
}
