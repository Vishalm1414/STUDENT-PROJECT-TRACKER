import PropTypes from 'prop-types';

const ListTodo = ({ todos, deleteTodo }) => {
    return (
        <ul>
            {todos && todos.length > 0 ? (
                todos.map((todo) => {
                    return (
                        <li key={todo._id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{todo.action}</span>
                                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                            </div>
                        </li>
                    );
                })
            ) : (
                <li>* No todo left *</li>
            )}
        </ul>
    );
};

ListTodo.propTypes = {
    todos: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default ListTodo;