import TodoItem from "./TodoItem"
import PropTypes from "prop-types"

const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
	return (
		<div className="todo-list-container">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleComplete={toggleComplete}
					deleteTodo={deleteTodo}
					editTodo={editTodo}
					todos={todos}
				/>
			))}
		</div>
	)
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		})
	).isRequired,
	toggleComplete: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	editTodo: PropTypes.func.isRequired,
}

export default TodoList
