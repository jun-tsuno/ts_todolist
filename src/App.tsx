import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/Todo";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<div>
			<AuthContextProvider>
				<TodoProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route path="*" element={<Error />} />
						</Routes>
					</BrowserRouter>
				</TodoProvider>
			</AuthContextProvider>
		</div>
	);
};

export default App;
