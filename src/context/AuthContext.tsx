import { createContext, useState, useEffect } from "react";
import { UserContextType } from "../types/types";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const INITIAL_STATE = {
	currentUser: "",
	signIn: () => {},
};

export const UserContext = createContext<UserContextType>(INITIAL_STATE);

export const AuthContextProvider = ({ children }: any): JSX.Element => {
	const [user, setUser] = useState<object>({});

	const signIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser);
			setUser(currentUser!);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider value={{ user, signIn }}>
			{children}
		</UserContext.Provider>
	);
};
