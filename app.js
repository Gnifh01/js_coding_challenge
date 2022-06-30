const container = document.querySelector("[data-todo-container]");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const labelCheck = document.querySelector("#labelCheck");
const todosTemplate = document.querySelector("[data-todo-template]");
const searchInput = document.querySelector("[data-search-input]");
const select = document.querySelector("[data-todo-select]");
const selectCompleted = document.querySelector("[data-todo-select-completed]");
const tbody = document.querySelector("[data-tbody]");
const pageNumber = document.querySelector("[data-page-number]");

const color_1 = document.querySelector("#color-1")
const color_2 = document.querySelector("#color-2")
const color_3 = document.querySelector("#color-3")
const color_4 = document.querySelector("#color-4")

let counter = 10;
let page = 1;
let allTodos = [];
let totalPage = 20;

const storageTodos = () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((todos) => {
    todos.forEach((todo) => {
      allTodos.push(todo);
    });
  })
  .then(() => pagination(printTodos(allTodos)));
};

const printTodos = (array) => {
    array.forEach((todo) => {
    const tableRow = todosTemplate.content.cloneNode(true).children[0];
    const id = tableRow.querySelector("[data-todo-id]");
    const title = tableRow.querySelector("[data-todo-title]");
    const complied = tableRow.querySelector("[data-todo-complied]");
    id.textContent = todo.id;
    title.textContent = todo.title;
    complied.textContent = todo.completed;
    tbody.append(tableRow);
  })
  return array;
}

const pagination = () => {
  const tableRow = document.querySelectorAll(".table-row");
  tableRow.forEach((element) => {
    element.style.display = "none";
  })
  const arrayOfRow = Array.from(tableRow)
  arrayOfRow.filter((element, index) => {
    if(index >= (page - 1) * counter && index < page * counter) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  }).forEach((element) => {
    element.style.display = "table-row";
  })
  pageNumber.innerHTML = `Page ${page} of ${totalPage}`
}

const tableClear = () => {
  tbody.innerHTML = "";
}

const next = () => {
  const tableRow = document.querySelectorAll(".table-row");
  const arrElements = Array.from(tableRow);
  if((page * counter) < arrElements.length) page++;
  pagination(arrElements);
}

const prev = () => {
  const tableRow = document.querySelectorAll(".table-row")
  const arrElements = Array.from(tableRow);
  if(page > 1) page--;
  pagination(arrElements);
}

const searchAllTodos = (e) => {
  totalPage = 0;
  const textValue = e.target.value.toLowerCase();
  tableClear();
  allTodos.forEach((todo) => {
    if(todo.title.toLowerCase().includes(textValue) || textValue === "") {        
      const tableRow = todosTemplate.content.cloneNode(true).children[0];
      const id = tableRow.querySelector("[data-todo-id]");
      const title = tableRow.querySelector("[data-todo-title]");
      const complied = tableRow.querySelector("[data-todo-complied]");
      id.textContent = todo.id;
      title.textContent = todo.title;
      complied.textContent = todo.completed;
      tbody.appendChild(tableRow);
    }
  })

  const tableRow = document.querySelectorAll(".table-row");
  const arrayOfRow = Array.from(tableRow)
  arrayOfRow.forEach((element, index) => {
    if(index >= (page - 1) * counter && index < page * counter) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  })
  totalPage = Math.ceil(arrayOfRow.length / counter);
  pagination(arrayOfRow)
}

const tableSorter = (e) => {
  const tableRow = document.querySelectorAll(".table-row");
  const arrayOfElements = Array.from(tableRow);
  arrayOfElements.sort((a, b) => {
    const todoIdA = a.querySelector("[data-todo-id]").textContent;
    const todoIdB = b.querySelector("[data-todo-id]").textContent;
    const todoTitleA = a.querySelector("[data-todo-title]").textContent;
    const todoTitleB = b.querySelector("[data-todo-title]").textContent;
    switch(select.value) {
      case "Numerico Crescente":
        return todoIdA - todoIdB;
      case "Numerico Decrescente":
        return todoIdB - todoIdA;
      case "Alfabetico Crescente":
        return todoTitleA.localeCompare(todoTitleB);
      case "Alfabetico Decrescente":
        return todoTitleB.localeCompare(todoTitleA);
      default:
        return todoIdA - todoIdB;
    }
  }).forEach((element) => {
    tbody.appendChild(element);
  })
  pagination(arrayOfElements);
  e.preventDefault();
}

const todoCompliedCheck = (e) => {
  tableClear();
  totalPage = 0;
  allTodos.filter((element, index) => {
    if(selectCompleted.value === "True") {
      const arrayComplied = element.completed.toString() === "true";
      if(arrayComplied) {
        const tableRow = todosTemplate.content.cloneNode(true).children[0];
        const id = tableRow.querySelector("[data-todo-id]");
        const title = tableRow.querySelector("[data-todo-title]");
        const complied = tableRow.querySelector("[data-todo-complied]");
        id.textContent = element.id;
        title.textContent = element.title;
        complied.textContent = element.completed;
        tbody.appendChild(tableRow);
      }
      totalPage = page * (counter - 1);
    } else if (selectCompleted.value === "False") {
      const arrayComplied = element.completed.toString() === "false";
      if(arrayComplied) {
        const tableRow = todosTemplate.content.cloneNode(true).children[0];
        const id = tableRow.querySelector("[data-todo-id]");
        const title = tableRow.querySelector("[data-todo-title]");
        const complied = tableRow.querySelector("[data-todo-complied]");
        id.textContent = element.id;
        title.textContent = element.title;
        complied.textContent = element.completed;
        tbody.appendChild(tableRow);
      }
      totalPage = counter + 1;
    } else if (selectCompleted.value === "All") {
      const tableRow = todosTemplate.content.cloneNode(true).children[0];
      const id = tableRow.querySelector("[data-todo-id]");
      const title = tableRow.querySelector("[data-todo-title]");
      const complied = tableRow.querySelector("[data-todo-complied]");
      id.textContent = element.id;
      title.textContent = element.title;
      complied.textContent = element.completed;
      tbody.appendChild(tableRow);
      totalPage = counter * 2;
    } else {
      const tableRow = todosTemplate.content.cloneNode(true).children[0];
      const id = tableRow.querySelector("[data-todo-id]");
      const title = tableRow.querySelector("[data-todo-title]");
      const complied = tableRow.querySelector("[data-todo-complied]");
      id.textContent = element.id;
      title.textContent = element.title;
      complied.textContent = element.completed;
      tbody.appendChild(tableRow);
      totalPage = page * (counter - 1);
    }
    const tableRow = document.querySelectorAll(".table-row");
    const arrayOfRow = Array.from(tableRow)
    pagination(arrayOfRow);
  }).forEach((element) => {
    element.style.display = "table-row";
  })
  e.preventDefault();
}


nextButton.addEventListener('click', next)
prevButton.addEventListener('click', prev)
select.addEventListener('click', tableSorter)
selectCompleted.addEventListener('click', todoCompliedCheck)
color_1.addEventListener('click', (e) => {
  container.classList.remove("color-1", "color-2", "color-3" ,"color-4");
  container.classList.toggle("color-1");
  e.preventDefault();
})
color_2.addEventListener('click', (e) => {
  container.classList.remove("color-1", "color-2", "color-3", "color-4");
  container.classList.toggle("color-2");
  e.preventDefault();
})
color_3.addEventListener('click', (e) => { 
  container.classList.remove("color-1", "color-2", "color-3", "color-4");
  container.classList.toggle("color-3");
  e.preventDefault();
})
color_4.addEventListener('click', (e) => {
  container.classList.remove("color-1", "color-2", "color-3", "color-4");
  container.classList.toggle("color-4");
  e.preventDefault();
})

window.addEventListener("load", storageTodos);
searchInput.addEventListener("input", searchAllTodos);


