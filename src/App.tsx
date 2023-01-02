import { useState } from "react";
import UserInput from "./components/UserInput";
import ToDoList from "./components/ToDoList";
import { Task } from "./types/types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { darkTheme, lightTheme } from "./style/customMui";
import useMediaQuery from "@mui/material/useMediaQuery";

const App = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [todos, setTodos] = useState<Task[]>([]);
	const [isDark, setIsDark] = useState<boolean>(prefersDarkMode);

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

	const handleTheme = () => {
		setIsDark(!isDark);
	};

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<CssBaseline>
				<div>
					<div className="flex items-center">
						<h1 className="text-3xl p-5 mr-10">ToDo List</h1>
						<div>
							{isDark ? (
								<>
									<IconButton aria-label="delete" onClick={handleTheme}>
										<LightModeIcon fontSize="large" />
									</IconButton>
									<span>Dark Mode</span>
								</>
							) : (
								<>
									<IconButton aria-label="delete" onClick={handleTheme}>
										<DarkModeIcon fontSize="large" />
									</IconButton>
									<span>Light Mode</span>
								</>
							)}
						</div>
						{taskToBeDone !== 0 && (
							<h2 className="ml-auto mr-8 text-xl">
								{taskToBeDone} Tasks Left...
							</h2>
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
			</CssBaseline>
		</ThemeProvider>
	);
};

export default App;
