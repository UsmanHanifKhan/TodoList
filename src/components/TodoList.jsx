import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import '../assets/css/TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [showIncomplete, setShowIncomplete] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localStorageData = JSON.parse(localStorage.getItem('todos'));
                if (localStorageData) {
                    setTodos(localStorageData);
                } else {
                    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                    const data = await response.json();
                    setTodos(data);
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData();
    }, []);

    const handleToggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleAddTodo = (newTodo) => {
        const newTodoItem = {
            id: todos.length + 1,
            userId: 1,
            title: newTodo.title,
            description: newTodo.description,
            completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodoItem]);

        // Update local storage
        const updatedLocalStorage = [...todos, newTodoItem];
        localStorage.setItem('todos', JSON.stringify(updatedLocalStorage));
    };

    const handleToggleShowIncomplete = () => {
        setShowIncomplete((prevShowIncomplete) => !prevShowIncomplete);
    };

    //Filter the todo to show Incomplete Task
    const filteredTodos = showIncomplete ? todos.filter((todo) => !todo.completed) : todos;

    //Sort the todo with id , i do not sort it using date the reason is that i have no date property in my Api  
    const sortedTodos = [...filteredTodos].sort((a, b) => a.id - b.id);

    //handle Delete The Todo
    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    //responsive it on all device using flex 

    return (
        <div className='Todo-List'>
            <h1>Todo List</h1>
            <TodoForm onAddTodo={handleAddTodo} />
            <div>
                <label>
                    Show Incomplete:
                    <input
                        type="checkbox"
                        checked={showIncomplete}
                        onChange={handleToggleShowIncomplete}
                    />
                </label>
            </div>
            <ul>
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggleComplete={handleToggleComplete}
                        onDeleteTodo={handleDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
