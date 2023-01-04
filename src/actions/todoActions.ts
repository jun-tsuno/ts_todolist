import { Task } from "../types/types";

export const addTodo = (newTodo: Task): any => {
	return {
		type: "ADD_TODO",
		payload: newTodo,
	};
};

export const deleteTodo = (taskId: string): any => {
	return {
		type: "DELETE_TODO",
		payload: taskId,
	};
};

export const doneTodo = (taskId: string): any => {
	return {
		type: "DONE_TODO",
		payload: taskId,
	};
};

export const editTodo = (
	taskId: string,
	newTaskName: string,
	newDeadline: string
): any => {
	return {
		type: "EDIT_TODO",
		payload: { taskId, newTaskName, newDeadline },
	};
};
