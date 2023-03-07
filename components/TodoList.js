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
      .addEventListener("submit", (event) => this.#onSubmit(event));

    document
      .querySelectorAll(".btn-group button")
      .forEach((button) =>
        button.addEventListener("click", (event) => this.#toggleFilter(event))
      );
  }

  /** @param {SubmitEvent} event */
  #onSubmit(event) {
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

  /** @param {PointerEvent} event */
  #toggleFilter(event) {
    event.preventDefault();
    const filter = event.currentTarget.getAttribute("data-filter");
    event.currentTarget.parentElement
      .querySelector(".active")
      .classList.remove("active");
    event.currentTarget.classList.add("active");
    if (filter === "todo") {
      this.#listElement.classList.remove("hide-todo");
      this.#listElement.classList.add("hide-completed");
    } else if (filter === "done") {
      this.#listElement.classList.remove("hide-completed");
      this.#listElement.classList.add("hide-todo");
    } else {
      this.#listElement.classList.remove("hide-completed");
      this.#listElement.classList.remove("hide-todo");
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
    this.#element = li;
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
    this.toggle(checkbox);

    button.addEventListener("click", (event) => this.remove(event));
    checkbox.addEventListener("change", (event) =>
      this.toggle(event.currentTarget)
    );
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

  /**
   * Change l'état (à faire / fait) de la tâche
   * @param {HTMLInputElement} checkbox
   */
  toggle(checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add("is-completed");
    } else {
      this.#element.classList.remove("is-completed");
    }
  }
}
