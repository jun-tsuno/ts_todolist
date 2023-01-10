import { UserCredential } from "firebase/auth";

export interface Task {
	id: string;
	taskName: string;
	deadline: string | undefined;
	isDone: boolean;
}

export interface TodoContextType {
	todos: Task[];
	handleAddTodo(newTodo: Task): { type: string; payload: Task };
	handleDeleteTodo(taskId: string): void;
	handleDoneTodo(taskId: string): void;
	handleEditTodo(
		taskId: string,
		newTaskName: string,
		newDeadline: string
	): void;
}

export interface UserContextType {
	user: {};
	setUser(value: object): void;
	// signIn(email: string, password: string): Promise<UserCredential>;
}

export type TodoAction =
	| { type: "ADD_TODO"; payload: Task }
	| { type: "DELETE_TODO"; payload: string }
	| { type: "DONE_TODO"; payload: string }
	| {
			type: "EDIT_TODO";
			payload: { taskId: string; newTaskName: string; newDeadline: string };
	  };
