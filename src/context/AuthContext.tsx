import { createContext, useState, useEffect, useContext } from "react";
import { UserContextType, Task } from "../types/types";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import {
	collection,
	getDocs,
	where,
	query,
	DocumentData,
} from "firebase/firestore";
import useTodo from "../hooks/useTodo";

export const UserContext = createContext<UserContextType>(
	{} as UserContextType
);

export const AuthContextProvider = ({ children }: any): JSX.Element => {
	const [user, setUser] = useState<User | null>(null);
	const [fetchedData, setFetchedData] = useState<DocumentData>({});

	console.log(fetchedData);

	const signIn = async (email: string, password: string) => {
		return await signInWithEmailAndPassword(auth, email, password);
	};

	const signUp = async (email: string, password: string) => {
		return await createUserWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);

			// dbに保存されている前回迄のtodoを取得
			const fetchUserTodos = async () => {
				// currentUser === undefinedを除外
				if (currentUser) {
					// サブコレクションに保存されているtodo{}の中で現在ログイン中のユーザーIDが付与されてる
					// タスクオブジェクトのみを抽出。
					const q = query(
						collection(db, `todos/${currentUser.uid}/todo`),
						where("userId", "==", currentUser.uid)
					);
					const querySnapshot = await getDocs(q).then((documents) => {
						documents.forEach((doc) => {
							setFetchedData(doc.data());
						});
					});
					// console.log(querySnapshot);

					// await querySnapshot.forEach((doc) => {
					// 	setFetchedData(doc.data());
					// });
				}
			};
			fetchUserTodos();
		});
		return () => {
			unsubscribe();
		};
	}, [user]);

	return (
		<UserContext.Provider value={{ user, signIn, signUp, logOut, fetchedData }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
