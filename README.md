## `정리`

[ 영상 출처 ] https://www.youtube.com/watch?v=LoYbN6qoQHA&t=5s </br>
[ CSS ] https://github.com/gbopola/todolist-app-react-js/blob/main/src/App.css</br>
[ 폰트 사용법 ]
https://fontawesome.com/docs/web/use-with/react/

1. Add SVG Core </br>
   npm i --save @fortawesome/fontawesome-svg-core

2. Add Icon Packages </br>
   npm i --save @fortawesome/free-solid-svg-icons </br>
   npm i --save @fortawesome/free-regular-svg-icons

3. Add the React Component </br>
   npm i --save @fortawesome/react-fontawesome@latest

[Todos Data CRUD] </br>

```javascript
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uudiv4 } from "uuid";
uudiv4();

// TodoWrapper 에서 addTodo 함수를 만들어 TodoForm.js로 넘겨주기
function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uudiv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };
  // todos 목록 중 todo 클릭시 todo 완료 이벤트(=토글)
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };
  // todos 목록 중 todo 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // todos 목록 중 todo의 isEditing 요소 true로 변경
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  };
  // todos 목록 중 todo값 수정 후 저장시 수정한 값으로 변경 및 idEditing요소 false로 변경
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task: task,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  };
  // todos.map()을 이용해 Todo.js로 todo 데이터 값 전달해 출력
  // isEditing true이면 EditTodoForm으로 변경
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
}
```

```javascript
import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // 전달받은 addTodo를 이용해 데이터 값(value) 추가
    addTodo(value);
    setValue("");
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
```

```javascript
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

// 전달받은 todo 데이터 값 표시 및 className과 토클 이벤트설정
function Todo({ task, toggleComplete, deleteTodo, editTodo }) {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
}

export default Todo;
```

```javascript
import React, { useState } from "react";

// isEditing true이면 보여줄 form
function EditTodoForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
}

export default EditTodoForm;
```
