import { createContext, useReducer } from "react";
import { Task, TodoContextType } from "../types/types";
import todoReducer from "../reducers/todoReducer";
import {
	addTodo,
	deleteTodo,
	doneTodo,
	editTodo,
} from "../actions/todoActions";

export const TodoContext = createContext<TodoContextType>({
	todos: [],
	handleAddTodo: (): any => {},
	handleDeleteTodo: () => {},
	handleDoneTodo: () => {},
	handleEditTodo: () => {},
});

export const TodoProvider = ({ children }: any): JSX.Element => {
	const [todos, dispatch] = useReducer(todoReducer, []);

	const handleAddTodo = (newTodo: Task): any => {
		dispatch(addTodo(newTodo));
	};

	const handleDeleteTodo = (taskId: string) => {
		dispatch(deleteTodo(taskId));
	};

	const handleDoneTodo = (taskId: string) => {
		dispatch(doneTodo(taskId));
	};

	const handleEditTodo = (
		taskId: string,
		newTaskName: string,
		newDeadline: string
	) => {
		dispatch(editTodo(taskId, newTaskName, newDeadline));
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				handleAddTodo,
				handleDeleteTodo,
				handleDoneTodo,
				handleEditTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
