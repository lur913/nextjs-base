/**
 * 这是一个 todos 的完整实例
 */

'use client'

import React from "react";

type Todo = {
  id: number;
  title: string;
  done: boolean;
}

let nextId = 3;
const initialTodos: Todo[] = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function Page() {
  const [todos, setTodos] = React.useState(initialTodos);

  function handleAddTodo(title: string) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo: Todo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId: number) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }
  return (
    <div>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

function AddTodo({ onAddTodo }: { onAddTodo: (title: string) => void }) {
  const [title, setTitle] = React.useState('');
  return (
    <div className="py-4 flex gap-4">
      <input
        className="border-2 rounded-xl px-4 py-2"
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white rounded-xl px-4 py-2" onClick={() => {
        setTitle('');
        if (title.trim() !== '') onAddTodo(title);
      }}>Add</button>
    </div>
  )
}

function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}: {
  todos: Todo[];
  onChangeTodo: (nextTodo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="max-w-xl mb-4 bg-gray-700 rounded-xl p-4">
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }: {
  todo: Todo;
  onChange: (nextTodo: Todo) => void;
  onDelete: (todoId: number) => void;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          className="border-2 border-blue-600 rounded-xl px-4 py-2"
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button className="bg-blue-500 rounded py-2 px-4" onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button className="ml-4 bg-blue-500 rounded py-2 px-4" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label className="flex justify-between items-center">
      <input
        type="checkbox"
        className="size-5"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button className="bg-red-500 py-2 px-4 rounded" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}