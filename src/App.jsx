import { useState } from "react"
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm"
import ReactTooltip from "react-tooltip"
import "./sass/_general.scss"

const App = () => {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Learn React", completed: false },
		{ id: 2, text: "Build a Todo App", completed: false },
		{ id: 3, text: "Learn SCSS", completed: false },
		{ id: 4, text: "Practice JavaScript", completed: false },
		{ id: 5, text: "Read a book", completed: false },
	])
	const [tooltipMessage, setTooltipMessage] = useState("")

	const addTodo = (text) => {
		if (todos.some((todo) => todo.text.toLowerCase() === text.toLowerCase())) {
			setTooltipMessage("Task already exists")
			ReactTooltip.show(document.getElementById("add-todo-button"))
			setTimeout(() => {
				ReactTooltip.hide(document.getElementById("add-todo-button"))
			}, 2000)
			return
		}

		const newTodo = {
			id: Date.now(),
			text,
			completed: false,
		}
		setTodos([...todos, newTodo])
	}

	const toggleComplete = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		)
	}

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id))
	}

	const editTodo = (id, newText) => {
		if (
			todos.some(
				(todo) =>
					todo.text.toLowerCase() === newText.toLowerCase() && todo.id !== id
			)
		) {
			setTooltipMessage("Task already exists")
			ReactTooltip.show(document.getElementById(`edit-input-${id}`))
			setTimeout(() => {
				ReactTooltip.hide(document.getElementById(`edit-input-${id}`))
			}, 2000)
			return
		}
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
		)
	}

	return (
		<div className="app-container">
			<h1>Todo List</h1>
			<TodoForm addTodo={addTodo} />
			<TodoList
				todos={todos}
				toggleComplete={toggleComplete}
				deleteTodo={deleteTodo}
				editTodo={editTodo}
			/>
			<button id="add-todo-button" data-tip={tooltipMessage}>
				+
			</button>
			<ReactTooltip />
		</div>
	)
}

export default App
