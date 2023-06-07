'use client'
import { useEffect, useReducer } from 'react';
import TaskService from '@/app/services/TaskService';

const initialState = {
  todos: [],
  newTodo: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'SET_NEW_TODO':
      return { ...state, newTodo: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
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
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const newTask = await TaskService.createNewTask(newTodo.trim());
        dispatch({ type: 'ADD_TODO', payload: newTask });
        dispatch({ type: 'SET_NEW_TODO', payload: '' });
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };
  const deleteTodo2 = useEffect(() => {
    TaskService.deleteNewTask().the
  })
  const deleteTodo = async (id) => {
    try {
      await TaskService.deleteNewTask(id);
      dispatch({ type: 'DELETE_TODO', payload: id });
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
          onChange={(e) =>
            dispatch({ type: 'SET_NEW_TODO', payload: e.target.value })
          }
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 py-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between border-b border-gray-300 py-2"
          >
            {todo.content}
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
