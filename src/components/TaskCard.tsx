import { useState } from "react";
import useTodo from "../hooks/useTodo";
import { UserAuth } from "../context/AuthContext";
import EditTask from "./EditTask";
import { Task } from "../types/types";
import { Card } from "../style/customMui";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { blue } from "@mui/material/colors";
import { pink } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { db } from "../../firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

interface Props {
	todo: Task;
}

const TaskCard = ({ todo }: Props) => {
	const { handleDeleteTodo, handleEditTodo, handleDoneTodo } = useTodo();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { user } = UserAuth();

	const handleEdit = (id: string) => {
		todo.id === id && setIsEditing(true);
	};

	const handleEditDone = (taskName: string, taskDeadline: string) => {
		handleEditTodo(todo.id, taskName, taskDeadline);
		setIsEditing(false);
	};

	const handleDeleteData = async (id: string) => {
		const q = query(
			collection(db, `todos/${user!.uid}/todo`),
			where("id", "==", id)
		);

		const querySnapshot = await getDocs(q);
		const deleteItemId = querySnapshot.docs[0].id;
		await deleteDoc(doc(db, `todos/${user!.uid}/todo/${deleteItemId}`));
	};

	return (
		<div className="w-[90%] max-w-[900px] min-w-[400px] mx-auto my-5">
			<Card isDone={todo.isDone}>
				<div className="flex min-w-[300px]">
					{isEditing ? (
						<EditTask
							taskName={todo.taskName}
							deadline={todo.deadline}
							handleEditDone={handleEditDone}
						/>
					) : (
						<>
							<div className="text-left ml-5 flex-[80%] min-w-[200px]">
								<h3 className="text-2xl break-words text-[#ee6055]">
									{todo.taskName}
								</h3>
								<span>Deadline: {todo.deadline}</span>
							</div>
							{todo.isDone && (
								<div className="my-auto px-2 mr-10 border border-2 rounded-md text-[#55a630] border-[#55a630]">
									DONE
								</div>
							)}
						</>
					)}
					<div className="flex-[20%] flex justify-center items-center">
						{!isEditing && (
							<>
								<IconButton onClick={() => handleEdit(todo.id)}>
									<BorderColorIcon sx={{ color: blue[500] }} />
								</IconButton>
								<IconButton onClick={() => handleDoneTodo(todo.id)}>
									<CheckCircleIcon sx={{ color: green[500] }} />
								</IconButton>
								<IconButton
									onClick={() => {
										handleDeleteTodo(todo.id);
										handleDeleteData(todo.id);
									}}
								>
									<DeleteForeverIcon sx={{ color: pink[600] }} />
								</IconButton>
							</>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default TaskCard;
