import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/Todo";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
	return (
		<div>
			<AuthContextProvider>
				<TodoProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/home" element={<Home />} />
						</Routes>
					</BrowserRouter>
				</TodoProvider>
			</AuthContextProvider>
		</div>
	);
};

export default App;
