import { createContext, useState, useEffect, useContext } from "react";
import { UserContextType } from "../types/types";
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	Auth,
} from "firebase/auth";
import { auth } from "../../firebase";

export const UserContext = createContext<UserContextType>(
	{} as UserContextType
);

export const AuthContextProvider = ({ children }: any): JSX.Element => {
	const [user, setUser] = useState<User | null>(null);
	console.log(user);

	const signIn = async (email: string, password: string) => {
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

export const UserAuth = () => {
	return useContext(UserContext);
};
