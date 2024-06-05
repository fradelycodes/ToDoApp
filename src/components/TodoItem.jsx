import { useState } from "react"
import PropTypes from "prop-types"

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [newText, setNewText] = useState(todo.text)

	const handleEdit = () => {
		if (isEditing) {
			editTodo(todo.id, newText)
		}
		setIsEditing(!isEditing)
	}

	return (
		<div className="todo-item">
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleComplete(todo.id)}
			/>
			{isEditing ? (
				<input
					type="text"
					value={newText}
					onChange={(e) => setNewText(e.target.value)}
				/>
			) : (
				<span
					style={{ textDecoration: todo.completed ? "line-through" : "none" }}
				>
					{todo.text}
				</span>
			)}
			<button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
			<button onClick={() => deleteTodo(todo.id)}>Delete</button>
		</div>
	)
}

TodoItem.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	}).isRequired,
	toggleComplete: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	editTodo: PropTypes.func.isRequired,
}

export default TodoItem
