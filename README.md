## `정리`

[ 출처 ] : https://www.youtube.com/watch?v=LoYbN6qoQHA&t=5s

[ 폰트 사용법 ]
https://fontawesome.com/docs/web/use-with/react/

1. Add SVG Core </br>
   npm i --save @fortawesome/fontawesome-svg-core

2. Add Icon Packages </br>
   npm i --save @fortawesome/free-solid-svg-icons </br>
   npm i --save @fortawesome/free-regular-svg-icons

3. Add the React Component </br>
   npm i --save @fortawesome/react-fontawesome@latest

[todo 데이터 추가 및 출력] </br>

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
  // todos.map()을 이용해 Todo.js로 todo 데이터 값 전달해 출력
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        <Todo task={todo} key={index} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
}

export default TodoWrapper;
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
function Todo({ task, toggleComplete }) {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Todo;
```
