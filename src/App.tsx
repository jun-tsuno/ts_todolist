import { useState } from "react";
import UserInput from "./components/UserInput";
import ToDoList from "./components/ToDoList";
import { Task } from "./types/types";

const App = () => {
	const [todos, setTodos] = useState<Task[]>([]);

	const addTodo = (newTodo: Task): void => {
		setTodos([...todos, newTodo]);
	};

	const deleteTodo = (taskId: string): void => {
		const newTodos = todos.filter((todo) => {
			return todo.id !== taskId;
		});
		setTodos(newTodos);
	};

	const doneTodo = (taskId: string): void => {
		const newTodos = todos.filter((todo) => {
			if (todo.id === taskId) {
				todo.isDone = !todo.isDone;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const editTodo = (
		taskId: string,
		newTaskName: string,
		newDeadline: string
	): void => {
		const newTodos = todos.filter((todo) => {
			if (todo.id === taskId) {
				todo.taskName = newTaskName;
				todo.deadline = newDeadline;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	let taskToBeDone = 0;
	todos.map((todo) => {
		if (todo.isDone === false) {
			taskToBeDone++;
		}
	});

	return (
		<div className="text-[white]">
			<div className="flex items-center">
				<h1 className="text-3xl p-5 text-[#ffba08] ">ToDo List</h1>
				{taskToBeDone !== 0 && (
					<h2 className="ml-auto mr-8 text-xl">{taskToBeDone} Tasks Left...</h2>
				)}
			</div>
			<div>
				<div className="text-center py-10">
					<UserInput addTodo={addTodo} />
				</div>
				<div>
					{todos.length === 0 ? (
						<h2 className="text-3xl text-center my-10">All Tasks Done!!</h2>
					) : (
						<ToDoList
							todos={todos}
							deleteTodo={deleteTodo}
							doneTodo={doneTodo}
							editTodo={editTodo}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
