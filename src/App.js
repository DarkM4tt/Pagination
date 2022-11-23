import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const apiLink = "https://jsonplaceholder.typicode.com/todos";

  async function fetchAPI() {
    await fetch(apiLink)
      .then((res) => res.json())
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default App;
