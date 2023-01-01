import TaskCard from "./TaskCard";
import { Task } from "../types/types";

interface Props {
	todos: Task[];
	deleteTodo(id: string): void;
	doneTodo(id: string): void;
}

const ToDoList = ({ todos, deleteTodo, doneTodo }: Props) => {
	const tasks = todos.map((todo) => {
		return (
			<TaskCard
				key={todo.id}
				todo={todo}
				deleteTodo={deleteTodo}
				doneTodo={doneTodo}
			/>
		);
	});
	return <>{tasks}</>;
};

export default ToDoList;
