import React, { useState, useEffect } from "react";
import "./App.css";

const apiLink = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAPI();
  }, []);

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

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <select onChange={(e) => setTodosPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <div>
        {visibleTodos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
        <span className="handler" onClick={prevPageHandler}>
          Prev
        </span>
        <p>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >{`${page} | `}</span>
          ))}
        </p>
        <span className="handler" onClick={nextPageHandler}>
          Next
        </span>
      </div>
    </>
  );
}

export default App;
