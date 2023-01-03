import { useContext } from "react";
import { TodoContext } from "../context/Todo";

const useTodo = () => {
	return useContext(TodoContext);
};

export default useTodo;
