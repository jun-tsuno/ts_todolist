import { createContext, useReducer } from "react";
import { Task, TodoContextType } from "../types/types";
import todoReducer from "../reducers/todoReducer";
import {
	addTodo,
	deleteTodo,
	doneTodo,
	editTodo,
	resetTodo,
} from "../actions/todoActions";
import produce from "immer";

export const TodoContext = createContext<TodoContextType>({
	todos: [],
	handleAddTodo: (): any => {},
	handleDeleteTodo: () => {},
	handleDoneTodo: () => {},
	handleEditTodo: () => {},
	handleReset: () => {},
});

export const TodoProvider = ({ children }: any): JSX.Element => {
	// const [todos, setTodos] = useState<Task[]>([]);
	const [todos, dispatch] = useReducer(produce(todoReducer), []);

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

	const handleReset = () => {
		dispatch(resetTodo());
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				handleAddTodo,
				handleDeleteTodo,
				handleDoneTodo,
				handleEditTodo,
				handleReset,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
