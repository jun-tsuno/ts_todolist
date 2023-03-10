import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";

const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { signIn } = UserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			navigate("/home");
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				setError(true);
				setErrorMessage(error.message);
			}
		}
	};

	return (
		<div className="text-white max-w-[700px] mx-auto my-16 p-4">
			<div>
				<h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
				<p className="py-2">
					Don't have an account yet?{" "}
					<Link to="/signup" className="underline">
						Sign up.
					</Link>
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col py-2">
					<label className="py-2 font-medium">Email Address</label>
					<input
						className="border p-3 text-black"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col py-2">
					<label className="py-2 font-medium">Password</label>
					<input
						className="border p-3 text-black"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
					Sign In
				</button>
				{error && (
					<div className="text-center bg-red-400 text-white p-4 border rounded-md ">
						***ERROR*** :: {errorMessage}
					</div>
				)}
			</form>
		</div>
	);
};

export default SignIn;
