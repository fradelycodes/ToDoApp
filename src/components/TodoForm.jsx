import { useState } from "react"
import PropTypes from "prop-types"

const TodoForm = ({ addTodo }) => {
	const [todo, setTodo] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		if (todo.trim()) {
			addTodo(todo)
			setTodo("")
		}
	}

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input
				className="todoInput"
				type="text"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				placeholder="Add a new task"
			/>
			<button type="submit" className="submitBtn">
				Submit
			</button>
		</form>
	)
}

TodoForm.propTypes = {
	addTodo: PropTypes.func.isRequired,
}

export default TodoForm
