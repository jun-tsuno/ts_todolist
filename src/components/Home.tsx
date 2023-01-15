import { useState, useEffect } from "react";
import useTodo from "../hooks/useTodo";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserInput from "../components/UserInput";
import ToDoList from "../components/ToDoList";
import { useNavigate } from "react-router-dom";
import { darkTheme, lightTheme } from "../style/customMui";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [isDark, setIsDark] = useState<boolean>(prefersDarkMode);
	const { todos, handleAddTodo, handleReset } = useTodo();
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// dbに保存されている前回迄のtodoを取得
		const fetchUserTodos = async () => {
			// currentUser === undefinedを除外
			if (user) {
				// サブコレクションに保存されているtodo{}の中で現在ログイン中のユーザーIDが付与されてる
				// タスクオブジェクトのみを抽出。
				const q = query(
					collection(db, `todos/${user.uid}/todo`),
					where("userId", "==", user.uid)
				);
				const querySnapshot = await getDocs(q);

				querySnapshot.forEach((doc) => {
					const fetchedDoc: any = doc.data();
					handleAddTodo(fetchedDoc);
				});
			}
		};
		fetchUserTodos();
	}, [user]);

	console.log(todos);

	const handleTheme = () => {
		setIsDark(!isDark);
	};

	const handleLogOut = async () => {
		try {
			await logOut();
			handleReset();
			console.log(todos);
			navigate("/");
		} catch (error) {
			alert("Logout Error!");
		}
	};

	let taskToBeDone = 0;
	todos.map((todo) => {
		if (todo.isDone === false) {
			taskToBeDone++;
		}
	});

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
							<h2 className="ml-auto text-xl">{taskToBeDone} Tasks Left...</h2>
						)}
						<div className="ml-auto mr-8">
							<Button variant="contained" onClick={handleLogOut}>
								Log Out
							</Button>
						</div>
					</div>
					<div>
						<div className="text-center py-10">
							<UserInput />
						</div>
						<div>
							{todos.length === 0 ? (
								<h2 className="text-3xl text-center my-10">All Tasks Done!!</h2>
							) : (
								<ToDoList />
							)}
						</div>
					</div>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
};

export default Home;
