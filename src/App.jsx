import { useState } from "react"
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm"

const App = () => {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Buy Oranges", completed: false },
		{ id: 2, text: "Complete the ticket", completed: false },
		{ id: 3, text: "Buy cheese", completed: false },
		{ id: 4, text: "call mon", completed: false },
		{ id: 5, text: "send the letter", completed: false },
	])

	const addTodo = (text) => {
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
		</div>
	)
}

export default App
