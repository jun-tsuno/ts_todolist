import { createContext, useState } from "react";
import { Task, TodoContextType } from "../types/types";

export const TodoContext = createContext<TodoContextType>({
	todos: [],
	setTodos: () => {},
	addTodo: () => {},
	deleteTodo: () => {},
	doneTodo: () => {},
	editTodo: () => {},
});

export const TodoProvider = ({ children }: any) => {
	const [todos, setTodos] = useState<Task[]>([]);

	const addTodo = (newTodo: Task): void => {
		setTodos([...todos, newTodo]);
	};

	const deleteTodo = (taskId: string) => {
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

	const editTodo = (
		taskId: string,
		newTaskName: string,
		newDeadline: string
	): void => {
		const newTodos = todos.filter((todo) => {
			if (todo.id === taskId) {
				todo.taskName = newTaskName;
				todo.deadline = newDeadline;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				setTodos,
				addTodo,
				deleteTodo,
				doneTodo,
				editTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
