import React, { useState } from "react";
import UserInput from "./components/UserInput";
import ToDoList from "./components/ToDoList";
import { Task } from "./types/types";

const App = () => {
	const [todos, setTodos] = useState<Task[]>([]);

	const addTodo = (newTodo: Task): void => {
		setTodos([...todos, newTodo]);
	};

	const deleteTodo = (taskId: string): void => {
		const newTodos = todos.filter((todo) => {
			return todo.id !== taskId;
		});
		setTodos(newTodos);
	};

	const doneTodo = (taskId: string): void => {
		const newTodos = todos.filter((todo) => {
			if (todo.id === taskId) {
				todo.isDone = !todo.isDone;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	return (
		<div className="text-[white]">
			<h1 className="text-3xl p-5 text-[#ffba08] ">ToDo List</h1>
			<div>
				<div className="text-center py-10">
					<UserInput addTodo={addTodo} />
				</div>
				<div>
					<ToDoList todos={todos} deleteTodo={deleteTodo} doneTodo={doneTodo} />
				</div>
			</div>
		</div>
	);
};

export default App;
