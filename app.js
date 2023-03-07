import { TodoList } from "./components/TodoList.js";
import { fetchJSON } from "./function/api.js";
import { createElement } from "./function/dom.js";

try {
  const todos = await fetchJSON(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  new TodoList(todos);
} catch (error) {
  const alertElement = createElement("div", {
    class: "alert alert-danger m-2",
    role: "alert",
  });
  alertElement.innerText = "Impossible de charger les éléments";
  document.body.prepend(alertElement);
  console.error(error);
}
