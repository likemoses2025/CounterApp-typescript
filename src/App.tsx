import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { fetchPosts } from "./actions/posts";

import "./App.css";
import { RootState } from "./reducers";

type Props = {
  onIncrement: () => void;
  onDecrement: () => void;
};

interface Post {
  userId: number;
  id: number;
  title: string;
}

function App({ onIncrement, onDecrement }: Props) {
  const dispatch = useDispatch();

  const counter = useSelector((state: RootState) => state.counter);
  const todos: string[] = useSelector((state: RootState) => state.todos);
  const posts: Post[] = useSelector((state: RootState) => state.posts);

  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: todoValue });
    setTodoValue("");
  };

  return (
    <div className="App">
      Click: {counter} times
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <ul>
        {todos.map((todo, index) => {
          return <li key={index}>{todo}</li>;
        })}
      </ul>
      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange} />
        <input type="submit" />
      </form>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
