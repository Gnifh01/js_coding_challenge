const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const todosTemplate = document.querySelector("[data-todo-template]");
const searchInput = document.querySelector("[data-search-input]");
const tbody = document.querySelector("[data-tbody]");

let counter = 10;
let allTodos = [];

/**
 * TODO:-----------------------FIX CONTROLS COUNTER-----------------------
*/
const printTodos = () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((todos) => {
      allTodos = todos.map((todo) => {
        const tableRow = todosTemplate.content.cloneNode(true).children[0];
        const id = tableRow.querySelector("[data-todo-id]");
        const title = tableRow.querySelector("[data-todo-title]");
        const complied = tableRow.querySelector("[data-todo-complied]");

        if (todo.id <= counter && todo.id > counter - 10) {
          id.textContent = todo.id;
          title.textContent = todo.title;
          complied.textContent = todo.completed;
          tbody.appendChild(tableRow);
          console.log("counter attuale: " + counter);
        } else if (counter > 200) {
          counter = 10;
        } else if (counter === 0) {
          counter = 200;
        }

        return {id: todo.id, title: todo.title, completed: todo.completed, element: tableRow,};
      });
    });
};

nextButton.addEventListener("click", () => {
  counter += 10;
  tbody.innerHTML = "";
  printTodos();
});

prevButton.addEventListener("click", () => {
  counter -= 10;
  tbody.innerHTML = "";
  printTodos();
});

printTodos();


/**
 * TODO:---------------------------------FIX SEARCH OUTPUT---------------------------------
 */
searchInput.addEventListener("input", (e) => {
  const textValue = e.target.value.toLowerCase();
  allTodos.filter((todo) => {
  /*   tableRow.innerHTML = ""; */
    if (todo.title.toLowerCase().includes(textValue) || todo.id.toString().includes(textValue)) {
      todo.element.style.display = "table-row";
    } else {
      todo.element.style.display = "none";
    }
  });
});

