'use client'
import React, { useEffect, useState, useReducer } from 'react';
import TaskService from '@/app/services/TaskService';

const initialState = {
  todos: [],
  newTodo:''

};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'SET_NEW_TODO':
      return { ...state, newTodo: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos, newTodo } = state;

  useEffect(() => {
    TaskService.getAllTasks()
      .then((tasks) => {
        dispatch({ type: 'SET_TODOS', payload: tasks });
        console.log(tasks)
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosFromStorage) {
      dispatch({ type: 'SET_TODOS', payload: todosFromStorage });
    }
  }, []);
  
  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const newTask = await TaskService.createNewTask(newTodo);
        dispatch({ type: 'ADD_TODO', payload: newTask });
        dispatch({ type: 'SET_NEW_TODO', payload: '' });
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };
  
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTask = { ...todo, completed: !todo.completed };
      await TaskService.updateNewTask(updatedTask);
      dispatch({ type: 'TOGGLE_TODO', payload: id });
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      await TaskService.deleteNewTask(todos[id].id);
      const updatedTodos = [...todos];
      updatedTodos.splice(id, 1);
      dispatch({ type: 'SET_TODOS', payload: updatedTodos });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => dispatch({type: 'SET_NEW_TODO', payload: e.target.value})}/>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 py-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between border-b border-gray-300 py-2`}
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? 'line-through' : ''}>{todo.content}</span>
            </label>
            {!todo.completed && (
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  };
  
  export default TodoPage;
  