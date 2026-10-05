import { useEffect, useState } from 'react';
import ListTodo from './ListTodo';
import Input from './Input';

const Todo = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = () => {
        fetch('/api/todos')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setTodos(data);
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const deleteTodo = (id) => {
        fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    getTodos();
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <h1>My Todos</h1>
            <Input getTodos={getTodos} />
            <ListTodo todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
};

export default Todo;