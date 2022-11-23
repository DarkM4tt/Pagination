import React, { useState, useEffect } from "react";
import "./App.css";

const apiLink = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const numOfTotalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  async function fetchAPI() {
    await fetch(apiLink)
      .then((res) => res.json())
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const prevPageHandler = () => {};

  const nextPageHandler = () => {};

  return (
    <div>
      {visibleTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <span onClick={prevPageHandler}>Prev</span>
      <p>
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${currentPage === page ? "active" : ""}`}
          >{`${page} | `}</span>
        ))}
      </p>
      <span onClick={nextPageHandler}>Next</span>
    </div>
  );
}

export default App;
