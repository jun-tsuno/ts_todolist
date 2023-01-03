export interface Task {
	id: string;
	taskName: string;
	deadline: string | undefined;
	isDone: boolean;
}

export interface TodoContextType {
	todos: Task[];
	setTodos(newTodo: Task[]): void;
	addTodo(newTodo: Task): void;
	deleteTodo(taskId: string): void;
	doneTodo(taskId: string): void;
	editTodo(taskId: string, newTaskName: string, newDeadline: string): void;
}
