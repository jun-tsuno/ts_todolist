import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/Todo";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
	return (
		<div>
			<TodoProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</TodoProvider>
		</div>
	);
};

export default App;
