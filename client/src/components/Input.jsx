import PropTypes from 'prop-types';
import { useState } from 'react';

const Input = ({ getTodos }) => {
    const [action, setAction] = useState('');

    const addTodo = () => {
        const task = { action: action };

        if (task.action && task.action.length > 0) {
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        getTodos();
                        setAction('');
                    }
                })
                .catch((error) => console.error('Error:', error));
        } else {
            console.log('input field required');
        }
    };

    const handleChange = (e) => {
        setAction(e.target.value);
    };

    return (
        <div>
            <input type="text" onChange={handleChange} value={action} />
            <button onClick={addTodo}>Add</button>
        </div>
    );
}

Input.propTypes = {
    getTodos: PropTypes.func.isRequired,
};

export default Input;