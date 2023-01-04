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
			for (let i = 0; i < todos.length; i++) {
				if (todos[i].id === action.payload) {
					todos[i].isDone = !todos[i].isDone;
				}
			}
			return todos;

		case "EDIT_TODO":
			// const newTodoEdit = todos.filter((todo) => {
			// 	if (todo.id === action.payload.taskId) {
			// 		todo.taskName = action.payload.newTaskName;
			// 		todo.deadline = action.payload.newDeadline;
			// 	}
			// 	return todo;
			// });
			// return [...newTodoEdit];
			for (let i = 0; i < todos.length; i++) {
				if (todos[i].id === action.payload.taskId) {
					todos[i].taskName = action.payload.newTaskName;
					todos[i].deadline = action.payload.newDeadline;
				}
			}
			return todos;
		default:
			return todos;
	}
};

export default todoReducer;
