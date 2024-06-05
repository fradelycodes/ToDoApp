import { useState } from "react"
import PropTypes from "prop-types"
import ReactTooltip from "react-tooltip"

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo, todos }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [newText, setNewText] = useState(todo.text)

	const handleEdit = () => {
		if (isEditing) {
			if (
				todos.some(
					(t) =>
						t.text.toLowerCase() === newText.toLowerCase() && t.id !== todo.id
				)
			) {
				const inputElement = document.getElementById(`edit-input-${todo.id}`)
				ReactTooltip.show(inputElement)
				setTimeout(() => {
					ReactTooltip.hide(inputElement)
				}, 2000)
				return
			}
			editTodo(todo.id, newText)
		}
		setIsEditing(!isEditing)
	}

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleEdit()
		}
	}

	return (
		<div className="todo-item">
			<label className="checkContainer">
				<input
					type="checkbox"
					className="checkBoxes"
					checked={todo.completed}
					onChange={() => toggleComplete(todo.id)}
				/>
				<span className="checkmark"></span>
			</label>
			{isEditing ? (
				<input
					type="text"
					value={newText}
					onChange={(e) => setNewText(e.target.value)}
					onKeyPress={handleKeyPress}
					id={`edit-input-${todo.id}`}
					data-tip="Task already exists"
					className="editInput"
				/>
			) : (
				<span
					className="verticalLine"
					style={{ textDecoration: todo.completed ? "line-through" : "none" }}
				>
					{todo.text}
				</span>
			)}
			<button className="editBtn" onClick={handleEdit}>
				{isEditing ? "Save" : "Edit"}
			</button>
			<button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
				Delete
			</button>
			<ReactTooltip />
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
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		})
	).isRequired,
}

export default TodoItem
