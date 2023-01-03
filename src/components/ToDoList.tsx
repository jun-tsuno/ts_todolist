import useTodo from "../hooks/useTodo";
import TaskCard from "./TaskCard";

const ToDoList = () => {
	const { todos } = useTodo();
	const tasks = todos.map((todo) => {
		return <TaskCard key={todo.id} todo={todo} />;
	});
	return <>{tasks}</>;
};

export default ToDoList;
