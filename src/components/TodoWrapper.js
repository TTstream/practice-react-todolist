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
