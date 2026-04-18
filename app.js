// ===== STORE =====
const store = {
  state: {
    page: "home",
    todos: JSON.parse(localStorage.getItem("todos") || "[]")
  },
  setState(newState) {
    this.state = { ...this.state, ...newState };
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    render();
  }
};

// ===== ROUTER =====
function navigate(page) {
  store.setState({ page });
}

// ===== COMPONENTS =====
function Home() {
  return `
    <div class="card">
      <h1>🚀 Mega SPA</h1>
      <p>Ты почти сделал свой фронтенд-фреймворк 😈</p>
    </div>
  `;
}

function Todos() {
  const { todos } = store.state;

  return `
    <div class="card">
      <h2>Todo List</h2>
      <input id="todoInput" placeholder="Новая задача"/>
      <button onclick="addTodo()">Добавить</button>

      <ul>
        ${todos.map(t => `
          <li>
            ${t.text}
            <div>
              <button onclick="removeTodo(${t.id})">✖</button>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function Stats() {
  const total = store.state.todos.length;

  return `
    <div class="card">
      <h2>Статистика</h2>
      <p>Всего задач: ${total}</p>
    </div>
  `;
}

// ===== ACTIONS =====
function addTodo() {
  const input = document.getElementById("todoInput");
  if (!input.value.trim()) return;

  const todos = [
    ...store.state.todos,
    { id: Date.now(), text: input.value }
  ];

  store.setState({ todos });
  input.value = "";
}

function removeTodo(id) {
  const todos = store.state.todos.filter(t => t.id !== id);
  store.setState({ todos });
}

// ===== RENDER =====
function render() {
  const app = document.getElementById("app");

  switch (store.state.page) {
    case "todos":
      app.innerHTML = Todos();
      break;
    case "stats":
      app.innerHTML = Stats();
      break;
    default:
      app.innerHTML = Home();
  }
}

// ===== INIT =====
render();