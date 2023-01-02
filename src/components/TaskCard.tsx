import { useState } from "react";
import EditTask from "./EditTask";
import { Card } from "../style/customMui";
import { Task } from "../types/types";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { blue } from "@mui/material/colors";
import { pink } from "@mui/material/colors";
import { green } from "@mui/material/colors";

interface Props {
	todo: Task;
	deleteTodo(id: string): void;
	doneTodo(id: string): void;
	editTodo(id: string, taskName: string, taskDeadline: string): void;
}

const TaskCard = ({ todo, deleteTodo, doneTodo, editTodo }: Props) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleEdit = (id: string) => {
		todo.id === id && setIsEditing(true);
	};

	const handleEditDone = (taskName: string, taskDeadline: string) => {
		editTodo(todo.id, taskName, taskDeadline);
		setIsEditing(false);
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
						<div className="text-left ml-5 flex-[80%] min-w-[200px]">
							<h3 className="text-2xl break-words text-[#ee6055]">
								{todo.taskName}
							</h3>
							<span>Deadline: {todo.deadline}</span>
						</div>
					)}
					<div className="flex-[20%] flex justify-center items-center">
						{!isEditing && (
							<>
								<IconButton onClick={() => handleEdit(todo.id)}>
									<BorderColorIcon sx={{ color: blue[500] }} />
								</IconButton>
								<IconButton onClick={() => doneTodo(todo.id)}>
									<CheckCircleIcon sx={{ color: green[500] }} />
								</IconButton>
								<IconButton onClick={() => deleteTodo(todo.id)}>
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
