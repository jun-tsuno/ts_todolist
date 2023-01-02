import TaskCard from "./TaskCard";
import { Task } from "../types/types";

interface Props {
	todos: Task[];
	deleteTodo(id: string): void;
	doneTodo(id: string): void;
	editTodo(id: string, taskName: string, taskDeadline: string): void;
}

const ToDoList = ({ todos, deleteTodo, doneTodo, editTodo }: Props) => {
	const tasks = todos.map((todo) => {
		return (
			<TaskCard
				key={todo.id}
				todo={todo}
				deleteTodo={deleteTodo}
				doneTodo={doneTodo}
				editTodo={editTodo}
			/>
		);
	});
	return <>{tasks}</>;
};

export default ToDoList;
