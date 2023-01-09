import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import app from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// const auth = getAuth(app);
		// signInWithEmailAndPassword(auth, email, password)
		// 	.then((userCredential) => {
		// 		// Signed in
		// 		const user = userCredential.user;
		// 		// ...
		// 	})
		// 	.catch((error) => {
		// 		const errorCode = error.code;
		// 		const errorMessage = error.message;
		// 	});
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
						***ERROR*** :: {error}
					</div>
				)}
			</form>
		</div>
	);
};

export default SignIn;
