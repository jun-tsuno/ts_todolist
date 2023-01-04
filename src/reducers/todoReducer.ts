import { Task } from "../types/types";
import { TodoAction } from "../types/types";

const todoReducer = (todos: Task[], action: TodoAction): Task[] => {
	switch (action.type) {
		case "ADD_TODO":
			return [...todos, action.payload];

		case "DELETE_TODO":
			const newTodoDelete = todos.filter((todo) => {
				return todo.id !== action.payload;
			});
			return [...newTodoDelete];

		case "DONE_TODO":
			const newTodoDone = todos.filter((todo) => {
				if (todo.id === action.payload) {
					todo.isDone = !todo.isDone;
				}
				return todo;
			});
			return [...newTodoDone];

		case "EDIT_TODO":
			const newTodoEdit = todos.filter((todo) => {
				if (todo.id === action.payload.taskId) {
					todo.taskName = action.payload.newTaskName;
					todo.deadline = action.payload.newDeadline;
				}
				return todo;
			});
			return [...newTodoEdit];
		default:
			return todos;
	}
};

export default todoReducer;
