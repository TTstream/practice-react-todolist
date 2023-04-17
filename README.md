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

[todo 데이터 추가] </br>
1. TodoWrapper 에서 addTodo 함수를 만들어 TodoForm.js로 넘겨주기
```javascript
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uudiv4 } from "uuid";
uudiv4();

function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uudiv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };
  return (
    <div className="TodoWrapper">
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default TodoWrapper;

```

2. 전달받은 addTodo를 이용해 submit한 데이터 값 추가

```javascript
import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
