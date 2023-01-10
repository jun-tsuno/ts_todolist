import { createContext, useState, useEffect, useContext } from "react";
import { UserContextType } from "../types/types";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export const UserContext = createContext<UserContextType>(
	{} as UserContextType
);

export const AuthContextProvider = ({ children }: any): JSX.Element => {
	const [user, setUser] = useState<object>({});
	console.log(user);

	// const signIn = (email: string, password: string) => {
	// 	console.log("here");

	// 	return signInWithEmailAndPassword(auth, email, password);
	// };

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
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
